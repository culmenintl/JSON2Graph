import { Instance, types } from 'mobx-state-tree';

export const enum STATUS {
    FETCHING = 'Fetching Data',
    SHAPING = 'Creating Graph',
    SIMULATING = 'Simulating Graph',
    GRAPH_SIMULATED = 'Graph Simulated',
}
// AppStore, which handles the highest level of data within the graph
export const AppStore = types
    .model('AppStore', {
        devMode: false,
        status: STATUS.FETCHING,
        loading: true,
    })
    .actions((self) => ({
        // toggles dev mode
        toggleDevMode() {
            self.devMode = !self.devMode;
        },
        setStatus(status: STATUS) {
            self.status = status;
        },
        setLoading(loading: boolean) {
            self.loading = loading;
        },
    }));

// typescript helper to get the model of the root store
export type AppStoreModel = Instance<typeof AppStore>;

// creates the store, giving it some initial values
export const createStore = (): AppStoreModel => {
    const appStore = AppStore.create({});

    return appStore;
};

// react hooks to use the context API for fetching root store
import { useContext, createContext } from 'react';

const StoreContext = createContext<AppStoreModel>({} as AppStoreModel);

export const useStore = () => useContext(StoreContext);
export const StoreProvider = StoreContext.Provider;
