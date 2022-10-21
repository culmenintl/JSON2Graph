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
import circular from 'graphology-layout/circular';
import { cropToLargestConnectedComponent } from 'graphology-components';
import { calculateDegrees, populateGraph } from '../lib/Utils';

const GraphDataController: FC<{ filters: FiltersState }> = observer(
    ({ filters, children }) => {
        const mapStore = ({ dataStore }: RootStoreModel) => ({
            dataStore,
        });
        const { dataStore } = useInject(mapStore);
        const sigma = useSigma();
        const graph = sigma.getGraph();
        const loadGraph = useLoadGraph();

        /**
         * Feed graphology with the new dataset:
         */
        useEffect(() => {
            const dataset = dataStore.data as Dataset;
            const crop =
                dataStore.graph.settings.cropToLargestConnectedComponent;
            if (!graph || !dataset) return;

            const clusters = keyBy(dataset.clusters, 'key');
            const tags = keyBy(dataset.tags, 'key');

            // console.log('dataset', dataset);

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
            circular.assign(datasetGraph);
            forceAtlas2.assign(datasetGraph, { iterations: 5 });

            // now that the graph is set up, load it into sigma
            loadGraph(datasetGraph);

            // dataStore.graph.setDensity(datasetGraph);

            // once loaded, we need to simulate the graph so it looks decent
            const settings = forceAtlas2.inferSettings(graph);

            // console.log('settings', settings);

            // check if we want to use an asynchronus web worker layout (live simulation)
            // or if we want to do a blocking simulation
            if (dataStore.graph.settings.webWorkerLayout) {
                // live simulation
                const fa2Layout = new FA2Layout(graph, {
                    settings,
                });

                console.log(
                    'starting layout - runtime: ' +
                        dataStore.graph.settings.runLayoutInMs
                );

                fa2Layout.start();

                setTimeout(() => {
                    fa2Layout.stop();
                    fa2Layout.kill();
                    console.log('layout done');
                }, dataStore.graph.settings.runLayoutInMs);
            } else {
                // blocking synchronus simulation
                forceAtlas2.assign(graph, { settings, iterations: 5 });
            }

            return () => graph.clear();
        }, [graph]);

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
        }, [graph, filters]);

        return <>{children}</>;
    }
);

export default GraphDataController;
