import Graph from "graphology"

export const classNames = (...classes: string[]) => {
    return classes.filter(Boolean).join(" ")
}

export type DatasetConfigs = {
    datasets: DataToGraphConfig[]
}

export type DataToGraphConfig = {
    id: string
    url: string
    description?: string
    nodes: NodeConfig[]
    edges: EdgeConfig[]
}

export interface NodeConfig extends ID_CONFIG {
    idAttr: string
    labelAttr?: string
    tagAttr?: string
    clusterLabel?: string
}
export interface EdgeConfig extends ID_CONFIG {
    sourceNodeId: string
    targetNodeId: string
    edgeLabel?: string
}

interface ID_CONFIG {
    [key: string]: string | number | undefined
}

export const populateGraph = (
    graph: Graph,
    data: unknown[],
    config: DatasetConfigs,
): Graph => {
    data.forEach((row: unknown) => {
        // for every row, add a node for each node configuration in config file
        config.datasets[0].nodes.forEach((config: NodeConfig) => {
            addNodeToGraph(graph, row, config)
        })

        // now create the edges of the graph, given the edge config
        config.datasets[0].edges.forEach((config: EdgeConfig) => {
            addEdgesToGraph(graph, row, config)
        })
    })

    return graph
}

export const addNodeToGraph = (
    graph: Graph,
    row: any,
    config: NodeConfig,
): Graph => {
    if (!row || !config) {
        throw new Error("Please include required node params.")
    }

    if (!row[config.idAttr]) {
        throw new Error("Unable to find property with id attribute given.")
    }

    if (!graph.hasNode(row[config.idAttr])) {
        graph.addNode(row[config.idAttr], {
            ...(config.labelAttr && { label: row[config.labelAttr] }),
            ...(config.tagAttr && { tag: row[config.tagAttr] }),
            ...(config.clusterLabel && { clusterLabel: config.clusterLabel }),
            ...row,
        })
    }

    return graph
}

export const addEdgesToGraph = (
    graph: Graph,
    row: any,
    config: EdgeConfig,
): Graph => {
    if (!row || !config) {
        throw new Error("Please include required edge params.")
    }

    if (!graph.hasNode(row[config.sourceNodeId])) {
        throw new Error("Unable to find source node with id given.")
    }

    if (!graph.hasNode(row[config.targetNodeId])) {
        throw new Error("Unable to find target node with id given.")
    }

    graph.addEdge(row[config.sourceNodeId], row[config.targetNodeId])
    return graph
}

export const calculateDegreesAndColor = (graph: Graph) => {
    const degrees = graph.nodes().map((node) => graph.degree(node))
    const minDegree = Math.min(...degrees)
    const maxDegree = Math.max(...degrees)
    const minSize = 2
    const maxSize = 25
    graph.forEachNode((node, attributes) => {
        // Add Colors
        const COLORS: Record<string, string> = {
            Commented: "#FA5A3D",
            Subreddit: "#5A75DB",
            User: "#5A85AB",
        }
        graph.setNodeAttribute(
            node,
            "color",
            COLORS[attributes.clusterLabel as string],
        )
        const degree = graph.degree(node)
        graph.setNodeAttribute(
            node,
            "size",
            minSize +
                ((degree - minDegree) / (maxDegree - minDegree)) *
                    (maxSize - minSize),
        )
    })
}

// Import libraries
// Assuming you have installed @types/node for fs
import G6, { Graph as G6Graph, IEdge, INode } from "@antv/g6"
import { GraphinData, IUserEdge, IUserNode } from "@antv/graphin"

// Keeping your interfaces and types same, they seem well formed

