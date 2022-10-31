import { Instance, types } from 'mobx-state-tree';

// react hooks to use the context API for fetching root store
import { useContext, createContext } from 'react';

// stores
import * as Datastore from './DataStore';
import * as AppStore from './AppStore';
import * as GraphStore from './GraphStore';

// RootStore
export const RootStore = types.model('RootStore', {
    dataStore: Datastore.DataStore,
    appStore: AppStore.AppStore,
    graphStore: GraphStore.GraphStore,
});

// typescript helper to get the model of the root store
export type RootStoreModel = Instance<typeof RootStore>;

// creates the root store, which is a combo of the other stores.
export const createStore = (): RootStoreModel => {
    const dataStore = Datastore.createStore();
    const appStore = AppStore.createStore();
    const graphStore = GraphStore.createStore();

    const rootStore = RootStore.create({
        dataStore,
        appStore,
        graphStore,
    });

    return rootStore;
};

const StoreContext = createContext<RootStoreModel>({} as RootStoreModel);

export const useStore = () => useContext(StoreContext);
export const StoreProvider = StoreContext.Provider;
