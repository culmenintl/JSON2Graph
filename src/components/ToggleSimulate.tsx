import { FC, useEffect } from 'react';
import { PlayIcon, StopIcon } from '@heroicons/react/24/outline';
import { classNames } from '../lib/Utils';
import { observer } from 'mobx-react-lite';
import { RootStoreModel } from '../stores/RootStore';
import useInject from '../hooks/useInject';
import { useSigma } from '@react-sigma/core';
import { AppStore, STATUS } from '../stores/AppStore';

const mapStore = ({ dataStore, appStore }: RootStoreModel) => ({
    dataStore,
    appStore,
});

export const ToggleSimulation: FC<{}> = observer(() => {
    const { dataStore, appStore } = useInject(mapStore);
    const sigma = useSigma();
    const toggleSimulation = () => {
        if (dataStore.graph.isSimulating) {
            appStore.setStatus(STATUS.GRAPH_SIMULATED);
        } else {
            appStore.setStatus(STATUS.SIMULATING);
        }
        dataStore.graph.toggleSimulation();
    };
    useEffect(() => {
        const interval = setInterval(() => {
            if (dataStore.graph.isSimulating) {
                sigma.scheduleRefresh();
            }
        }, dataStore.graph.refreshInterval);
        return () => clearInterval(interval);
    }, [dataStore.graph.isSimulating]);
    return (
        <>
            <button
                type="button"
                className={classNames(
                    dataStore.graph.isSimulating
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-300 text-gray-900',
                    'inline-flex items-center rounded-full border border-transparent p-2 text-white shadow-sm hover:bg-indigo-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                )}
                onClick={toggleSimulation}
            >
                {dataStore.graph.isSimulating ? (
                    <StopIcon className="h-5 w-5" aria-hidden="true" />
                ) : (
                    <PlayIcon className="h-5 w-5" aria-hidden="true" />
                )}
            </button>
        </>
    );
});
