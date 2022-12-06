import { useSigma, useLoadGraph } from '@react-sigma/core';
import { FC, useEffect } from 'react';

import { observer } from 'mobx-react-lite';
import { RootStoreModel } from '../stores/RootStore';
import useInject from '../hooks/useInject';
import { useSnackbar } from 'notistack';

// layout
import forceAtlas2 from 'graphology-layout-forceatlas2';
import { circlepack } from 'graphology-layout';
import { cropToLargestConnectedComponent } from 'graphology-components';
import { populateGraph } from '../lib/Utils';
import { STATUS } from '../stores/AppStore';

const mapStore = ({ dataStore, appStore, graphStore }: RootStoreModel) => ({
    dataStore,
    appStore,
    graphStore,
});

const GraphDataController: FC<{}> = observer(({ children }) => {
    const { dataStore, appStore, graphStore } = useInject(mapStore);
    const sigma = useSigma();
    const sigmaGraph = sigma.getGraph();
    const loadGraph = useLoadGraph();
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    /**
     * Feed graphology with the new dataset:
     */
    useEffect(() => {
        const dataset = dataStore.dataSet[dataStore.datasetIndex].data;

        if (!sigmaGraph || !dataset) return;

        // console.log('dataset', dataset);
        appStore.setStatus(STATUS.SHAPING);

        try {
            populateGraph(
                sigmaGraph,
                dataset,
                dataStore.dataSet[dataStore.datasetIndex]
            );
        } catch (e: any) {
            // console.log('error');
            enqueueSnackbar(e.message, {
                variant: 'error',
            });
        }

        // Check to see if we only want to keep main component
        if (graphStore.settings.crop) {
            cropToLargestConnectedComponent(sigmaGraph);
        }

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
                // console.log('layout done');
            }, graphStore.settings.runLayoutInMs);
        } else {
            // blocking synchronus simulation
            forceAtlas2.assign(sigmaGraph, {
                iterations: graphStore.settings.iterations,
            });
        }

        return () => sigmaGraph.clear();
    }, [
        dataStore.dataSet[dataStore.datasetIndex].data,
        dataStore.datasetIndex,
    ]);

    const fetch = async () => {
        await dataStore.fetchData();
    };

    /**
     * This effect should run on if crop is selected, we need to either strip down the graph or create reload
     */
    useEffect(() => {
        if (!dataStore.dataSet || !graphStore.graph) {
            return;
        }
        // if graph already exists, then crop it else, clear it and reload
        if (graphStore.settings.crop && graphStore.graph) {
            cropToLargestConnectedComponent(graphStore.graph);
        } else {
            sigmaGraph.clear();
            fetch();
            return;
        }

        graphStore.toggleSimulation();
        appStore.setStatus(STATUS.SIMULATING);
        setTimeout(() => {
            appStore.setStatus(STATUS.GRAPH_SIMULATED);
            appStore.setLoading(false);
            graphStore.toggleSimulation();
            // console.log('layout done');
        }, graphStore.settings.runLayoutInMs);
    }, [graphStore.settings.crop]);

    return <>{children}</>;
});

export default GraphDataController;
