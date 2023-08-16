import IconLoader from "@antv/graphin-icons";
import Graphin from "@antv/graphin";
import "@antv/graphin-icons/dist/index.css";
const icons = Graphin.registerFontFamily(IconLoader);
export const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(" ");
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
}

interface ID_CONFIG {
  [key: string]: string | number | undefined;
}

// export const populateGraph = (
//     graph: Graph,
//     data: unknown[],
//     config: DatasetConfigs,
// ): Graph => {
//     data.forEach((row: unknown) => {
//         // for every row, add a node for each node configuration in config file
//         config.datasets[0].nodes.forEach((config: NodeConfig) => {
//             addNodeToGraph(graph, row, config)
//         })

//         // now create the edges of the graph, given the edge config
//         config.datasets[0].edges.forEach((config: EdgeConfig) => {
//             addEdgesToGraph(graph, row, config)
//         })
//     })

//     return graph
// }

// export const addNodeToGraph = (
//     graph: Graph,
//     row: any,
//     config: NodeConfig,
// ): Graph => {
//     if (!row || !config) {
//         throw new Error("Please include required node params.")
//     }

//     if (!row[config.idAttr]) {
//         throw new Error("Unable to find property with id attribute given.")
//     }

//     if (!graph.hasNode(row[config.idAttr])) {
//         graph.addNode(row[config.idAttr], {
//             ...(config.labelAttr && { label: row[config.labelAttr] }),
//             ...(config.tagAttr && { tag: row[config.tagAttr] }),
//             ...(config.clusterLabel && { clusterLabel: config.clusterLabel }),
//             ...row,
//         })
//     }

//     return graph
// }

// export const addEdgesToGraph = (
//     graph: Graph,
//     row: any,
//     config: EdgeConfig,
// ): Graph => {
//     if (!row || !config) {
//         throw new Error("Please include required edge params.")
//     }

//     if (!graph.hasNode(row[config.sourceNodeId])) {
//         throw new Error("Unable to find source node with id given.")
//     }

//     if (!graph.hasNode(row[config.targetNodeId])) {
//         throw new Error("Unable to find target node with id given.")
//     }

//     graph.addEdge(row[config.sourceNodeId], row[config.targetNodeId])
//     return graph
// }

// export const calculateDegreesAndColor = (graphinData: GraphinData) => {
//     const graph = graphinData
//     const degrees: number[] = graph.nodes.map(
//         (node: any) =>
//             graph.edges.filter(
//                 (edge: any) =>
//                     edge.source === node.id || edge.target === node.id,
//             ).length,
//     )
//     const minDegree = Math.min(...degrees)
//     const maxDegree = Math.max(...degrees)
//     const minSize = 2
//     const maxSize = 25

//     graph.nodes.forEach((node: any) => {
//         // Add Colors
//         const COLORS: Record<string, string> = {
//             Commented: "#FA5A3D",
//             Subreddit: "#5A75DB",
//             User: "#5A85AB",
//         }
//         node.style = {
//             keyshape: {
//                 size:
//                     minSize +
//                     (maxSize - minSize) *
//                         ((degrees[node.id] - minDegree) /
//                             (maxDegree - minDegree)),
//                 fill: COLORS[node.clusterLabel as string],
//             },
//         }
//     })
// }

// Import libraries
// Assuming you have installed @types/node for fs
import G6, { Graph as G6Graph, IEdge, INode } from "@antv/g6";
import { GraphinData, IUserEdge, IUserNode } from "@antv/graphin";

// Keeping your interfaces and types same, they seem well formed

// export const populateG6Graph = (
//     data: unknown[],
//     config: DatasetConfigs,
// ): G6Graph => {
//     const graphData: { nodes: any[]; edges: any[] } = { nodes: [], edges: [] }

//     // populate nodes and edges
//     data.forEach((row: unknown) => {
//         config.datasets[0].nodes.forEach((nodeConfig) => {
//             addNodeToG6Graph(graphData, row, nodeConfig)
//         })

//         config.datasets[0].edges.forEach((edgeConfig) => {
//             addEdgesToG6Graph(graphData, row, edgeConfig)
//         })
//     })

