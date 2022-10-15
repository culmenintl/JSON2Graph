import { Instance, types } from 'mobx-state-tree';
import { nanoid } from 'nanoid';

// RootStore
export const RootStore = types
    .model('RootStore', {
        devMode: false,
    })
    .actions((self) => ({
        // toggles dev mode
        toggleDevMode() {
            self.devMode = !self.devMode;
        },
    }));

// typescript helper to get the model of the root store
export type RootStoreModel = Instance<typeof RootStore>;

// creates the store, giving it some initial values
export const createStore = (): RootStoreModel => {
    const rootStore = RootStore.create({});

    return rootStore;
};

// react hooks to use the context API for fetching root store
import { useContext, createContext } from 'react';

const StoreContext = createContext<RootStoreModel>({} as RootStoreModel);

export const useStore = () => useContext(StoreContext);
export const StoreProvider = StoreContext.Provider;
