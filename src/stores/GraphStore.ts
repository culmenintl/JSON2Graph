import { flow, Instance, types } from 'mobx-state-tree';
import Graph from 'graphology';
import {
    density,
    diameter,
    simpleSize,
    weightedSize,
} from 'graphology-metrics/graph';

import {
    edgeUniformity,
    stress,
    neighborhoodPreservation,
} from 'graphology-metrics/layout-quality';

import forceAtlas2 from 'graphology-layout-forceatlas2';
import FA2Layout from 'graphology-layout-forceatlas2/worker';

export const enum STATUS {
    FETCHING = 'Fetching Data',
    SHAPING = 'Creating Graph',
    SIMULATING = 'Simulating...',
    GRAPH_SIMULATED = 'Graph Simulated',
}

export const GraphStat = types.model('GraphStat', {
    name: '',
    val: '',
    desc: '',
    url: '',
});

export const GraphologySettings = types
    .model('GraphologySettings', {
        runLayoutInMs: 5000,
        webWorkerLayout: true,
        iterations: 10,
        crop: false,
    })
    .actions((self) => ({
        toggleCropped() {
            self.crop = !self.crop;
        },
        toggleWebWorkerLayout() {
            self.webWorkerLayout = !self.webWorkerLayout;
        },
    }));

const WIKI_SEARCH_URL = 'https://en.wikipedia.org/w/index.php?search=Graph';

export const GraphStore = types
    .model('GraphStore', {
        layoutSettings: types.frozen(),
        settings: GraphologySettings,
        stats: types.array(GraphStat),
        refreshInterval: 500,
    })
    .volatile((self) => ({
        layout: undefined as undefined | FA2Layout,
        graph: undefined as undefined | Graph,
        isSimulating: false,
        firstSim: 0,
    }))
    .actions((self) => ({
        toggleSimulation() {
            // console.log('toggle sim');

            // console.log('is currently', self.isSimulating);

            if (self.isSimulating && self.layout) {
                self.layout.stop();
                self.isSimulating = false;
                if (!self.firstSim) {
                    self.firstSim = 1;
                }
            } else {
                if (!self.graph) return;
                self.layout = new FA2Layout(self.graph, {
                    settings: self.layoutSettings,
                });
                self.layout.start();
                self.isSimulating = true;
            }
            // console.log('is running now', self.layout.isRunning());
        },
        setGraph(value: Graph) {
            self.graph = value;
        },
    }))
    .actions((self) => ({
        setLayoutSettings(graph: Graph) {
            self.layoutSettings = forceAtlas2.inferSettings(graph);
        },
        setStats(graph: Graph | undefined) {
            if (!graph) return;
            self.stats.push({
                name: 'Density',
                val: density(graph).toString(),
                desc: 'Density of the given graph',
                url: WIKI_SEARCH_URL + 'Density',
            });
            self.stats.push({
                name: 'Diameter',
                val: diameter(graph).toString(),
                desc: 'Graph Diameter i.e the maximum eccentricity of any node of the given graph.',
                url: WIKI_SEARCH_URL + 'Diameter',
            });
            self.stats.push({
                name: 'Simple Size',
                val: simpleSize(graph).toString(),
                desc: 'Number of edges if we consider the graph simple, even if it has multiple edges between pairs of nodes',
                url: WIKI_SEARCH_URL + 'Size',
            });
            self.stats.push({
                name: 'Weighted Size',
                val: weightedSize(graph).toString(),
                desc: 'the sum of the graph’s edges’ weight, of the given graph',
                url: WIKI_SEARCH_URL + 'WeightedSize',
            });
            self.stats.push({
                name: 'Edge Uniformity',
                val: edgeUniformity(graph).toString(),
                desc: 'Edge uniformity is the normalized standard deviation of edge length of the graph',
                url: WIKI_SEARCH_URL + 'EdgeUniformity',
            });
            self.stats.push({
                name: 'Neighborhood Preservation',
                val: neighborhoodPreservation(graph).toString(),
                desc: 'Neighborhood preservation is the average proportion of node neighborhood being the same both in the graph’s topology and its 2d layout space',
                url: WIKI_SEARCH_URL + 'NeighborhoodPreservation',
            });
            self.stats.push({
                name: 'Stress',
                val: stress(graph).toString(),
                desc: 'Stress is the sum of normalized delta between node topology distances and their layout space distances. Lower values should be synonym of better layout according to this particular metric.',
                url: WIKI_SEARCH_URL + 'LayoutStress',
            });
        },
    }));

// typescript helper to get the model of the root store
export type GraphStoreModel = Instance<typeof GraphStore>;

// creates the store, giving it some initial values
export const createStore = (): GraphStoreModel => {
    const graphStore = GraphStore.create({
        settings: GraphologySettings.create(),
    });

    return graphStore;
};

// react hooks to use the context API for fetching root store
import { useContext, createContext } from 'react';

const StoreContext = createContext<GraphStoreModel>({} as GraphStoreModel);

export const useStore = () => useContext(StoreContext);
export const StoreProvider = StoreContext.Provider;