export const populateG6Graph = (
    data: unknown[],
    config: DatasetConfigs,
): G6Graph => {
    const graphData: { nodes: any[]; edges: any[] } = { nodes: [], edges: [] }

    // populate nodes and edges
    data.forEach((row: unknown) => {
        config.datasets[0].nodes.forEach((nodeConfig) => {
            addNodeToG6Graph(graphData, row, nodeConfig)
        })

        config.datasets[0].edges.forEach((edgeConfig) => {
            addEdgesToG6Graph(graphData, row, edgeConfig)
        })
    })

    // Create a graph instance
    const graph = new G6.Graph({
        container: "graph-container", // container id
        width: 2000,
        height: 1000,
        modes: {
            default: ["drag-canvas", "zoom-canvas", "drag-node", "fit-view"],
        },
        layout: {
            type: "force2",
            onTick: () => {
                console.log("ticking")
            },
            onLayoutEnd: () => {
                console.log("force layout done")
            },
            animate: true,
            workerEnabled: true, // Whether to activate web-worker
            // gpuEnabled: true, // Whether to enable the GPU parallel computing, supported by G6 4.0
        },
    })

    // Load data into the graph
    graph.data(graphData)
    // Render the graph
    graph.render()

    return graph
}

export const pupulateGraphinData = (
    data: unknown[],
    config: DatasetConfigs,
) => {
    const graphData: { nodes: any[]; edges: any[] } = { nodes: [], edges: [] }

    // populate nodes and edges
    data.forEach((row: unknown) => {
        config.datasets[0].nodes.forEach((nodeConfig) => {
            addNodeToG6Graph(graphData, row, nodeConfig)
        })

        config.datasets[0].edges.forEach((edgeConfig) => {
            addEdgesToG6Graph(graphData, row, edgeConfig)
        })
    })

    // Create a graph instance
    // const graph = new G6.Graph({
    //     container: "graph-container", // container id
    //     layout: {
    //         type: "random",
    //     }, // using a random layout
    //     defaultNode: { size: 5 },
    // })

    // // Load data into the graph
    // graph.data(graphData)
    // // Render the graph
    // graph.render()

    // return graph
    return graphData
}

// create a method to return a GraphinData object from a G6Graph object
export function convertG6ToGraphinData(g6Graph: G6Graph): GraphinData {
    const nodes: Array<IUserNode> = g6Graph.getNodes().map((node: INode) => {
        const model = node.getModel()
        return {
            id: node.getID(),
            data: model.data,
            x: model.x,
            y: model.y,
        }
    })

    const edges: Array<IUserEdge> = g6Graph.getEdges().map((edge: IEdge) => {
        return {
            source: edge.getSource().getID(),
            target: edge.getTarget().getID(),
        }
    })

    return { nodes, edges }
}

export const addNodeToG6Graph = (
    graphData: { nodes: any[]; edges: any[] },
    row: unknown,
    nodeConfig: NodeConfig,
): void => {
    const record = row as Record<string, unknown>

    if (!record[nodeConfig.idAttr as string]) {
        throw new Error("Unable to find property with id attribute given.")
    }

    const nodeExists = graphData.nodes.some(
        (node) => node.id === record[nodeConfig.idAttr as string],
    )

    if (!nodeExists) {
        graphData.nodes.push({
            id: record[nodeConfig.idAttr as string],
            // label: record[nodeConfig.labelAttr as string],
            // attrs: record,
        })
    }
}

export const addEdgesToG6Graph = (
    graphData: { nodes: any[]; edges: any[] },
    row: unknown,
    edgeConfig: EdgeConfig,
): void => {
    const record = row as Record<string, unknown>

    if (!record[edgeConfig.sourceNodeId] || !record[edgeConfig.targetNodeId]) {
        throw new Error("Required edge params missing.")
    }

    const edgeExists = graphData.edges.some(
        (edge) =>
            edge.source === record[edgeConfig.sourceNodeId] &&
            edge.target === record[edgeConfig.targetNodeId],
    )

    if (!edgeExists) {
        graphData.edges.push({
            id: `${record[edgeConfig.sourceNodeId]}-${
                record[edgeConfig.targetNodeId]
            }`,
            source: record[edgeConfig.sourceNodeId],
            target: record[edgeConfig.targetNodeId],
            label: edgeConfig.edgeLabel
                ? record[edgeConfig.edgeLabel as string]
                : undefined,
        })
    }
}
