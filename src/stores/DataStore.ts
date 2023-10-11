import { DataToGraphConfig, RedditNode, STATUS } from "../lib/AppTypes"
import fileConfig from "../../configs/data.mapping.json"
import { populateGraphinData } from "../lib/Utils"
import { GraphinData, IUserNode, Utils } from "@antv/graphin"
import SearchApi from "js-worker-search"
import { createStore } from "@udecode/zustood"
import { actions, store } from "./Store"
import { enqueueSnackbar } from "notistack"
import debounce from "lodash/debounce"

interface State {
    dataSet: DataToGraphConfig
    graphinData: GraphinData | undefined
    rowsToSample: number | undefined
    state: "pending" | "done" | "error"
    JsonSample: Object | undefined
    dataUrl: string | undefined
    totalRows: number
    sampledRows: number
    nodesCount: number
    edgesCount: number

    //search
    searchApi: SearchApi
    searchTerm: string | undefined
    searchResults: Map<string, IUserNode[]> | undefined
    showResults: boolean
}

const initialState: State = {
    state: "done",
    // graphinData: Utils.mock(10),
    graphinData: { nodes: Utils.mock(10).nodes, edges: Utils.mock(10).edges },
    JsonSample: undefined,
    dataUrl: "reddit.comments.10k.json",
    dataSet: {
        data: undefined,
        nodes: undefined,
        edges: undefined,
    },
    rowsToSample: 200,
    totalRows: 0,
    sampledRows: 0,
    nodesCount: 0,
    edgesCount: 0,

    // search
    searchApi: new SearchApi(),
    searchTerm: undefined,
    searchResults: undefined,
    showResults: false,
}

export const DataStore = createStore("Data")(
    { ...initialState },
    {
        devtools: { enabled: true },
    },
).extendActions((set, get, api) => ({
    fetchData: async () => {
        actions.app.loading(true)
        actions.app.status(STATUS.FETCHING)

        // clear out the configs and data
        set.dataSet({ ...initialState.dataSet })
        set.graphinData(undefined)
        set.searchApi(new SearchApi())
        store.graphinRef.graphRef()?.clear()

        try {
            // fetch data from config
            // const resp = await fetch(
            //     `${import.meta.env.VITE_PUBLIC_URL}/${get.dataSet().url}`,
            // )

            // const resp = await fetch("https://swapi.dev/api/people")
            const resp = await fetch(`/${get.dataUrl()}` as string)
            const json = await resp.json()

            actions.app.status(STATUS.AI)

            // if the response is an of json objects, then we can use it as is
            let data
            if (!Array.isArray(json)) {
                const likelyDataProperty = getLargestArrayProperty(json)

                data = json[likelyDataProperty as string]
            } else {
                data = json
            }

            const rows = get.rowsToSample() ? get.rowsToSample() : data.length

            // sub sample data to the number rows requested
            const subDataset = data.filter(
                (_: unknown, index: number, arr: unknown[]) =>
                    Math.random() <= (rows ?? arr.length) / arr.length,
            )

            // get the first 5 rows if they exist
            const sample = subDataset.slice(0, 5)

            set.JsonSample(sample[0])

            const bodyReq = {
                example: JSON.stringify(sample),
            }

            const options = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(bodyReq),
            }

            if (store.pref.aiMappingEnabled()) {
                try {
                    const mapReq = await fetch("/api/map", options)

                    const mapResp = await mapReq.json()

                    console.log("mapResp", JSON.parse(mapResp))

                    actions.app.status(STATUS.SHAPING)

                    const config = JSON.parse(mapResp)

                    set.dataSet({ ...config, data: subDataset })
                } catch (error) {
                    // console.error("Failed to fetch.", error)
                    const parsedConfig = JSON.parse(JSON.stringify(fileConfig))
                    const config = parsedConfig.datasets[0]
                    set.dataSet({ ...config, data: subDataset })
                    enqueueSnackbar(
                        "Unable to call API. Using file configuration.",
                        {
                            variant: "error",
                        },
                    )
                }
            } else {
                const parsedConfig = JSON.parse(JSON.stringify(fileConfig))
                const config = parsedConfig.datasets[0]
                set.dataSet({ ...config, data: subDataset })
            }

            const graphinData = populateGraphinData(
                get.dataSet().data,
                get.dataSet(),
            )

            // figure out if there is an existing graph, and if so, just change the data
            set.graphinData(graphinData as GraphinData)

            indexData(get.searchApi(), graphinData as GraphinData)
            set.totalRows(data.length)
            set.sampledRows(subDataset.length)
        } catch (error) {
            console.error("Failed to fetch.", error)
            set.state("error")
            throw error
        }
        actions.app.loading(false)
    },

    searchNodesApi: async (searchTerm: string) => {
        if (!searchTerm) {
            actions.data.clearSearch()
            return
        }
        set.searchTerm(searchTerm)
        const searchResults = await get.searchApi().search(searchTerm)

        const data = get.graphinData()
        const foundNodes =
            data?.nodes.filter((node) => searchResults.includes(node.id)) || []

        console.log("found", foundNodes)

        const groupedResults = groupNodesByType(foundNodes)

        console.log("grouped", groupedResults)
        set.searchResults(groupedResults)
    },
    setSearchTerm: async (searchTerm: string) => {
        if (!searchTerm) {
            set.searchResults(new Map<string, IUserNode[]>())
            set.searchTerm(undefined)
            return
        }
        const debouncedSearch = debounce(async (value: string) => {
            // console.log("searching for", value)
            await actions.data.searchNodesApi(get.searchTerm() as string)
        }, 1000)

        set.searchTerm(searchTerm)
        set.showResults(true)

        debouncedSearch(searchTerm)
    },
    clearSearch: async () => {
        set.searchResults(new Map<string, IUserNode[]>())
        set.searchTerm(undefined)
        set.showResults(false)
    },
}))

