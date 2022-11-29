import Graph from 'graphology';
import { DataToGraphConfig, NodeConfig, EdgeConfig } from '../stores/DataStore';

export const COLOR_PALETTE = [
    '#9b7ad8',
    '#8892a2',
    '#758cec',
    '#4d9dce',
    '#3eb574',
    '#cb7519',
    '#d7674b',
    '#dc5472',
    '#bf62cf',
];

export const classNames = (...classes: string[]) => {
    return classes.filter(Boolean).join(' ');
};

export const populateGraph = (
    graph: Graph,
    data: [unknown],
    config: DataToGraphConfig
): Graph => {
    data.forEach((row: unknown) => {
        // for every row, add a node for each node configuration in config file
        config.nodes.forEach((config: NodeConfig) => {
            addNodeToGraph(graph, row, config);
        });

        // now create the edges of the graph, given the edge config
        config.edges.forEach((config: EdgeConfig) => {
            addEdgesToGraph(graph, row, config);
        });
    });

    calculateDegreesAndColor(graph, config);

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

    // @logan added to handle no node value
    if (!row[config.idAttr]) {
        row[config.idAttr] = 'No Value';
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
        throw new Error(
            'Unable to find source node with id given - ' + config.sourceNodeId
        );
    }

    if (!graph.hasNode(row[config.targetNodeId])) {
        throw new Error(
            'Unable to find target node with id given. - ' + config.targetNodeId
        );
    }

    if (config.merge) {
        graph.mergeEdge(row[config.sourceNodeId], row[config.targetNodeId]);
    } else {
        graph.addEdge(row[config.sourceNodeId], row[config.targetNodeId]);
    }

    return graph;
};

export const calculateDegreesAndColor = (
    graph: Graph,
    config: DataToGraphConfig
) => {
    const degrees = graph.nodes().map((node) => graph.degree(node));
    const minDegree = Math.min(...degrees);
    const maxDegree = Math.max(...degrees);
    const minSize = 2,
        maxSize = 25;

    const COLOR_MAP: Record<string, string> = {};

    config.nodes.forEach((val, index) => {
        COLOR_MAP[val.clusterLabel!] =
            COLOR_PALETTE[(COLOR_PALETTE.length * Math.random()) | 0];
    });

    graph.forEachNode((node, attributes) => {
        graph.setNodeAttribute(
            node,
            'color',
            COLOR_MAP[attributes.clusterLabel]
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
