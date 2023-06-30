import { Instance, types } from "mobx-state-tree"

// react hooks to use the context API for fetching root store
import { createContext, useContext } from "react"

import * as AppStore from "./AppStore"
// stores
import * as Datastore from "./DataStore"
import * as GraphStore from "./GraphStore"

// RootStore
export const RootStore = types.model("RootStore", {
    graphStore: GraphStore.GraphStore,
})

// typescript helper to get the model of the root store
export type RootStoreModel = Instance<typeof RootStore>

import config from "../../configs/data.mapping.json"

// creates the root store, which is a combo of the other stores.
export const createStore = (): RootStoreModel => {
    const graphStore = GraphStore.createStore()

    const rootStore = RootStore.create({
        graphStore,
    })

    return rootStore
}

const StoreContext = createContext<RootStoreModel>({} as RootStoreModel)

export const useStore = () => useContext(StoreContext)
export const StoreProvider = StoreContext.Provider
