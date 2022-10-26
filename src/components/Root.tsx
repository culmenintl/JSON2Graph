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
import { FiltersState, RedditNode } from '../lib/types';
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
import { ToggleSimulation } from './ToggleSimulate';
import Button from './Button';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';

const mapStore = ({ appStore, dataStore }: RootStoreModel) => ({
    appStore,
    dataStore,
});

const Controls: FC<{}> = observer(() => {
    return (
        <ControlsContainer
            className={`!left-0 !bottom-0 !mx-auto !flex max-h-[75vh] !w-full
                !justify-between !border-0 !border-gray-300 !bg-gray-300/20 !backdrop-blur-lg`}
        >
            <div className="mx-auto flex w-full !max-w-xl flex-col py-3">
                <div className="flex flex-row items-center justify-between gap-1 px-1 md:gap-2">
                    <ToggleDev />
                    <ToggleSimulation />
                    <StatusDisplay />
                    {/* <LayoutForceAtlas2Control
                        settings={dataStore.graph.layoutSettings}
                    /> */}
                    {/* <ZoomControl className="!flex !items-center !justify-center !border-b-0 !bg-transparent" /> */}
                    <div className="hidden md:flex">
                        <SearchControl className="!border-b-2 !border-gray-300 !bg-transparent" />
                    </div>

                    <Button
                        text="Centrifuge"
                        icon={
                            <ArrowTopRightOnSquareIcon
                                className="h-5 w-5 p-1"
                                aria-hidden="true"
                            />
                        }
                        onClick={() => alert('Opening Centrifuge')}
                    />
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

        dataStore.fetchData().catch((e) => {
            enqueueSnackbar(e.message, {
                variant: 'error',
                persist: true,
            });
        });
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
                {!dataStore.graph.firstSim && <LoadingLogo />}
                <GraphSettingsController hoveredNode={hoveredNode} />
                <GraphEventsController setHoveredNode={setHoveredNode} />
                <GraphDataController filters={filtersState} />
                <div ref={parent}>{appStore.devMode && <DevPanel />}</div>

                <span className="absolute left-0 top-0 p-3 text-sm text-gray-400">
                    Centrifuge Widget Demo - v{APP_VERSION}
                </span>

                <Controls />
            </SigmaContainer>
        </div>
    );
});

export default Root;
