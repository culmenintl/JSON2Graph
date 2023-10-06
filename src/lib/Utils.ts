import IconLoader from "@antv/graphin-icons"
import Graphin from "@antv/graphin"
// Icons from Graphin
const icons = Graphin.registerFontFamily(IconLoader)

import { ComboConfig, EdgeConfig, GraphData } from "@antv/g6"
import { IUserEdge, IUserNode } from "@antv/graphin"
import { store } from "../stores/Store"
import {
    CONTENT_COLORS,
    DataToGraphConfig,
    ExtendedNode,
    NODE_COLORS,
    ThemeColors,
    _EdgeConfig,
    _GraphData,
    _NodeConfig,
} from "./AppTypes"

export const setNodeIcon = (node: IUserNode, nodeConfig: _NodeConfig) => {
    if (!nodeConfig.icon || !node.style) {
        return
    }
    node.style.icon = {
        type: "font",
        fontFamily: "graphin",
        value: icons[nodeConfig.icon as keyof typeof icons],
        fill: getColorFromNodeConfig(nodeConfig, true),
    }
}

export const getColorFromNodeConfig = (
    nodeConfig: _NodeConfig,
    content = false,
) => {
    // find index of the nodeConfig in the list of nodeConfigs
    const index = store.data.dataSet().nodes?.indexOf(nodeConfig)

    // get the color palette
    const themeColors = store.app.colors()

    const source = content ? CONTENT_COLORS : NODE_COLORS

    // get the color from the palette for the nodeConfig index
    const value =
        index !== undefined ? Object.values(source)[index as number] : undefined

    // return the color
    return value !== undefined
        ? themeColors[value as keyof ThemeColors]
        : undefined
}

export const setNodeColor = (node: IUserNode, nodeConfig: _NodeConfig) => {
    if (!nodeConfig || !node.style) {
        return
    }

    node.style.keyshape = {
        ...node.style.keyshape,
        fill: nodeConfig.color
            ? nodeConfig.color
            : getColorFromNodeConfig(nodeConfig),
        fillOpacity: 0.8,
    }
}

function setSizeBasedOnDegrees(graphData: GraphData) {
    const maxDegree = Math.max(
        ...(graphData.nodes?.map((node) =>
            calculateDegree(graphData, node.id),
        ) || []),
    )

    const minSize = 10
    const maxSize = maxDegree * 10

    graphData.nodes?.forEach((node) => {
        // console.log(node.clusterLabel.length)
        const size =
            minSize +
            (maxSize - minSize) *
                (calculateDegree(graphData, node.id) / maxDegree)
        node.style = {
            ...node.style,
            keepVisualSize: true,
            keyshape: {
                ...node.style?.keyshape,
                size,
            },
            label: {
                // @ts-ignore
                value: truncateString(node?.label?.value ?? "", 10),
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
        }
        node.size = size
        // node.comboId = node.clusterLabel
    })
}

/**
 * @description Truncate a string to a given length
 * @author Logan Hendershot
 * @date 07/25/2023
 * @param {string} str
 * @param {number} maxLength
 * @returns {*}  {string}
 */
export const truncateString = (str: string, maxLength: number): string => {
    if (!str) return ""

    // if not a string, return the original value
    if (typeof str !== "string") {
        return str
    }

    if (str?.length <= maxLength) {
        return str
    }

    const truncatedString = str?.substring(0, maxLength)
    return `${truncatedString}...`
}

/**
 * @description Calculate the degree of a node in a graph given the graph data and the node id
 * @author Logan Hendershot
 * @date 07/25/2023
 * @param {{ nodes: IUserNode[]; edges: IUserEdge[] }} graphData
 * @param {string} nodeId
 * @returns {*}  {number}
 */
const calculateDegree = (graphData: GraphData, nodeId: string): number => {
    let degree = 0
    graphData.edges?.forEach((edge) => {
        if (edge.source === nodeId || edge.target === nodeId) {
            degree++
        }
    })
    return degree
}

export const populateGraphinData = (
    data: unknown[],
    config: DataToGraphConfig,
): _GraphData => {
    const graphData = {
        nodes: [] as ExtendedNode[],
        edges: [] as IUserEdge[],
        combos: [] as ComboConfig[],
    }

    // console.log("configs", config)

    // populate nodes and edges
    data.forEach((row: unknown) => {
        // console.log("row", row)
        // console.log("nodes", config.nodes)
        config.nodes?.forEach((nodeConfig) => {
            // console.log("nodeConfig", nodeConfig)
            addNodeToG6Graph(graphData, row, nodeConfig)
        })

        config.edges?.forEach((edgeConfig) => {
            // console.log("edgeConfig", edgeConfig)
            addEdgesToG6Graph(graphData, row, edgeConfig)
        })
    })

    setSizeBasedOnDegrees(graphData)

    // add combos if enabled
    if (store.graph.clusteringEnabled()) {
        setCombos(graphData)
    }

    // return graph
    return graphData
}

/**
 * @description Sets the combos for the graph based on the clustering limit and the number of nodes in each cluster
 * @author Logan Hendershot
 * @date 08/22/2023
 * @param {GraphData} graphData
 */
export const setCombos = (graphData: GraphData) => {
    const combos: ComboConfig[] = []
    // create a map to count the number of nodes in each cluster
    const comboCountMap: { [comboId: string]: number } = {}

    // get the clustering limit from state
    const clusterLimit = store.graph.clusteringLimit()

    // count and sort the number of nodes in each cluster
    graphData.nodes?.forEach((node) => {
        const comboId = node.comboId || ""
        if (!comboCountMap[comboId]) {
            comboCountMap[comboId] = 0
        }
        comboCountMap[comboId]++
    })

    const sortedComboIds = Object.keys(comboCountMap).sort(
        (a, b) => comboCountMap[b] - comboCountMap[a],
    )

    // create a combo for each cluster, up to the clustering limit
    // with a label and a color
    for (let i = 0; i < Math.min(sortedComboIds.length, clusterLimit); i++) {
        const comboId = sortedComboIds[i]
        combos.push({
            id: comboId,
            label: comboId,
            collapsed: false,
            labelCfg: {
                position: "top",
                refY: 10,
                style: {
                    fontSize: 35,
                },
            },
            style: {
                opacity: 0.4,
                fill: getRandomColor(),
            },
        })
    }

    graphData.combos = combos
}

const getRandomColor = (): string => {
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
    ]
    const combinedColors = [...BLUE_PALLETS]
    const randomIndex = Math.floor(Math.random() * combinedColors.length)
    return combinedColors[randomIndex]
}

