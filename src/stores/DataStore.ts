import { flow, Instance, types } from 'mobx-state-tree';
// react hooks to use the context API for fetching root store
import { useContext, createContext } from 'react';
import { RedditNode } from '../lib/types';

import { DatasetConfigs } from '../lib/Utils';

export const SigmaSettings = types.model('SigmaSettings', {
    labelDensity: 0.07,
    labelGridCellSize: 60,
    labelRenderedSizeThreshold: 15,
    zIndex: true,
    maxCameraRatio: 2,
    minCameraRatio: 0.2,
});

export const Dataset = types.model('Dataset', {
    id: types.string,
    url: types.string,
    data: types.frozen(),
    description: types.string,
    nodes: types.frozen(),
    edges: types.frozen(),
});

export const SigmaStore = types.model('SigmaStore', {
    settings: SigmaSettings,
});

export const EdgeAttributes = types.model('EdgeAttributes', {
    source: types.string,
    target: types.string,
});

const fetchFromUrl = async (url: string): Promise<[unknown]> => {
    console.log(url);
    const data = await fetch(url);

    const json: [unknown] = await data.json();

    return json;
};

// DataStore
export const DataStore = types
    .model('DataStore', {
        sigma: SigmaStore,
        dataSet: types.array(Dataset),
        datasetIndex: 2,
        rows: 2000,
        state: types.enumeration('State', ['pending', 'done', 'error']),
    })
    .actions((self) => ({
        setData(data: any) {
            self.dataSet[self.datasetIndex].data = data;
        },
        setDatasetIndex(val: number) {
            if (val >= self.dataSet.length - 1) {
                self.datasetIndex = self.dataSet.length - 1;
                return;
            } else if (val <= 0) {
                self.datasetIndex = 0;
                return;
            }
            self.datasetIndex = val;
        },
        setRows(event: React.ChangeEvent<HTMLInputElement>) {
            const val = event.target.value;
            if (val) {
                self.rows = parseInt(event.target.value);
            }
        },
        fetchData: flow(function* fetchData() {
            // <- note the star, this a generator function!
            self.state = 'pending';
            try {
                // ... yield can be used in async/await style

                const data: [unknown] = yield fetchFromUrl(
                    `${import.meta.env.VITE_PUBLIC_URL}/${
                        self.dataSet[self.datasetIndex].url
                    }`
                );

                const subDataset = data.filter((_: any, index: number, arr) => {
                    if (self.rows === 0) {
                        self.rows = arr.length;
                    }
                    return Math.random() <= self.rows / arr.length;
                });
                console.log('rows ingested', subDataset.length);
                self.dataSet[self.datasetIndex].data = subDataset;
                self.state = 'done';
            } catch (error) {
                // ... including try/catch error handling
                console.error('Failed to fetch projects', error);
                self.state = 'error';
                throw error;
            }
        }),
    }));

// typescript helper to get the model of the DataStore
export type DataStoreModel = Instance<typeof DataStore>;
export type SigmaSettingsModel = Instance<typeof SigmaSettings>;

// creates the store, giving it some initial values
export const createStore = (config: DatasetConfigs): DataStoreModel => {
    const dataStore = DataStore.create({
        sigma: SigmaStore.create({
            settings: SigmaSettings.create(),
        }),
        dataSet: config.datasets.map((val) => {
            return Dataset.create({
                id: val.id,
                url: val.url,
                description: val.description
                    ? val.description
                    : 'No Description.',
                nodes: val.nodes,
                edges: val.edges,
            });
        }),

        state: 'done',
    });

    return dataStore;
};

const StoreContext = createContext<DataStoreModel>({} as DataStoreModel);

export const useStore = () => useContext(StoreContext);
export const StoreProvider = StoreContext.Provider;
