import { Instance, types } from 'mobx-state-tree';

// DataStore, handles the
export const DataStore = types
    .model('DataStore', {
        data: types.frozen(),
    })
    .actions((self) => ({
        // toggles dev mode
        setData(data: any) {
            self.data = data;
        },
    }));

// typescript helper to get the model of the DataStore
export type DataStoreModel = Instance<typeof DataStore>;

// creates the store, giving it some initial values
export const createStore = (): DataStoreModel => {
    const dataStore = DataStore.create({});

    return dataStore;
};

// react hooks to use the context API for fetching root store
import { useContext, createContext } from 'react';

const StoreContext = createContext<DataStoreModel>({} as DataStoreModel);

export const useStore = () => useContext(StoreContext);
export const StoreProvider = StoreContext.Provider;
