import { LayoutConfig } from "@antv/g6"
import { createStore } from "@udecode/zustood"

export enum LayoutTypes {
    static = "static",
    dynamic = "dynamic",
    animated = "animated",
    gpuEnabled = "gpuEnabled",
    workerEnabled = "workerEnabled",
    combo = "combo",
}

export enum Layouts {
    GraphinForce = "graphin-force",
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

const LayoutsMap: { [key: string]: LayoutConfig } = {
    [Layouts.GraphinForce]: {
        type: "graphin-force",
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
    [Layouts.force2]: {
        type: "force2",
        preset: {
            type: "random",
        },
        gpuEnabled: false,
        workerEnabled: true,
        // workerScriptURL: "",
        onTick: () => {},
        onLayoutEnd: () => {
            console.log("force2 layout end")
        },
        animate: true,
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
        preset: {
            type: "force",
            preventOverlap: true,
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
        preset: {
            type: "gForce",
            maxIteration: 1000,
            gravity: 10,
            clustering: true,
            clusterGravity: 10,
            speed: 5,
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
            console.log("gForce layout end")
        },
        animate: true,
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
        gpuEnabled: false,
        workerEnabled: false,
        workerScriptURL: "",
        onTick: () => {},
        onLayoutEnd: () => {
            console.log("forceAtlas2 layout end")
        },
        animate: true,
    },
    [Layouts.comboForce]: {
        type: "comboForce",
        preset: {
            type: "comboForce",
            preventOverlap: true,
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
            console.log("comboForce layout end")
        },
        animate: true,
    },
    [Layouts.comboCombined]: {
        type: "comboCombined",
        preset: {
            type: "comboCombined",
            preventOverlap: true,
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
            console.log("comboCombined layout end")
        },
        animate: true,
    },
}

interface State {
    layouts: LayoutConfig[]
    selectedLayout: LayoutConfig | undefined
    comboEnabled: boolean
    graphRef: any
}

const initialState: State = {
    layouts: Object.values(LayoutsMap),
    selectedLayout: LayoutsMap[Layouts.force2],
    comboEnabled: false,
    graphRef: undefined,
}

interface GraphLayoutCfg extends LayoutConfig {
    type?: string
    gpuEnabled?: boolean
    workerEnabled?: boolean
    workerScriptURL?: string
    onTick?: () => void
    onLayoutEnd?: () => void
    animate?: boolean
}

export const GraphStore = createStore("Graph")(
    { ...initialState },
    {
        devtools: { enabled: true },
    },
)
