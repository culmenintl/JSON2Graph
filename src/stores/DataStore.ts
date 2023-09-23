import { RedditNode } from "../lib/types"
import config from "../../configs/data.mapping.json"
import { populateGraphinData } from "../lib/Utils"
import { GraphinData, IUserNode, Utils } from "@antv/graphin"
import SearchApi, { INDEX_MODES } from "js-worker-search"
import { createStore } from "@udecode/zustood"

interface Dataset {
    id: string
    url: string
    data: unknown[] | undefined
    description: string
}

interface State {
    dataSet: Dataset
    graphinData: GraphinData | undefined
    rowsToSample: number | undefined
    state: "pending" | "done" | "error"
    JsonSample: Object | undefined
    totalRows: number
    sampledRows: number
    nodesCount: number
    edgesCount: number

    //search
    searchApi: SearchApi
    searchTerm: string | undefined
    searchResults: Map<string, IUserNode[]> | undefined
}

const initialState: State = {
    state: "done",
    graphinData: undefined,
    //   graphinData: { nodes: Utils.mock(10).nodes, edges: Utils.mock(10).edges },
    JsonSample: undefined,
    dataSet: {
        id: config.datasets[0].id,
        url: config.datasets[0].url,
        data: undefined,
        description: config.datasets[0].description
            ? config.datasets[0].description
            : "No Description.",
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
}

export const DataStore = createStore("Data")(
    { ...initialState },
    {
        devtools: { enabled: true },
    },
).extendActions((set, get, api) => ({
    fetchData: async () => {
        try {
            // fetch data from config
            const resp = await fetch(
                `${`${import.meta.env.VITE_PUBLIC_URL}/${get.dataSet().url}`}`,
            )
            const json = (await resp.json()) as unknown as RedditNode[]
            const rows = get.rowsToSample() ? get.rowsToSample() : json.length

            console.log(json.length)
            if (!rows) {
                return
            }
            // sub sample data to the number rows requested
            const subDataset = json.filter(
                (_: unknown, index: number, arr: unknown[]) =>
                    Math.random() <= rows / arr.length,
            )
            // get().setData(subDataset)
            const graphinData = populateGraphinData(subDataset, config)
            set.graphinData(graphinData as GraphinData)
            indexData(get.searchApi(), graphinData as GraphinData)
            set.totalRows(json.length)
            set.sampledRows(subDataset.length)
            set.JsonSample(subDataset[0])
            // const graph = populateG6Graph(subDataset, config)
            // state.graphinData = convertG6ToGraphinData(graph)
            // get().setStatus(STATUS.DONE, false)
        } catch (error) {
            console.error("Failed to fetch projects", error)
            set.state("error")
            throw error
        }
    },

    searchNodesApi: async (searchTerm: string) => {
        if (!searchTerm) {
            set.searchResults(new Map<string, IUserNode[]>())
            set.searchTerm(undefined)
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
}))

/**
 * Indexes the graphinData nodes using the provided searchApi.
 * @param searchApi - The search API to use for indexing.
 * @param graphinData - The GraphinData object containing the nodes to index.
 */
export const indexData = (searchApi: SearchApi, graphinData: GraphinData) => {
    console.log("indexing data")
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
