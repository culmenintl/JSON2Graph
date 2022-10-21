import { Instance, types } from 'mobx-state-tree';
import { uniqBy } from 'lodash';
import Graph from 'graphology';
import {
    density,
    diameter,
    nodeExtent,
    edgeExtent,
    modularity,
    simpleSize,
    weightedSize,
} from 'graphology-metrics/graph';

import {
    edgeUniformity,
    stress,
    neighborhoodPreservation,
} from 'graphology-metrics/layout-quality';

// const createEdges = (data: any) => {
//     const nodes = new Array<Object>();
//     const edges = new Array<Object>();

//     const nodeSet = new Set<Object>();

//     data.forEach((redditComment: any, index: number) => {
//         // const authorFound = nodes.find(
//         //     (node: any) => node.key === redditComment.author
//         // );

//         // const subredditFound = nodes.find(
//         //     (node: any) => node.key === redditComment.subreddit
//         // );

//         // const commentFound = nodes.find(
//         //     (node: any) => node.key === redditComment.id
//         // );

//         const authorNode = {
//             key: redditComment.author,

//             attributes: {
//                 label: redditComment.author,
//                 tag: 'author',
//                 URL: '',
//                 cluster: '0',
//             },
//             // cluster: '0',
//             // x: 1,
//             // y: 1,
//             // size: Math.random(),
//         };

//         const subRedditNode = {
//             key: redditComment.subreddit,
//             attributes: {
//                 label: redditComment.subreddit,
//                 tag: 'subreddit',
//                 URL: '',
//                 cluster: '0',
//             },
//         };

//         const commentNode = {
//             key: redditComment.id,
//             attributes: {
//                 label: redditComment.body,
//                 tag: 'comment',
//                 URL: '',
//                 cluster: '0',
//             },
//         };

//         // source/target

//         const authorCommentEdgeNew = {
//             source: authorNode.key,
//             target: commentNode.key,
//         };

//         const commentSubredditEdgeNew = {
//             source: commentNode.key,
//             target: subRedditNode.key,
//         };

//         if (index <= 5000) {
//             nodes.push(authorNode);
//             nodes.push(subRedditNode);
//             nodes.push(commentNode);
//             edges.push(authorCommentEdgeNew);
//             edges.push(commentSubredditEdgeNew);
//         }
//     });

//     console.log('array', Array.from(nodeSet.values()));

//     const nodeArray = Array.from(nodeSet.values());
//     const unique = uniqBy(nodes, 'key');
//     // const formattedSet = [...nodeSet].map((item: any) => {
//     //     if (typeof item === 'string') return JSON.parse(item);
//     //     else if (typeof item === 'object') return item;
//     // });

//     const graph = {
//         nodes: unique,
//         edges: edges,
//     };

//     return graph;
// };

export const GraphologySettings = types.model('GraphologySettings', {
    runLayoutInMs: 10000,
    webWorkerLayout: true,
    iterations: 10,
    cropToLargestConnectedComponent: true,
});

export const SigmaSettings = types.model('SigmaSettings', {
    labelDensity: 0.07,
    labelGridCellSize: 60,
    labelRenderedSizeThreshold: 15,
    zIndex: true,
    maxCameraRatio: 2,
    minCameraRatio: 0.3,
});

export const GraphStat = types.model('GraphStat', {
    name: '',
    val: '',
    desc: '',
    url: '',
});

const WIKI_SEARCH_URL = 'https://en.wikipedia.org/w/index.php?search=Graph';

export const GraphStore = types
    .model('GraphStore', {
        settings: GraphologySettings,
        stats: types.array(GraphStat),
    })
    .actions((self) => ({
        setStats(graph: Graph) {
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
            //@logan broken right now
            // self.stats.push({
            //     name: 'Modularity',
            //     val: modularity(graph).toString(),
            //     desc: 'Graph Modularity',
            //     url: WIKI_SEARCH_URL + 'Modularity',
            // });
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

export const SigmaStore = types.model('SigmaStore', {
    settings: SigmaSettings,
});

// DataStore, handles the
export const DataStore = types
    .model('DataStore', {
        sigma: SigmaStore,
        graph: GraphStore,
        data: types.frozen(),
        rows: 5000,
    })
    .actions((self) => ({
        setData(data: any) {
            self.data = data;
        },
    }));

// typescript helper to get the model of the DataStore
export type DataStoreModel = Instance<typeof DataStore>;
export type SigmaSettingsModel = Instance<typeof SigmaSettings>;

// creates the store, giving it some initial values
export const createStore = (): DataStoreModel => {
    const dataStore = DataStore.create({
        sigma: SigmaStore.create({
            settings: SigmaSettings.create(),
        }),
        graph: GraphStore.create({
            settings: GraphologySettings.create(),
        }),
    });

    return dataStore;
};

// react hooks to use the context API for fetching root store
import { useContext, createContext } from 'react';

const StoreContext = createContext<DataStoreModel>({} as DataStoreModel);

export const useStore = () => useContext(StoreContext);
export const StoreProvider = StoreContext.Provider;