// create a type that extends IUserNode and includes other properties
// the other properties will be a key value pair of the data from the original data set

export const addNodeToG6Graph = (
    graphData: _GraphData,
    row: any,
    nodeConfig: _NodeConfig,
): void => {
    const record = row as Record<string, string>

    if (!record[nodeConfig.id_data_property]) {
        // console.log("unable to add node", nodeConfig.id_data_property)
        return
        // throw new Error("Unable to find property with id attribute given.")
    }

    const nodeExists = graphData.nodes.some(
        (node) => node.id === record[nodeConfig.id_data_property as string],
    )

    // console.log("nodeExists", nodeExists)

    if (!nodeExists) {
        const node: ExtendedNode = {
            id: record[nodeConfig.id_data_property as string],
            ...(nodeConfig.content_data_property && {
                label: {
                    value: row[nodeConfig.content_data_property],
                },
            }),
            style: {
                ...(nodeConfig.content_data_property && {
                    label: {
                        value: row[nodeConfig.content_data_property],
                    },
                }),
                ...(nodeConfig.label && {
                    lavel: nodeConfig.clusterLabel,
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

            // comboId for cluster combo layout
            comboId: row.subreddit,

            // _metadata values used throughout the app
            _metadata: {
                _data: row,
                // _type
                ...(nodeConfig.label && {
                    _type: nodeConfig.label,
                }),

                // _title
                ...(nodeConfig.content_data_property && {
                    _title: row[nodeConfig.content_data_property],
                }),

                // _title
                ...(nodeConfig.content_data_property && {
                    _body: row[nodeConfig.content_data_property],
                }),

                // // _subtitle
                // ...(nodeConfig.tagAttr && {
                //     _subtitle: row[nodeConfig.tagAttr],
                // }),
                // _clusterLabel
                // _clusterId
                _clusterId: row.subreddit,
            },
        }
        setNodeIcon(node, nodeConfig)
        setNodeColor(node, nodeConfig)
        // console.log("node", node);
        graphData.nodes.push(node)
    }
}

export const addEdgesToG6Graph = (
    graphData: _GraphData,
    row: unknown,
    edgeConfig: _EdgeConfig,
): void => {
    const record = row as Record<string, unknown>

    if (
        !record[edgeConfig.source_node_id] ||
        !record[edgeConfig.target_node_id]
    ) {
        // console.log(
        //     "unable to add edge",
        //     edgeConfig.source_node_id,
        //     edgeConfig.target_node_id,
        // )
        return
        // throw new Error("Required edge params missing.")
    }

    const edgeExists = graphData.edges?.some(
        (edge) =>
            edge.source === (record[edgeConfig.source_node_id] as string) &&
            edge.target === (record[edgeConfig.target_node_id] as string),
    )

    if (!edgeExists) {
        graphData.edges?.push({
            id: `${record[edgeConfig.source_node_id]}-${
                record[edgeConfig.target_node_id]
            }`,
            source: record[edgeConfig.source_node_id] as string,
            target: record[edgeConfig.target_node_id] as string,
            label: edgeConfig.edgeLabel
                ? record[edgeConfig.edgeLabel as string]
                : undefined,
        })
    }
}

export const generateUniqueId = () => {
    const timestamp = Date.now().toString(36)
    const random = Math.random().toString(36).substr(2, 5)
    return `${timestamp}-${random}`
}

// method to strip out everything before the equals sign and the ]
export const stripAndCamelCase = (obj: { [index: string]: any }) => {
    return Object.entries(obj).reduce((result: any, [key, value]) => {
        let cleanedKey = key.replace(/^\[data-theme=(.+)\]$/, "$1") // Stripping out the non-useful bits of the keys
        // Manually transforming kebab-case to camelCase
        cleanedKey = cleanedKey.includes("-")
            ? cleanedKey
                  .toLowerCase()
                  .split("-")
                  .map((word, idx) =>
                      idx !== 0
                          ? word.charAt(0).toUpperCase() + word.slice(1)
                          : word,
                  )
                  .join("")
            : cleanedKey
        if (value && typeof value === "object") {
            result[cleanedKey] = stripAndCamelCase(value) // Recursion to handle nested objects
        } else {
            result[cleanedKey] = value
        }
        return result
    }, {})
}
