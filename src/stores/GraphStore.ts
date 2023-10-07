import G6, { Graph, GraphData, LayoutConfig } from "@antv/g6"
import { createStore } from "@udecode/zustood"
import { GraphinRefStore } from "./GraphinRefStore"

export enum LayoutTypes {
    static = "static",
    dynamic = "dynamic",
    animated = "animated",
    gpuEnabled = "gpuEnabled",
    workerEnabled = "workerEnabled",
    combo = "combo",
}

export enum Layouts {
    graphinForce = "graphin-force",
    force2 = "force2",
    random = "random",
    concentric = "concentric",
    circular = "circular",
    grid = "grid",
    radial = "radial",
    radialout = "radialout",
    dagre = "dagre",
    force = "force",
    fruchterman = "fruchterman",
    gForce = "gForce",
    mds = "mds",
    forceAtlas2 = "forceAtlas2",
    comboForce = "comboForce",
    comboCombined = "comboCombined",
}

const maxIteration = 500

export const LayoutsMap: { [key: string]: LayoutConfig } = {
    // [Layouts.graphinForce]: BaseLayoutConfig = {
    //     type: "graphin-force",
    //     // gpuEnabled: false,
    //     // workerScriptURL: "",
    //     onTick: () => {},
    //     onLayoutEnd: () => {},
    //     animate: true,
    // },
    [Layouts.force2]: {
        type: "force2",
        gpuEnabled: false,
        _meta: {
            title: "Force 2",
            subtitle: "Space filling layout, good for large graphs.",
            tags: ["force", "force2", "large graph"],
        },
        // gpuEnabled: false,
        // ,
        // workerScriptURL: "",
        onTick: () => {},
        onLayoutEnd: () => {
            console.log("force2 layout end")
        },
        animate: true,
        preventOverlap: true,
    },
    [Layouts.random]: {
        type: "random",
        preset: {
            type: "random",
        },
        gpuEnabled: false,
        workerEnabled: false,
        workerScriptURL: "",
        onTick: () => {},
        onLayoutEnd: () => {},
        animate: true,
    },
    [Layouts.concentric]: {
        type: "concentric",
        preset: {
            type: "concentric",
        },
        gpuEnabled: false,
        workerEnabled: false,
        workerScriptURL: "",
        onTick: () => {},
        onLayoutEnd: () => {},
        animate: true,
    },
    [Layouts.circular]: {
        type: "circular",
        preset: {
            type: "circular",
        },
        gpuEnabled: false,
        workerEnabled: false,
        workerScriptURL: "",
        onTick: () => {},
        onLayoutEnd: () => {},
        animate: true,
    },
    [Layouts.grid]: {
        type: "grid",
        preset: {
            type: "grid",
        },
        gpuEnabled: false,
        workerEnabled: false,
        workerScriptURL: "",
        onTick: () => {},
        onLayoutEnd: () => {},
        animate: true,
    },
    [Layouts.radial]: {
        type: "radial",
        preset: {
            type: "radial",
        },
        gpuEnabled: false,
        workerEnabled: false,
        workerScriptURL: "",
        onTick: () => {},
        onLayoutEnd: () => {},
        animate: true,
    },
    [Layouts.radialout]: {
        type: "radialout",
        preset: {
            type: "radialout",
        },
        gpuEnabled: false,
        workerEnabled: false,
        workerScriptURL: "",
        onTick: () => {},
        onLayoutEnd: () => {},
        animate: true,
    },

    [Layouts.dagre]: {
        type: "dagre",
        preset: {
            type: "dagre",
            rankdir: "LR",
            align: "DL",
            nodesep: 20,
            ranksep: 50,
        },
        gpuEnabled: false,
        workerEnabled: false,
        workerScriptURL: "",
        onTick: () => {},
        onLayoutEnd: () => {},
        animate: false,
    },
    [Layouts.force]: {
        type: "force",
        gpuEnabled: false,
        workerEnabled: false,
        // workerScriptURL: "",
        onTick: () => {},
        onLayoutEnd: () => {
            console.log("force layout end")
        },
        animate: true,
    },
    [Layouts.fruchterman]: {
        type: "fruchterman",
        preset: {
            type: "fruchterman",
            gravity: 10,
            speed: 5,
            clustering: true,
            clusterGravity: 10,
            maxIteration: 1000,
        },
        gpuEnabled: false,
        workerEnabled: false,
        workerScriptURL: "",
        onTick: () => {},
        onLayoutEnd: () => {
            console.log("fruchterman layout end")
        },
        animate: true,
    },
    [Layouts.gForce]: {
        type: "gForce",
        gpuEnabled: true,
        workerEnabled: false,
        onTick: () => {},
        onLayoutEnd: () => {
            console.log("gForce layout end")
        },
        animate: true,
        preventOverlap: true,
        maxIteration: 2000,
    },
    [Layouts.mds]: {
        type: "mds",
        preset: {
            type: "mds",

            maxIteration: 1000,
            linkDistance: 100,
            nodeStrength: -30,
            edgeStrength: 0.1,
            nodeSize: 30,
            nodeSpacing: 5,
            nodePadding: 5,
            nodeDraggable: true,
            nodeMovable: true,
            edgeMovable: true,
            edgeDraggable: true,
        },
        gpuEnabled: false,
        workerEnabled: false,
        workerScriptURL: "",
        onTick: () => {},
        onLayoutEnd: () => {
            console.log("mds layout end")
        },
        animate: true,
    },
    [Layouts.forceAtlas2]: {
        type: "forceAtlas2",
        preset: {
            type: "forceAtlas2",
            maxIteration: 1000,
            gravity: 10,
            speed: 5,
            clustering: true,
            clusterGravity: 10,
        },
        gpuEnabled: true,
        workerEnabled: true,
        // workerScriptURL: "",
        onTick: () => {},
        onLayoutEnd: () => {
            console.log("forceAtlas2 layout end")
        },
        animate: true,
    },
    [Layouts.comboForce]: {
        type: "comboForce",
        linkDistance: 50, // Edge length
        nodeStrength: 30,
        edgeStrength: 0.1,
        preventOverlap: true,
        maxIteration: 2000,
        // preset: {
        // type: "comboForce",
        // linkDistance: 100,
        // nodeStrength: -30,
        // edgeStrength: 0.1,

        // nodeSize: 30,
        // nodeSpacing: 5,
        // nodePadding: 5,

        // nodeDraggable: true,
        // nodeMovable: true,
        // edgeMovable: true,
        // edgeDraggable: true,
        // },
        gpuEnabled: false,
        workerEnabled: false,
        workerScriptURL: "",
        outerLayout: new G6.Layout["forceAtlas2"]({
            maxIteration: 1000,
            gravity: 10,
            speed: 5,
            clustering: true,
            clusterGravity: 10,
            kr: 10,
        }),
        onTick: () => {},
        onLayoutEnd: () => {
            console.log("comboForce layout end")
        },
        animate: true,
    },
    [Layouts.comboCombined]: {
        type: "comboCombined",
        // preset: {
        //     type: "comboCombined",
        maxIteration: 2000,
        preventOverlap: true,
        spacing: 50,
        innerLayout: new G6.Layout["forceAtlas2"]({
            kr: 10,
            onTick: () => {},
            onLayoutEnd: () => {
                console.log("comboCombined inner layout end")
            },
        }),

        // linkDistance: 100,
        // nodeStrength: -30,
        // edgeStrength: 0.1,

        // nodeSize: 30,
        // nodeSpacing: 5,
        // nodePadding: 5,

        // nodeDraggable: true,
        // nodeMovable: true,
        // edgeMovable: true,
        // edgeDraggable: true,
        // },

        gpuEnabled: false,
        workerEnabled: false,
        // workerScriptURL: "",
        onTick: () => {},
        onLayoutEnd: () => {
            console.log("comboCombined layout end")
        },
        animate: true,
    },
}

