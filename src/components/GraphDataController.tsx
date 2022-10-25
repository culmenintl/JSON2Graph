import { useSigma, useLoadGraph } from '@react-sigma/core';
import { FC, useEffect } from 'react';
import { keyBy, omit, uniqBy } from 'lodash';

import { Dataset, FiltersState, NodeData } from '../lib/types';
import { observer } from 'mobx-react-lite';
import { RootStoreModel } from '../stores/RootStore';
import useInject from '../hooks/useInject';

// layout
import forceAtlas2 from 'graphology-layout-forceatlas2';
import FA2Layout from 'graphology-layout-forceatlas2/worker';
import { circular, circlepack } from 'graphology-layout';
import { cropToLargestConnectedComponent } from 'graphology-components';
import { calculateDegrees, populateGraph } from '../lib/Utils';
import { STATUS } from '../stores/AppStore';

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

            const datasetGraph = populateGraph(dataset);

            // Check to see if we only want to keep main component
            if (dataStore.graph.settings.cropToLargestConnectedComponent) {
                cropToLargestConnectedComponent(datasetGraph);
            }

            // Add Colors
            const COLORS: Record<string, string> = {
                Commented: '#FA5A3D',
                Subreddit: '#5A75DB',
                User: '#5A85AB',
            };
            datasetGraph.forEachNode((node, attributes) =>
                datasetGraph.setNodeAttribute(
                    node,
                    'color',
                    COLORS[attributes.clusterLabel as string]
                )
            );

            calculateDegrees(datasetGraph);

            // assign circular layout to give base positions
            // circular.assign(datasetGraph);
            circlepack.assign(datasetGraph);
            // now that the graph is set up, load it into sigma
            // loadGraph(datasetGraph);

            // once loaded, we need to simulate the graph so it looks decent
            const sensibleSettings = forceAtlas2.inferSettings(datasetGraph);

            console.log('settings', sensibleSettings);
            console.log(
                'basic graph settings',
                forceAtlas2.inferSettings(sigmaGraph)
            );

            dataStore.graph.setLayoutSettings(datasetGraph);

            // check if we want to use an asynchronus web worker layout (live simulation)
            // or if we want to do a blocking simulation
            if (dataStore.graph.settings.webWorkerLayout) {
                appStore.setStatus(STATUS.SIMULATING);
                // live simulation
                const fa2Layout = new FA2Layout(datasetGraph, {
                    settings: forceAtlas2.inferSettings(datasetGraph),
                });

                console.log(
                    'starting layout - runtime: ' +
                        dataStore.graph.settings.runLayoutInMs
                );

                fa2Layout.start();

                setTimeout(() => {
                    appStore.setStatus(STATUS.GRAPH_SIMULATED);
                    appStore.setLoading(false);
                    fa2Layout.stop();
                    fa2Layout.kill();
                    console.log('layout done');
                    loadGraph(datasetGraph, true);
                    dataStore.graph.setSimulated(true);
                }, dataStore.graph.settings.runLayoutInMs);
            } else {
                // blocking synchronus simulation
                forceAtlas2.assign(datasetGraph, { iterations: 5 });
            }

            return () => sigmaGraph.clear();
        }, [dataStore.data]);

        /**
         * Apply filters to graphology:
         */
        useEffect(() => {
            // const { clusters, tags } = filters;
            // graph.forEachNode((node, { cluster, tag }) =>
            //     graph.setNodeAttribute(
            //         node,
            //         'hidden',
            //         !clusters[cluster] || !tags[tag]
            //     )
            // );
        }, [sigmaGraph, filters]);

        return <>{children}</>;
    }
);

export default GraphDataController;
