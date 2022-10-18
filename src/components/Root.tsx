import { FC, useEffect, useState } from 'react';
import {
    SigmaContainer,
    ZoomControl,
    ControlsContainer,
    SearchControl,
} from '@react-sigma/core';
import { omit, mapValues, keyBy, constant } from 'lodash';

import getNodeProgramImage from 'sigma/rendering/webgl/programs/node.image';

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

import '@react-sigma/core/lib/react-sigma.min.css';

import { ToggleDev } from './ToggleDev';
import { RootStoreModel } from '../stores/RootStore';
import { observer } from 'mobx-react-lite';
import { DevPanel } from './DevPanel';
import useInject from '../hooks/useInject';

const mapStore = ({ appStore, dataStore }: RootStoreModel) => ({
    appStore,
    dataStore,
});

const Root: FC<{}> = observer(() => {
    const [dataReady, setDataReady] = useState(false);
    const [dataset, setDataset] = useState<Dataset | null>(null);
    const [filtersState, setFiltersState] = useState<FiltersState>({
        clusters: {},
        tags: {},
    });
    const [hoveredNode, setHoveredNode] = useState<string | null>(null);

    // mobx
    const { dataStore, appStore } = useInject(mapStore);

    // Load data on mount:
    useEffect(() => {
        fetch(`${import.meta.env.VITE_PUBLIC_URL}/dataset.json`)
            .then((res) => res.json())
            .then((dataset: Dataset) => {
                // console.log('dataset', dataset);
                dataStore.setData(dataset);
                setDataset(dataset);
                setFiltersState({
                    clusters: mapValues(
                        keyBy(dataset.clusters, 'key'),
                        constant(true)
                    ),
                    tags: mapValues(keyBy(dataset.tags, 'key'), constant(true)),
                });
                requestAnimationFrame(
                    () => setDataReady(true)
                    // @logan test loading
                    // setTimeout(() => {
                    //     setDataReady(true);
                    // }, 5000)
                );
            });
    }, []);

    if (!dataset) return <Loading />;

    return (
        <div id="app-root">
            <SigmaContainer
                settings={{
                    nodeProgramClasses: { image: getNodeProgramImage() },
                    labelRenderer: drawLabel,
                    defaultNodeType: 'image',
                    defaultEdgeType: 'arrow',
                    labelDensity: 0.07,
                    labelGridCellSize: 60,
                    labelRenderedSizeThreshold: 15,
                    zIndex: true,
                    maxCameraRatio: 2,
                    minCameraRatio: 0.3,
                }}
            >
                <GraphSettingsController hoveredNode={hoveredNode} />
                <GraphEventsController setHoveredNode={setHoveredNode} />
                <GraphDataController filters={filtersState} />

                {/* show loading while data not ready */}
                {!dataReady && <Loading />}

                {dataReady && (
                    <div className="flex flex-col">
                        <ControlsContainer
                            className={`!border-1 !left-0 !right-0 !mx-auto !flex !w-full !max-w-xl !justify-between ${
                                appStore.devMode
                                    ? '!rounded-lg'
                                    : '!rounded-full'
                            } !border border-gray-300 !px-6`}
                        >
                            <div className="flex w-full flex-col">
                                {appStore.devMode && <DevPanel />}
                                <div className="flex flex-row items-center justify-between">
                                    <ToggleDev />
                                    <ZoomControl className="!flex !items-center !justify-center !border-b-0" />
                                    <SearchControl className="!border-b-2 !border-gray-300" />
                                </div>
                            </div>
                        </ControlsContainer>
                        <div className="contents">
                            <GraphTitle filters={filtersState} />
                            <div className="panels">
                                {/* <SearchField filters={filtersState} /> */}
                                {/* <DescriptionPanel /> */}
                                {/* <ClustersPanel
                                    clusters={dataset.clusters}
                                    filters={filtersState}
                                    setClusters={(clusters) =>
                                        setFiltersState((filters) => ({
                                            ...filters,
                                            clusters,
                                        }))
                                    }
                                    toggleCluster={(cluster) => {
                                        setFiltersState((filters) => ({
                                            ...filters,
                                            clusters: filters.clusters[cluster]
                                                ? omit(
                                                      filters.clusters,
                                                      cluster
                                                  )
                                                : {
                                                      ...filters.clusters,
                                                      [cluster]: true,
                                                  },
                                        }));
                                    }}
                                /> */}
                                {/* <TagsPanel
                                    tags={dataset.tags}
                                    filters={filtersState}
                                    setTags={(tags) =>
                                        setFiltersState((filters) => ({
                                            ...filters,
                                            tags,
                                        }))
                                    }
                                    toggleTag={(tag) => {
                                        setFiltersState((filters) => ({
                                            ...filters,
                                            tags: filters.tags[tag]
                                                ? omit(filters.tags, tag)
                                                : {
                                                      ...filters.tags,
                                                      [tag]: true,
                                                  },
                                        }));
                                    }}
                                /> */}
                            </div>
                        </div>
                    </div>
                )}
            </SigmaContainer>
        </div>
    );
});

export default Root;
