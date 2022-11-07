import { Instance, types } from 'mobx-state-tree';
import { isEmpty } from 'lodash';

export const enum STATUS {
    FETCHING = 'Fetching Data',
    SHAPING = 'Creating Graph',
    SIMULATING = 'Simulating...',
    GRAPH_SIMULATED = 'Graph Simulated',
}
// AppStore, which handles the highest level of data within the graph
export const AppStore = types
    .model('AppStore', {
        devMode: false,
        status: STATUS.FETCHING,
        loading: true,
        targetNode: types.frozen(),
    })
    .views((self) => ({
        get showTargetNode() {
            // console.log(isEmpty(self.targetNode));
            return !isEmpty(self.targetNode);
        },
    }))
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
        setTargetNode(node: unknown) {
            self.targetNode = Object.assign({}, node);
        },
        clearNode() {
            self.targetNode = new Object();
        },
    }));

// typescript helper to get the model of the root store
export type AppStoreModel = Instance<typeof AppStore>;

// creates the store, giving it some initial values
export const createStore = (): AppStoreModel => {
    return AppStore.create({
        targetNode: new Object(),
    });
};

// react hooks to use the context API for fetching root store
import { useContext, createContext } from 'react';

const StoreContext = createContext<AppStoreModel>({} as AppStoreModel);

export const useStore = () => useContext(StoreContext);
export const StoreProvider = StoreContext.Provider;
