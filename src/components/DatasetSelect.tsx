import { FC } from 'react';
import { DataToGraphConfig } from '../lib/Utils';
import { observer } from 'mobx-react-lite';
import { RootStoreModel } from '../stores/RootStore';
import useInject from '../hooks/useInject';
import Button from './Button';

const mapStore = ({ dataStore, appStore }: RootStoreModel) => ({
    appStore,
    dataStore,
});

export const DatasetSelect: FC<{}> = observer(() => {
    const { dataStore, appStore } = useInject(mapStore);
    return (
        <div>
            <Button
                text="Prev Dataset"
                onClick={async () => {
                    appStore.toggleDevMode();
                    dataStore.setDatasetIndex(dataStore.datasetIndex - 1);
                    await dataStore.fetchData();
                }}
            />
            <Button
                text="Next Dataset"
                onClick={async () => {
                    appStore.toggleDevMode();
                    dataStore.setDatasetIndex(dataStore.datasetIndex + 1);
                    await dataStore.fetchData();
                }}
            />
        </div>
    );
});
