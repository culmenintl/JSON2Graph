import { FC, useEffect, useState, useRef } from 'react';
import autoAnimate from '@formkit/auto-animate';
import {
    SigmaContainer,
    ControlsContainer,
    SearchControl,
} from '@react-sigma/core';

import GraphSettingsController from './GraphSettingsController';
import GraphEventsController from './GraphEventsController';
import GraphDataController from './GraphDataController';
import { FiltersState } from '../lib/types';
import drawLabel from '../lib/canvas-utils';

import LoadingLogo from './LoadingLogo';

import '@react-sigma/core/lib/react-sigma.min.css';

import { ToggleDev } from './ToggleDev';
import { RootStoreModel } from '../stores/RootStore';
import { STATUS } from '../stores/AppStore';
import { observer } from 'mobx-react-lite';
import { DevPanel } from './DevPanel';
import useInject from '../hooks/useInject';
import StatusDisplay from './StatusDisplay';

// notistack
import { useSnackbar } from 'notistack';

const mapStore = ({ appStore, dataStore }: RootStoreModel) => ({
    appStore,
    dataStore,
});

const Controls: FC<{}> = observer(() => {
    return (
        <ControlsContainer
            className={`!left-0 !right-0 !mx-auto !flex max-h-[75vh] !w-full
                !justify-between !border-0 !border-gray-300 !bg-gray-300/20 !backdrop-blur-lg`}
        >
            <div className="mx-auto flex w-full !max-w-xl flex-col py-3">
                <div className="flex flex-row items-center justify-between px-6">
                    <ToggleDev />
                    <StatusDisplay />
                    {/* <LayoutForceAtlas2Control
                        settings={dataStore.graph.layoutSettings}
                    /> */}
                    {/* <ZoomControl className="!flex !items-center !justify-center !border-b-0 !bg-transparent" /> */}
                    <div className="flex">
                        <SearchControl className="!border-b-2 !border-gray-300 !bg-transparent" />
                    </div>
                </div>
            </div>
        </ControlsContainer>
    );
});

const Root: FC<{}> = observer(() => {
    const [filtersState, setFiltersState] = useState<FiltersState>({
        clusters: {},
        tags: {},
    });

    const parent = useRef(null);
    useEffect(() => {
        parent.current && autoAnimate(parent.current);
    }, [parent]);

    // notistack
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const [hoveredNode, setHoveredNode] = useState<string | null>(null);

    // mobx
    const { dataStore, appStore } = useInject(mapStore);

    // Load data on mount:
    useEffect(() => {
        appStore.setStatus(STATUS.FETCHING);

        // setup async call
        const fetchData = async () => {
            const data = await fetch(
                `${
                    import.meta.env.VITE_PUBLIC_URL
                }/reddit.comments.dataset.json`
            );

            const json = await data.json();
            const subDataset = json.filter(
                (_: any, index: number) => index < dataStore.rows
            );
            dataStore.setData(subDataset);
        };

        try {
            fetchData();
        } catch (e: any) {
            enqueueSnackbar(e.message, {
                variant: 'error',
                persist: true,
            });
        }
    }, []);

    // if (!dataStore.data) return <LoadingLogo />;

    return (
        <div className="absolute inset-0">
            <SigmaContainer
                settings={{
                    labelRenderer: drawLabel,
                    ...dataStore.sigma.settings,
                }}
            >
                <GraphSettingsController hoveredNode={hoveredNode} />
                <GraphEventsController setHoveredNode={setHoveredNode} />
                <GraphDataController filters={filtersState} />
                <div ref={parent}>{appStore.devMode && <DevPanel />}</div>
                {!dataStore.graph.simulated && <LoadingLogo />}
                <span className="absolute left-0 top-0 p-3 text-sm text-gray-400">
                    Centrifuge Widget Demo - v{APP_VERSION}
                </span>

                <Controls />
            </SigmaContainer>
        </div>
    );
});

export default Root;