//     // Create a graph instance
//     const graph = new G6.Graph({
//         container: "graph-container", // container id
//         width: 2000,
//         height: 1000,
//         modes: {
//             default: ["drag-canvas", "zoom-canvas", "drag-node", "fit-view"],
//         },
//         layout: {
//             type: "force2",
//             onTick: () => {
//                 console.log("ticking")
//             },
//             onLayoutEnd: () => {
//                 console.log("force layout done")
//             },
//             animate: true,
//             workerEnabled: true, // Whether to activate web-worker
//             // gpuEnabled: true, // Whether to enable the GPU parallel computing, supported by G6 4.0
//         },
//     })

//     // Load data into the graph
//     graph.data(graphData)
//     // Render the graph
//     graph.render()

//     return graph
// }

function setSizeBasedOnDegrees(graphData: {
  nodes: IUserNode[];
  edges: IUserEdge[];
}) {
  const maxDegree = Math.max(
    ...graphData.nodes.map((node) => calculateDegree(graphData, node.id))
  );

  // console.log("maxDegree", maxDegree)

  const COLORS: Record<string, string> = {
    Commented: getRandomColor(),
    Subreddit: getRandomColor(),
    User: getRandomColor(),
  };

  const ICON: Record<string, string> = {
    Commented: "comment",
    Subreddit: "book",
    User: "user",
  };

  const minSize = 26;
  const maxSize = maxDegree / 2;

  graphData.nodes.forEach((node) => {
    // console.log(node.clusterLabel.length)
    const size =
      minSize +
      (maxSize - minSize) * (calculateDegree(graphData, node.id) / maxDegree);
    node.style = {
      keyshape: {
        size,
        fill: COLORS[node.clusterLabel as string],
        fillOpacity: 0.8,
      },
      label: {
        value: truncateString(node.label.value, 10),
      },
      icon: {
        type: "font",
        fontFamily: "graphin",
        value: icons[ICON[node.clusterLabel as string]],
        size: size - 15,
        fill: "#fff",
      },
      // badges: [
      //     {
      //         position: "RT",
      //         type: "text",
      //         value: node.clusterLabel,
      //         size: [node.clusterLabel.length * 10, 15],
      //         fill: COLORS[node.clusterLabel as string],
      //         color: "#fff",
      //     },
      // ],
    };
  });
}

/**
 * @description Truncate a string to a given length
 * @author Logan Hendershot
 * @date 07/25/2023
 * @param {string} str
 * @param {number} maxLength
 * @returns {*}  {string}
 */
export const truncateString = (
  str: string | undefined,
  maxLength: number
): string => {
  if (str && str.length <= maxLength) {
    return str;
  }

  const truncatedString = str?.substring(0, maxLength);
  return `${truncatedString}...`;
};

/**
 * @description Calculate the degree of a node in a graph given the graph data and the node id
 * @author Logan Hendershot
 * @date 07/25/2023
 * @param {{ nodes: IUserNode[]; edges: IUserEdge[] }} graphData
 * @param {string} nodeId
 * @returns {*}  {number}
 */
const calculateDegree = (
  graphData: { nodes: IUserNode[]; edges: IUserEdge[] },
  nodeId: string
): number => {
  let degree = 0;
  graphData.edges.forEach((edge) => {
    if (edge.source === nodeId || edge.target === nodeId) {
      degree++;
    }
  });
  return degree;
};

export const populateGraphinData = (
  data: unknown[],
  config: DatasetConfigs
) => {
  const graphData: { nodes: ExtendedNode[]; edges: IUserEdge[] } = {
    nodes: [],
    edges: [],
  };
  // populate nodes and edges
  data.forEach((row: unknown) => {
    config.datasets[0].nodes.forEach((nodeConfig) => {
      addNodeToG6Graph(graphData, row, nodeConfig);
    });

    config.datasets[0].edges.forEach((edgeConfig) => {
      addEdgesToG6Graph(graphData, row, edgeConfig);
    });
  });

  setSizeBasedOnDegrees(graphData);

  // method to calculate graphData degrees and color
  // calculateDegreesAndColor(graphData)

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
  return graphData;
};

const lightColors = [
  "#8FE9FF",
  "#87EAEF",
  "#FFC9E3",
  "#A7C2FF",
  "#FFA1E3",
  "#FFE269",
  "#BFCFEE",
  "#FFA0C5",
  "#D5FF86",
];

const darkColors = [
  "#7DA8FF",
  "#44E6C1",
  "#FF68A7",
  "#7F86FF",
  "#AE6CFF",
  "#FF5A34",
  "#5D7092",
  "#FF6565",
  "#6BFFDE",
];