interface State {
    layouts: LayoutConfig[]
    selectedLayout: LayoutConfig | undefined

    // clustering / combos
    clusteringEnabled: boolean
    clusteringLimit: number

    // filtering / sampling
    filterGraphByDegree: boolean
    filteringLimit: number
}

const initialState: State = {
    layouts: Object.values(LayoutsMap),
    selectedLayout: LayoutsMap[Layouts.gForce],

    clusteringEnabled: false,
    clusteringLimit: 5,

    filterGraphByDegree: true,
    filteringLimit: 2,
}

export const GraphStore = createStore("Graph")(
    { ...initialState },
    {
        devtools: { enabled: true },
    },
).extendActions((set, get, api) => ({
    filterGraphByDegree: (minimumDegree: number) => {
        const graph = GraphinRefStore.get.graphRef()
        console.log("graph", graph)
        if (graph) {
            filterGraphByDegree(graph, minimumDegree)
        }
    },
}))

export const filterGraphByDegree = (
    inputGraph: Graph,
    minimumDegree: number,
): void => {
    console.log("filterGraphByDegree", minimumDegree)
    const graphData: GraphData = inputGraph.save() as GraphData

    inputGraph.getCombos().forEach((combo) => {
        console.log("uncombo", combo.getID())
        inputGraph.uncombo(combo.getID())
    })

    resetVisibility(inputGraph)

    if (!graphData) {
        console.log("returning because graphData is null")
        return
    }

    inputGraph.getNodes().forEach((node) => {
        const degree = inputGraph.getNodeDegree(node.getID(), "total") as number
        console.log("degree", degree, node.getID())
        if (degree < minimumDegree) {
            inputGraph.updateItem(node.getID(), {
                visible: false,
            })
            inputGraph.getEdges().forEach((edge) => {
                if (
                    edge.getSource().getID() === node.getID() ||
                    edge.getTarget().getID() === node.getID()
                ) {
                    inputGraph.updateItem(edge.getID(), {
                        visible: false,
                    })
                }
            })
        }
    })
}

export const resetVisibility = (inputGraph: Graph): void => {
    inputGraph.getNodes().forEach((node) => {
        inputGraph.updateItem(node.getID(), {
            visible: true,
        })
    })
    inputGraph.getEdges().forEach((edge) => {
        inputGraph.updateItem(edge.getID(), {
            visible: true,
        })
    })
}
