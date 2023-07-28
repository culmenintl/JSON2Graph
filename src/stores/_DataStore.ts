import useStore, { StoreState } from "./_Store"
import { StateCreator } from "zustand"

import { RedditNode } from "../lib/types"

import config from "../../configs/data.mapping.json"
import { Graph } from "@antv/g6"
import { populateGraphinData } from "../lib/Utils"
import { GraphinData } from "@antv/graphin"
import { STATUS } from "./_AppSlice"

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
}

const initialState: State = {
    rows: 2000,
    state: "done",
    graph: undefined,
    graphinData: undefined,
    dataSet: {
        id: config.datasets[0].id,
        url: config.datasets[0].url,
        data: undefined,
        description: config.datasets[0].description
            ? config.datasets[0].description
            : "No Description.",
    },
}

interface Actions {
    setRows: (event: React.ChangeEvent<HTMLInputElement>) => void
    fetchData: () => Promise<void>
    setData: (data: unknown) => void
}

export type DataSlice = State & Actions

const createDataSlice: StateCreator<
    StoreState,
    [["zustand/immer", never], ["zustand/devtools", never]],
    [],
    DataSlice
> = (set, get) => ({
    ...initialState,

    setData: (data: unknown) => {
        set((state) => {
            state.dataSet.data = Array.isArray(data) ? data : [data]
        })
    },

    // sets the rows of the dataset
    setRows: (event: React.ChangeEvent<HTMLInputElement>) => {
        const val = event.target.value
        if (val) {
            set(
                (state) => {
                    state.rows = parseInt(event.target.value)
                },
                false,
                "setRows",
            )
        } else {
            set(
                (state) => {
                    state.rows = 0
                },
                false,
                "setRows",
            )
        }
    },

    // fetches the data from the 'backend' and sets the graphinData
    fetchData: async () => {
        get().setStatus(STATUS.FETCHING, true)

        try {
            // fetch data from config
            const resp = await fetch(get().dataSet.url)
            const json = (await resp.json()) as unknown as RedditNode[]

            // sub sample data to the number rows requested
            const subDataset = json.filter(
                (_: unknown, index: number, arr) =>
                    Math.random() <= get().rows / arr.length,
            )

            get().setData(subDataset)

            set(
                (state) => {
                    // const graph = populateG6Graph(subDataset, config)
                    // state.graphinData = convertG6ToGraphinData(graph)
                    state.graphinData = populateGraphinData(subDataset, config)
                },
                false,
                "setting graphin data",
            )

            get().setStatus(STATUS.DONE, false)
        } catch (error) {
            console.error("Failed to fetch projects", error)
            set((state) => {
                state.state = "error"
            })
            throw error
        }
    },
})

export default createDataSlice
