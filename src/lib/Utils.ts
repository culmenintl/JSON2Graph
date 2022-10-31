import Graph from 'graphology';
import { RedditNode } from './types';

import redditConfig from '../../configs/reddit.data.mapping.json';

// let dataArray = JSON.parse(fs.readFileSync('data.json', 'utf-8'));

export const classNames = (...classes: string[]) => {
    return classes.filter(Boolean).join(' ');
};

export type DataToGraphConfig = {
    id: string;
    url: string;
    nodes: NodeConfig[];
};

export const populateGraph = (graph: Graph, data: [unknown]): Graph => {
    data.forEach((node: unknown) => {
        redditConfig.nodes.forEach((config: NodeConfig) => {
            addRowToGraph(graph, node, config);
        });

        // now create the edges between author/comment and comment/subreddit
        // graph.addEdge(author, comment);
        // graph.addEdge(comment, subreddit);
    });

    return graph;
};

export interface GraphNode extends NodeIdConfig {
    id: string;
    label?: string;
    tag?: string;
    clusterLabel?: string;
}

export interface NodeConfig extends NodeIdConfig {
    idAttr: string;
    labelAttr?: string;
    tagAttr?: string;
    clusterLabel?: string;
}

interface NodeIdConfig {
    [key: string]: string | number | undefined;
}

export const addRowToGraph = (
    graph: Graph = new Graph(),
    row: any,
    config: NodeConfig
): Graph => {
    if (!row || !config) {
        throw new Error('Please include required params.');
    }

    if (!row[config.idAttr]) {
        throw new Error('Unable to find property with id attribute given.');
    }

    if (!graph.hasNode(row[config.idAttr])) {
        graph.addNode(row[config.idAttr], {
            ...(config.labelAttr && { label: row[config.labelAttr] }),
            ...(config.tagAttr && { tag: row[config.tagAttr] }),
            ...(config.clusterLabel && { clusterLabel: config.clusterLabel }),
            ...row,
        });
    }

    return graph;
};

export const calculateDegreesAndColor = (graph: Graph) => {
    const degrees = graph.nodes().map((node) => graph.degree(node));
    const minDegree = Math.min(...degrees);
    const maxDegree = Math.max(...degrees);
    const minSize = 2,
        maxSize = 25;
    graph.forEachNode((node, attributes) => {
        // Add Colors
        const COLORS: Record<string, string> = {
            Commented: '#FA5A3D',
            Subreddit: '#5A75DB',
            User: '#5A85AB',
        };
        graph.setNodeAttribute(
            node,
            'color',
            COLORS[attributes.clusterLabel as string]
        );
        const degree = graph.degree(node);
        graph.setNodeAttribute(
            node,
            'size',
            minSize +
                ((degree - minDegree) / (maxDegree - minDegree)) *
                    (maxSize - minSize)
        );
    });
};

// currently calculated above
// export const applyColor = (graph: Graph) => {
//     // Add Colors
//     const COLORS: Record<string, string> = {
//         Commented: '#FA5A3D',
//         Subreddit: '#5A75DB',
//         User: '#5A85AB',
//     };
//     graph.forEachNode((node, attributes) =>
//         graph.setNodeAttribute(
//             node,
//             'color',
//             COLORS[attributes.clusterLabel as string]
//         )
//     );
// };
