import { StateCreator } from "zustand"
import { StoreState } from "./_Store"

import { RedditNode } from "../lib/types"

import config from "../../configs/data.mapping.json"
interface SigmaSettings {
    labelDensity: number
    labelGridCellSize: number
    labelRenderedSizeThreshold: number
    zIndex: boolean
    maxCameraRatio: number
    minCameraRatio: number
}

interface Dataset {
    id: string
    url: string
    data: unknown[] | undefined
    description: string
}

interface State {
    settings: SigmaSettings
    dataSet: Dataset
    rows: number
    state: "pending" | "done" | "error"
}

const initialState: State = {
    rows: 2000,
    state: "pending",
    settings: {
        labelDensity: 0.07,
        labelGridCellSize: 60,
        labelRenderedSizeThreshold: 15,
        zIndex: true,
        maxCameraRatio: 2,
        minCameraRatio: 0.2,
    },
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
}

export type DataSlice = State & Actions

const createDataSlice: StateCreator<
    StoreState,
    [["zustand/immer", never], ["zustand/devtools", never]],
    [],
    DataSlice
> = (set, get) => ({
    ...initialState,
    setRows: (event: React.ChangeEvent<HTMLInputElement>) => {
        const val = event.target.value
        if (val) {
            set((state) => {
                state.rows = parseInt(event.target.value)
            })
        } else {
            set((state) => {
                state.rows = 0
            })
        }
    },
    fetchData: async () => {
        set({
            state: "pending",
        })
        try {
            // fetch data from config
            const resp = await fetch(get().dataSet.url)
            const json = (await resp.json()) as unknown as RedditNode[]
            console.log("json", json)
            // const data = (await fetch(get().dataSet.url)).json() as unknown as [
            //     RedditNode,
            // ]
            // sub sample data
            const subDataset = json.filter(
                (_: any, index: number, arr) =>
                    Math.random() <= get().rows / arr.length,
            )

            console.log("subDataset", subDataset)

            set(
                (state) => {
                    state.dataSet.data = subDataset
                },
                false,
                "fetchData",
            )
            set(
                (state) => {
                    state.state = "done"
                },
                false,
                "setDone",
            )
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
