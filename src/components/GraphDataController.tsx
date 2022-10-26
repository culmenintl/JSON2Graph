import { useSigma, useLoadGraph } from '@react-sigma/core';
import { FC, useEffect } from 'react';
import { keyBy, omit, uniqBy } from 'lodash';

import { Dataset, FiltersState, NodeData } from '../lib/types';
import { observer } from 'mobx-react-lite';
import { RootStoreModel } from '../stores/RootStore';
import useInject from '../hooks/useInject';
import { useSnackbar } from 'notistack';

// layout
import forceAtlas2 from 'graphology-layout-forceatlas2';
import FA2Layout from 'graphology-layout-forceatlas2/worker';
import { circular, circlepack } from 'graphology-layout';
import { cropToLargestConnectedComponent } from 'graphology-components';
import { calculateDegreesAndColor, populateGraph } from '../lib/Utils';
import { STATUS } from '../stores/AppStore';
import Graph from 'graphology';

const mapStore = ({ dataStore, appStore }: RootStoreModel) => ({
    dataStore,
    appStore,
});

const GraphDataController: FC<{ filters: FiltersState }> = observer(
    ({ filters, children }) => {
        const { dataStore, appStore } = useInject(mapStore);
        const sigma = useSigma();
        const sigmaGraph = sigma.getGraph();
        const loadGraph = useLoadGraph();
        const { enqueueSnackbar, closeSnackbar } = useSnackbar();

        /**
         * Feed graphology with the new dataset:
         */
        useEffect(() => {
            const dataset = dataStore.data;

            if (!sigmaGraph || !dataset) return;

            const clusters = keyBy(dataset.clusters, 'key');
            const tags = keyBy(dataset.tags, 'key');

            // console.log('dataset', dataset);
            appStore.setStatus(STATUS.SHAPING);

            let datasetGraph = new Graph();
            try {
                datasetGraph = populateGraph(dataset);
            } catch (e: any) {
                enqueueSnackbar(e.message, {
                    variant: 'error',
                });
            }

            // Check to see if we only want to keep main component
            if (dataStore.graph.settings.crop) {
                cropToLargestConnectedComponent(datasetGraph);
            }

            // calc degrees and colorize
            calculateDegreesAndColor(datasetGraph);

            // assign circular layout to give base positions
            // circular.assign(datasetGraph);
            circlepack.assign(datasetGraph);

            dataStore.graph.setLayoutSettings(datasetGraph);
            dataStore.graph.graph.setGraph(datasetGraph);

            // check if we want to use an asynchronus web worker layout (live simulation)
            // or if we want to do a blocking simulation
            if (dataStore.graph.settings.webWorkerLayout) {
                appStore.setStatus(STATUS.SIMULATING);
                dataStore.graph.toggleSimulation();

                setTimeout(() => {
                    appStore.setStatus(STATUS.GRAPH_SIMULATED);
                    appStore.setLoading(false);
                    dataStore.graph.toggleSimulation();
                    try {
                        loadGraph(datasetGraph, true);
                    } catch (e: any) {
                        enqueueSnackbar(e.message, {
                            variant: 'error',
                            persist: true,
                        });
                    }
                    dataStore.graph.graph.setGraph(datasetGraph);
                    // fa2Layout.kill();
                    console.log('layout done');
                }, dataStore.graph.settings.runLayoutInMs);
            } else {
                // blocking synchronus simulation
                forceAtlas2.assign(datasetGraph, {
                    iterations: dataStore.graph.settings.iterations,
                });
            }

            return () => sigmaGraph.clear();
        }, [dataStore.data]);

        /**
         * This effect should run on if crop is selected, we need to either strip down the graph or create more
         */
        useEffect(() => {
            if (!dataStore.data) {
                return;
            }
            appStore.setStatus(STATUS.SHAPING);
            appStore.setLoading(true);
            // const datasetGraph = populateGraph(dataStore.data);

            let graph = dataStore.graph.graph.graph;

            // Check to see if we only want to keep main component
            if (dataStore.graph.settings.crop) {
                cropToLargestConnectedComponent(graph);
            } else {
                graph = populateGraph(dataStore.data);
                calculateDegreesAndColor(graph);
                circlepack.assign(graph);
                dataStore.graph.graph.setGraph(graph);
            }

            // calc degrees and colorize
            // calculateDegreesAndColor(datasetGraph);
            // circlepack.assign(datasetGraph);

            dataStore.graph.toggleSimulation();
            appStore.setStatus(STATUS.SIMULATING);
            setTimeout(() => {
                appStore.setStatus(STATUS.GRAPH_SIMULATED);
                appStore.setLoading(false);
                dataStore.graph.toggleSimulation();
                // fa2Layout.kill();
                console.log('layout done');
                loadGraph(graph);
            }, dataStore.graph.settings.runLayoutInMs);
        }, [dataStore.graph.settings.crop]);

        return <>{children}</>;
    }
);

export default GraphDataController;
