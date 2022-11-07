import { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { RootStoreModel } from '../stores/RootStore';
import useInject from '../hooks/useInject';
import { STATUS } from '../stores/AppStore';

const mapStore = ({ dataStore, appStore }: RootStoreModel) => ({
    appStore,
    dataStore,
});

export const DatasetSelect: FC<{}> = observer(() => {
    const { dataStore, appStore } = useInject(mapStore);
    return (
        <div>
            <select
                className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                value={dataStore.datasetIndex}
                onChange={async (e) => {
                    console.log('onChange');
                    appStore.toggleDevMode();
                    appStore.setStatus(STATUS.FETCHING);
                    appStore.setLoading(true);
                    dataStore.setDatasetIndex(parseInt(e.target.value));
                    await dataStore.fetchData();
                }}
            >
                {dataStore.dataSet.map((val, index) => {
                    return (
                        <option key={index} value={index}>
                            {val.label}
                        </option>
                    );
                })}
            </select>
        </div>
    );
});