const BLUE_PALLETS = [
  "#e8f6ff",
  "#d5efff",
  "#b3dfff",
  "#86c6ff",
  "#56a0ff",
  "#3078ff",
  "#0d4dff",
  "#0342ff",
  "#0636bc",
  "#10399f",
  "#0a205c",
];

const getRandomColor = (): string => {
  const combinedColors = [...BLUE_PALLETS];
  const randomIndex = Math.floor(Math.random() * combinedColors.length);
  return combinedColors[randomIndex];
};

// create a method to return a GraphinData object from a G6Graph object
// export function convertG6ToGraphinData(g6Graph: G6Graph): GraphinData {
//     const nodes: Array<IUserNode> = g6Graph.getNodes().map((node: INode) => {
//         const model = node.getModel()
//         return {
//             id: node.getID(),
//             data: model.data,
//             x: model.x,
//             y: model.y,
//         }
//     })

//     const edges: Array<IUserEdge> = g6Graph.getEdges().map((edge: IEdge) => {
//         return {
//             source: edge.getSource().getID(),
//             target: edge.getTarget().getID(),
//         }
//     })

//     return { nodes, edges }
// }

// create a type that extends IUserNode and includes other properties
// the other properties will be a key value pair of the data from the original data set
export type ExtendedNode = IUserNode & {
  _metadata: {
    _data?: Record<string, unknown>;
    _type?: string;
    _title?: string;
    _subtitle?: string;
    _body?: string;
  };
};

export const addNodeToG6Graph = (
  graphData: { nodes: ExtendedNode[]; edges: IUserEdge[] },
  row: any,
  nodeConfig: NodeConfig
): void => {
  const record = row as Record<string, string>;

  if (!record[nodeConfig.idAttr as string]) {
    throw new Error("Unable to find property with id attribute given.");
  }

  const nodeExists = graphData.nodes.some(
    (node) => node.id === record[nodeConfig.idAttr as string]
  );

  if (!nodeExists) {
    const node: ExtendedNode = {
      id: record[nodeConfig.idAttr as string],
      ...(nodeConfig.tagAttr && { tag: row[nodeConfig.tagAttr] }),
      ...(nodeConfig.clusterLabel && {
        clusterLabel: nodeConfig.clusterLabel,
      }),
      ...(nodeConfig.labelAttr && {
        label: {
          value: row[nodeConfig.labelAttr],
        },
      }),
      style: {
        ...(nodeConfig.labelAttr && {
          label: {
            value: row[nodeConfig.labelAttr],
          },
        }),
        ...(nodeConfig.tagAttr && { tag: row[nodeConfig.tagAttr] }),
        ...(nodeConfig.clusterLabel && {
          clusterLabel: nodeConfig.clusterLabel,
          // badges: [
          //     {
          //         position: "RT",
          //         type: "text",
          //         value: nodeConfig.clusterLabel,
          //         size: [15, 15],
          //         fill: "red",
          //         color: "#fff",
          //     },
          // ],
        }),
      },

      // _metadata values used throughout the app
      _metadata: {
        _data: row,
        // _type
        ...(nodeConfig.clusterLabel && {
          _type: nodeConfig.clusterLabel,
        }),

        // _title
        ...(nodeConfig.labelAttr && {
          _title: row[nodeConfig.labelAttr],
        }),

        // _title
        ...(nodeConfig.labelAttr && {
          _body: row[nodeConfig.labelAttr],
        }),

        // _subtitle
        ...(nodeConfig.tagAttr && { _subtitle: row[nodeConfig.tagAttr] }),
      },
    };
    // console.log("node", node);
    graphData.nodes.push(node);
  }
};

export const addEdgesToG6Graph = (
  graphData: { nodes: any[]; edges: any[] },
  row: unknown,
  edgeConfig: EdgeConfig
): void => {
  const record = row as Record<string, unknown>;

  if (!record[edgeConfig.sourceNodeId] || !record[edgeConfig.targetNodeId]) {
    throw new Error("Required edge params missing.");
  }

  const edgeExists = graphData.edges.some(
    (edge) =>
      edge.source === record[edgeConfig.sourceNodeId] &&
      edge.target === record[edgeConfig.targetNodeId]
  );

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
    });
  }
};
