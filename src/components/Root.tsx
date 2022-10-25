import { FC, useEffect, useState, useRef } from 'react';
import autoAnimate from '@formkit/auto-animate';
import {
    SigmaContainer,
    ZoomControl,
    ControlsContainer,
    SearchControl,
    useSigma,
} from '@react-sigma/core';
import { omit, mapValues, keyBy, constant } from 'lodash';

import GraphSettingsController from './GraphSettingsController';
import GraphEventsController from './GraphEventsController';
import GraphDataController from './GraphDataController';
import DescriptionPanel from './DescriptionPanel';
import { Dataset, FiltersState } from '../lib/types';
import ClustersPanel from './ClustersPanel';
import SearchField from './SearchField';
import drawLabel from '../lib/canvas-utils';
import GraphTitle from './GraphTitle';
import TagsPanel from './TagsPanel';

import { BiRadioCircleMarked, BiBookContent } from 'react-icons/bi';
import { BsZoomIn, BsZoomOut } from 'react-icons/bs';

import Loading from './Loading';
import LoadingLogo from './LoadingLogo';

import '@react-sigma/core/lib/react-sigma.min.css';

import { ToggleDev } from './ToggleDev';
import { RootStoreModel } from '../stores/RootStore';
import { STATUS } from '../stores/AppStore';
import { observer } from 'mobx-react-lite';
import { DevPanel } from './DevPanel';
import useInject from '../hooks/useInject';
import Button from './Button';
import { LayoutForceAtlas2Control } from '@react-sigma/layout-forceatlas2';
import StatusDisplay from './StatusDisplay';

// notistack
import { useSnackbar } from 'notistack';

const mapStore = ({ appStore, dataStore }: RootStoreModel) => ({
    appStore,
    dataStore,
});

const Controls: FC<{}> = observer(() => {
    const { dataStore, appStore } = useInject(mapStore);
    const parent = useRef(null);
    useEffect(() => {
        parent.current && autoAnimate(parent.current);
    }, [parent]);

    return (
        <ControlsContainer
            className={`!border-1 !left-0 !right-0 !mx-auto !flex !w-full !max-w-xl !justify-between ${
                appStore.devMode ? '!rounded-lg' : '!rounded-full'
            } max-h-[75vh] !border !border-gray-300 !bg-white/30 !backdrop-blur-md`}
        >
            <div className="flex w-full flex-col py-3" ref={parent}>
                {appStore.devMode && <DevPanel />}
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

                <div className="flex flex-col">
                    {!dataStore.graph.simulated && <LoadingLogo />}
                    <span className="absolute left-0 top-0 p-3 text-sm text-gray-400">
                        Centrifuge Widget Demo - v{APP_VERSION}
                    </span>
                    <Controls />
                </div>
            </SigmaContainer>
        </div>
    );
});

export default Root;