interface ResponseData {
    [key: string]: any
}

function getLargestArrayProperty(response: ResponseData): string | null {
    let largestArrayProperty: string | null = null
    let largestArrayLength = 0

    // Loop through the keys in the response object
    for (const key in response) {
        // rome-ignore lint/suspicious/noPrototypeBuiltins: <explanation>
        if (response.hasOwnProperty(key)) {
            const value = response[key]

            // Check if the value is an array
            if (Array.isArray(value)) {
                // If the value is an array, check if it has more rows than the current largest array
                if (value.length > largestArrayLength) {
                    largestArrayProperty = key
                    largestArrayLength = value.length
                }
            } else if (typeof value === "object") {
                // If the value is an object, recursively call this function
                const subArrayProperty = getLargestArrayProperty(value)
                if (
                    subArrayProperty !== null &&
                    response[subArrayProperty].length > largestArrayLength
                ) {
                    largestArrayProperty = subArrayProperty
                    largestArrayLength = response[subArrayProperty].length
                }
            }
        }
    }

    return largestArrayProperty
}

/**
 * Indexes the graphinData nodes using the provided searchApi.
 * @param searchApi - The search API to use for indexing.
 * @param graphinData - The GraphinData object containing the nodes to index.
 */
export const indexData = (searchApi: SearchApi, graphinData: GraphinData) => {
    graphinData.nodes.forEach((node) => {
        node._metadata?._type &&
            searchApi.indexDocument(node.id, node._metadata?._type)
        node._metadata?._title &&
            searchApi.indexDocument(node.id, node._metadata?._title)
        node._metadata?._subtitle &&
            searchApi.indexDocument(node.id, node._metadata?._subtitle)
        node._metadata?._body &&
            searchApi.indexDocument(node.id, node._metadata?._body)
        node._metadata?._clusterId &&
            searchApi.indexDocument(node.id, node._metadata?._clusterId)
    })
}

/**
 * Groups an array of user nodes by their type metadata.
 * @param nodes - The array of user nodes to group.
 * @returns A Map object where the keys are the node types and the values are arrays of nodes of that type.
 */
export const groupNodesByType = (nodes: IUserNode[]) => {
    const groupedResults = new Map<string, IUserNode[]>()
    nodes.forEach((node) => {
        const type = node._metadata?._type
        if (type) {
            const existing = groupedResults.get(type)
            if (existing) {
                existing.push(node)
            } else {
                groupedResults.set(type, [node])
            }
        }
    })
    return groupedResults
}
