import { RedditNode } from "../lib/types"
import { Instance, flow, types } from "mobx-state-tree"
// react hooks to use the context API for fetching root store
import { createContext, useContext } from "react"

import { DatasetConfigs } from "../lib/Utils"

export const SigmaSettings = types.model("SigmaSettings", {
    labelDensity: 0.07,
    labelGridCellSize: 60,
    labelRenderedSizeThreshold: 15,
    zIndex: true,
    maxCameraRatio: 2,
    minCameraRatio: 0.2,
})

export const Dataset = types.model("Dataset", {
    id: types.identifier,
    pathToConfigFile: "./configs/reddit.data.mapping.json",
    url: types.string,
    data: types.frozen(),
    description: types.string,
})

export const SigmaStore = types.model("SigmaStore", {
    settings: SigmaSettings,
})

export const EdgeAttributes = types.model("EdgeAttributes", {
    source: types.string,
    target: types.string,
})

const fetchFromUrl = async (url: string): Promise<[unknown]> => {
    const data = await fetch(url)

    const json: [unknown] = await data.json()

    return json
}

// DataStore
export const DataStore = types
    .model("DataStore", {
        sigma: SigmaStore,
        dataSet: Dataset,
        rows: 2000,
        state: types.enumeration("State", ["pending", "done", "error"]),
    })
    .actions((self) => ({
        setData(data: any) {
            self.dataSet.data = data
        },
        setRows(event: React.ChangeEvent<HTMLInputElement>) {
            const val = event.target.value
            console.log("val", val)
            console.log("val", typeof val)
            if (val) {
                self.rows = parseInt(event.target.value)
            } else {
                self.rows = 0
            }
        },
        fetchData: flow(function* fetchData() {
            // <- note the star, this a generator function!
            self.state = "pending"
            try {
                // ... yield can be used in async/await style

                const data: [RedditNode] = yield fetchFromUrl(self.dataSet.url)

                const subDataset = data.filter(
                    (_: any, index: number, arr) =>
                        Math.random() <= self.rows / arr.length,
                )
                console.log("rows ingested", subDataset.length)
                self.dataSet.data = subDataset
                self.state = "done"
            } catch (error) {
                // ... including try/catch error handling
                console.error("Failed to fetch projects", error)
                self.state = "error"
                throw error
            }
        }),
    }))

// typescript helper to get the model of the DataStore
export type DataStoreModel = Instance<typeof DataStore>
export type SigmaSettingsModel = Instance<typeof SigmaSettings>

// creates the store, giving it some initial values
export const createStore = (config: DatasetConfigs): DataStoreModel => {
    const dataStore = DataStore.create({
        sigma: SigmaStore.create({
            settings: SigmaSettings.create(),
        }),
        dataSet: Dataset.create({
            id: config.datasets[0].id,
            url: config.datasets[0].url,
            description: config.datasets[0].description
                ? config.datasets[0].description
                : "No Description.",
        }),

        state: "done",
    })

    return dataStore
}

const StoreContext = createContext<DataStoreModel>({} as DataStoreModel)

export const useStore = () => useContext(StoreContext)
export const StoreProvider = StoreContext.Provider
