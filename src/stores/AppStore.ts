import { Instance, types } from "mobx-state-tree"

// AppStore, which handles the highest level of data within the graph
export const AppStore = types
    .model("AppStore", {
        devMode: false,
        status: STATUS.FETCHING,
        loading: true,
    })
    .actions((self) => ({
        // toggles dev mode
        toggleDevMode() {
            self.devMode = !self.devMode
        },
        setStatus(status: STATUS) {
            self.status = status
        },
        setLoading(loading: boolean) {
            self.loading = loading
        },
    }))

// typescript helper to get the model of the root store
export type AppStoreModel = Instance<typeof AppStore>

// creates the store, giving it some initial values
export const createStore = (): AppStoreModel => {
    return AppStore.create({})
}

import { STATUS } from "./_AppSlice"
// react hooks to use the context API for fetching root store
import { createContext, useContext } from "react"

const StoreContext = createContext<AppStoreModel>({} as AppStoreModel)

export const useStore = () => useContext(StoreContext)
export const StoreProvider = StoreContext.Provider
