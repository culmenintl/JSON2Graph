import Graph from 'graphology';

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

export type DatasetConfigs = {
    datasets: DataToGraphConfig[];
};

export type DataToGraphConfig = {
    id: string;
    url: string;
    description?: string;
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
    merge?: boolean;
}

interface ID_CONFIG {
    [key: string]: string | number | boolean | undefined;
}

export const populateGraph = (
    graph: Graph,
    data: [unknown],
    config: DatasetConfigs
): Graph => {
    data.forEach((row: unknown) => {
        // for every row, add a node for each node configuration in config file
        config.datasets[1].nodes.forEach((config: NodeConfig) => {
            addNodeToGraph(graph, row, config);
        });

        // now create the edges of the graph, given the edge config
        config.datasets[1].edges.forEach((config: EdgeConfig) => {
            addEdgesToGraph(graph, row, config);
        });
    });

    calculateDegreesAndColor(graph, config.datasets[1]);

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
        return graph;
        // throw new Error(
        //     'Unable to add node. No property with id attribute given - ' +
        //         JSON.stringify(row) +
        //         '-' +
        //         config.idAttr
        // );
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
    console.log(COLOR_PALETTE);

    graph.forEachNode((node, attributes) => {
        // console.log('attributes', attributes);
        // Add Colors
        // const COLORS: Record<string, string> = {
        //     Commented: '#FA5A3D',
        //     Subreddit: '#5A75DB',
        //     User: '#5A85AB',
        // };
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
