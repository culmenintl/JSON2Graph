import { RedditNode } from "../lib/types"
import config from "../../configs/data.mapping.json"
import { Graph, GraphData } from "@antv/g6"
import { populateGraphinData } from "../lib/Utils"
import { GraphinData } from "@antv/graphin"

import { createStore } from "@udecode/zustood"

interface Dataset {
    id: string
    url: string
    data: unknown[] | undefined
    description: string
}

interface State {
    dataSet: Dataset
    graph: Graph | undefined
    graphinData: GraphinData | undefined
    rows: number
    state: "pending" | "done" | "error"
    JsonSample: Object | undefined
    nodesCount: number
    edgesCount: number
    totalRows: number
    sampledRows: number
}

const initialState: State = {
    rows: 200,
    state: "done",
    graph: undefined,
    graphinData: undefined,
    JsonSample: undefined,
    dataSet: {
        id: config.datasets[0].id,
        url: config.datasets[0].url,
        data: undefined,
        description: config.datasets[0].description
            ? config.datasets[0].description
            : "No Description.",
    },
    totalRows: 0,
    sampledRows: 0,
    nodesCount: 0,
    edgesCount: 0,
}

export const DataStore = createStore("Data")(
    { ...initialState },
    {
        devtools: { enabled: true },
    },
)
    .extendActions((set, get, api) => ({
        fetchData: async () => {
            try {
                // fetch data from config
                const resp = await fetch(get.dataSet().url)
                const json = (await resp.json()) as unknown as RedditNode[]

                // sub sample data to the number rows requested
                const subDataset = json.filter(
                    (_: unknown, index: number, arr) =>
                        Math.random() <= get.rows() / arr.length,
                )

                // get().setData(subDataset)

                const graphinData = populateGraphinData(subDataset, config)

                set.graphinData(graphinData as GraphinData)
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
        // other actions
    }))
    .extendActions((set, get, api) => ({
        filterGraphByDegree: (minimumDegree: number) => {
            const graph = get.graph()
            if (graph) {
                filterGraphByDegree(graph, minimumDegree)
            }
        },
    }))

export const filterGraphByDegree = (
    inputGraph: Graph,
    minimumDegree: number,
): void => {
    console.log("filterGraphByDegree", minimumDegree)
    const graphData: GraphData = inputGraph.save() as GraphData

    if (!graphData) {
        console.log("returning because graphData is null")
        return
    }

    // remove nodes with less than X degree
    const removedNodes: string[] = []
    graphData.nodes = graphData.nodes?.filter((node) => {
        const degree = inputGraph.getNodeDegree(node.id, "total") as number
        console.log("degree", degree, node.id)
        // count both incoming and outgoing neighbor nodes
        if (degree < minimumDegree) {
            removedNodes.push(node.id)
            return false
        }
        return true
    })

    // remove edges associated with removed nodes
    graphData.edges = graphData.edges?.filter((edge) => {
        if (removedNodes.includes(edge.source as string)) {
            return false
        }
        if (removedNodes.includes(edge.target as string)) {
            return false
        }
        return true
    })
    console.log("removedNodes", removedNodes)
    inputGraph.changeData(graphData)
}
