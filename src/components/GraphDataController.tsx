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
import { circular, circlepack } from 'graphology-layout';
import { cropToLargestConnectedComponent } from 'graphology-components';
import { calculateDegreesAndColor, populateGraph } from '../lib/Utils';
import { STATUS } from '../stores/AppStore';

import config from '../../configs/data.mapping.json';

const mapStore = ({ dataStore, appStore, graphStore }: RootStoreModel) => ({
    dataStore,
    appStore,
    graphStore,
});

const GraphDataController: FC<{ filters: FiltersState }> = observer(
    ({ filters, children }) => {
        const { dataStore, appStore, graphStore } = useInject(mapStore);
        const sigma = useSigma();
        const sigmaGraph = sigma.getGraph();
        const loadGraph = useLoadGraph();
        const { enqueueSnackbar, closeSnackbar } = useSnackbar();

        /**
         * Feed graphology with the new dataset:
         */
        useEffect(() => {
            const dataset = dataStore.dataSet.data;

            if (!sigmaGraph || !dataset) return;

            // const clusters = keyBy(dataset.clusters, 'key');
            // const tags = keyBy(dataset.tags, 'key');

            // console.log('dataset', dataset);
            appStore.setStatus(STATUS.SHAPING);

            try {
                populateGraph(sigmaGraph, dataset, config);
            } catch (e: any) {
                enqueueSnackbar(e.message, {
                    variant: 'error',
                });
            }

            // Check to see if we only want to keep main component
            if (graphStore.settings.crop) {
                cropToLargestConnectedComponent(sigmaGraph);
            }

            // calc degrees and colorize
            calculateDegreesAndColor(sigmaGraph);

            // assign circular layout to give base positions
            // circular.assign(datasetGraph);
            circlepack.assign(sigmaGraph);

            graphStore.setLayoutSettings(sigmaGraph);
            graphStore.setGraph(sigmaGraph);

            // check if we want to use an asynchronus web worker layout (live simulation)
            // or if we want to do a blocking simulation
            if (graphStore.settings.webWorkerLayout) {
                appStore.setStatus(STATUS.SIMULATING);
                graphStore.toggleSimulation();

                setTimeout(() => {
                    appStore.setStatus(STATUS.GRAPH_SIMULATED);
                    appStore.setLoading(false);
                    graphStore.toggleSimulation();
                    // graphStore.setGraph(sigmaGraph);
                    // fa2Layout.kill();
                    console.log('layout done');
                }, graphStore.settings.runLayoutInMs);
            } else {
                // blocking synchronus simulation
                forceAtlas2.assign(sigmaGraph, {
                    iterations: graphStore.settings.iterations,
                });
            }

            return () => sigmaGraph.clear();
        }, [dataStore.dataSet.data]);

        /**
         * This effect should run on if crop is selected, we need to either strip down the graph or create reload
         */
        useEffect(() => {
            if (!dataStore.dataSet || !graphStore.graph) {
                return;
            }
            // appStore.setStatus(STATUS.SHAPING);
            // appStore.setLoading(true);
            // const datasetGraph = populateGraph(dataStore.data);

            // if graph already exists, then crop it else, clear it and reload
            if (graphStore.settings.crop && graphStore.graph) {
                cropToLargestConnectedComponent(graphStore.graph);
            } else {
                sigmaGraph.clear();
                dataStore.fetchData();
                return;
            }

            // calc degrees and colorize
            // calculateDegreesAndColor(datasetGraph);
            // circlepack.assign(datasetGraph);

            graphStore.toggleSimulation();
            appStore.setStatus(STATUS.SIMULATING);
            setTimeout(() => {
                appStore.setStatus(STATUS.GRAPH_SIMULATED);
                appStore.setLoading(false);
                graphStore.toggleSimulation();
                console.log('layout done');
            }, graphStore.settings.runLayoutInMs);
        }, [graphStore.settings.crop]);

        return <>{children}</>;
    }
);

export default GraphDataController;
