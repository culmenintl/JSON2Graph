import { RedditNode } from "../lib/types"
import config from "../../configs/data.mapping.json"
import { Graph, GraphData } from "@antv/g6"
import { populateGraphinData } from "../lib/Utils"
import { GraphinData, Utils } from "@antv/graphin"

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
    nodesCount: number
    edgesCount: number
    totalRows: number
    sampledRows: number
}

const initialState: State = {
    state: "done",
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
    rowsToSample: 200,
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
