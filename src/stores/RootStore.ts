import { Instance, types } from 'mobx-state-tree';
import * as Datastore from './DataStore';

// AppStore, which handles the highest level of
export const AppStore = types
    .model('AppStore', {
        devMode: false,
    })
    .actions((self) => ({
        // toggles dev mode
        toggleDevMode() {
            self.devMode = !self.devMode;
        },
    }));

// RootStore
export const RootStore = types.model('RootStore', {
    dataStore: Datastore.DataStore,
    appStore: AppStore,
});

// typescript helper to get the model of the root store
export type RootStoreModel = Instance<typeof RootStore>;

// creates the root store, which is a combo of the other stores.
export const createStore = (): RootStoreModel => {
    const dataStore = Datastore.createStore();
    const appStore = AppStore.create({});

    const rootStore = RootStore.create({
        dataStore,
        appStore,
    });

    return rootStore;
};

// react hooks to use the context API for fetching root store
import { useContext, createContext } from 'react';

const StoreContext = createContext<RootStoreModel>({} as RootStoreModel);

export const useStore = () => useContext(StoreContext);
export const StoreProvider = StoreContext.Provider;
