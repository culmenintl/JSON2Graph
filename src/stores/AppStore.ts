import { Instance, types } from 'mobx-state-tree';

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

// typescript helper to get the model of the root store
export type AppStoreModel = Instance<typeof AppStore>;

// creates the store, giving it some initial values
export const createStore = (): AppStoreModel => {
    const dataStore = AppStore.create({});

    return dataStore;
};

// react hooks to use the context API for fetching root store
import { useContext, createContext } from 'react';

const StoreContext = createContext<AppStoreModel>({} as AppStoreModel);

export const useStore = () => useContext(StoreContext);
export const StoreProvider = StoreContext.Provider;
