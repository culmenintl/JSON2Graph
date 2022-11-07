import { FC, useEffect, useState, useRef } from 'react';
import autoAnimate from '@formkit/auto-animate';
import {
    SigmaContainer,
    ControlsContainer,
    SearchControl,
} from '@react-sigma/core';

import { Transition } from '@headlessui/react';

import GraphSettingsController from './GraphSettingsController';
import GraphEventsController from './GraphEventsController';
import GraphDataController from './GraphDataController';
import drawLabel from '../lib/canvas-utils';

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
import { NodeContextPanel } from './NodeContextPanel';

const mapStore = ({ appStore, dataStore, graphStore }: RootStoreModel) => ({
    appStore,
    dataStore,
    graphStore,
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
    const parent = useRef(null);
    useEffect(() => {
        parent.current && autoAnimate(parent.current);
    }, [parent]);

    // notistack
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const [hoveredNode, setHoveredNode] = useState<string | null>(null);

    // mobx
    const { dataStore, appStore, graphStore } = useInject(mapStore);

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

    return (
        <div className="absolute inset-0 h-screen">
            <SigmaContainer
                settings={{
                    labelRenderer: drawLabel,
                    ...dataStore.sigma.settings,
                }}
            >
                <Transition
                    show={appStore.devMode}
                    enter="transform transition"
                    enterFrom="opacity-0 translate-y-10"
                    enterTo="opacity-100 translate-y--10"
                    leave="transform transition"
                    leaveFrom="opacity-100 translate-y--10"
                    leaveTo="opacity-0 translate-y-10"
                >
                    <DevPanel />
                </Transition>
                <Transition
                    show={appStore.showTargetNode}
                    enter="transform transition"
                    enterFrom="opacity-0 translate-y-10"
                    enterTo="opacity-100 translate-y--10"
                    leave="transform transition"
                    leaveFrom="opacity-100 translate-y--10"
                    leaveTo="opacity-0 translate-y-10"
                >
                    <NodeContextPanel />
                </Transition>
                <GraphSettingsController hoveredNode={hoveredNode} />
                <GraphEventsController setHoveredNode={setHoveredNode} />
                <GraphDataController />

                <span className="absolute left-0 top-0 p-3 text-sm text-gray-400">
                    Centrifuge Widget Demo - v{APP_VERSION}
                </span>

                <Controls />
            </SigmaContainer>
        </div>
    );
});

export default Root;
