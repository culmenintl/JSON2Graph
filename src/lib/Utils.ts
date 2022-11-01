import Graph from 'graphology';

import redditConfig from '../../configs/reddit.data.mapping.json';

// let dataArray = JSON.parse(fs.readFileSync('data.json', 'utf-8'));

export const classNames = (...classes: string[]) => {
    return classes.filter(Boolean).join(' ');
};

export type DataToGraphConfig = {
    id: string;
    url: string;
    nodes: NodeConfig[];
    edges: EdgeConfig[];
};

export interface NodeConfig extends ID_CONFIG {
    idAttr: string;
    labelAttr?: string;
    tagAttr?: string;
    clusterLabel?: string;
}
export interface EdgeConfig extends ID_CONFIG {
    sourceNodeId: string;
    targetNodeId: string;
    edgeLabel?: string;
}

interface ID_CONFIG {
    [key: string]: string | number | undefined;
}

export const populateGraph = (graph: Graph, data: [unknown]): Graph => {
    data.forEach((row: unknown) => {
        // for every row, add a node for each node configuration in config file
        redditConfig.nodes.forEach((config: NodeConfig) => {
            addNodeToGraph(graph, row, config);
        });

        // now create the edges of the graph, given the edge config
        redditConfig.edges.forEach((config: EdgeConfig) => {
            addEdgesToGraph(graph, row, config);
        });
    });

    return graph;
};

export const addNodeToGraph = (
    graph: Graph = new Graph(),
    row: any,
    config: NodeConfig
): Graph => {
    if (!row || !config) {
        throw new Error('Please include required node params.');
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

export const addEdgesToGraph = (
    graph: Graph,
    row: any,
    config: EdgeConfig
): Graph => {
    if (!row || !config) {
        throw new Error('Please include required edge params.');
    }

    if (!graph.hasNode(row[config.sourceNodeId])) {
        throw new Error('Unable to find source node with id given.');
    }

    if (!graph.hasNode(row[config.targetNodeId])) {
        throw new Error('Unable to find target node with id given.');
    }

    graph.addEdge(row[config.sourceNodeId], row[config.targetNodeId]);
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
