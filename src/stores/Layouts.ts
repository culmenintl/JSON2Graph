import G6, { LayoutConfig } from "@antv/g6"
import { actions } from "./Store"
import { ExtendedLayoutConfig } from "../lib/AppTypes"

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

export class BaseLayoutConfig implements LayoutConfig {
    // base layout config
    [key: string]: unknown
    type?: string | undefined
    gpuEnabled?: boolean | undefined
    workerEnabled?: boolean | undefined
    workerScriptURL?: string | undefined
    onLayoutEnd?: (() => void) | undefined

    animate = true

    // custom layout config
    title?: string
    subtitle?: string
    tags?: string[]

    constructor() {
        this.type = "force"
        this.gpuEnabled = false
        this.workerEnabled = false
        this.workerScriptURL = ""

        this.onLayoutEnd = () => {
            actions.graph.layoutState("Done")
            actions.graph.graphReady(true)
        }
    }
}

export const LayoutsMap: { [key: string]: ExtendedLayoutConfig } = {
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
            description: "Space filling layout, good for large graphs",
            tags: ["Space Out", "Large Graph", "Animated"],
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
        _meta: {
            title: "Random",
            description: "Randomly places nodes",
            tags: ["Preset", "Large Graph"],
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
        _meta: {
            title: "Concentric",
            description: "Concentric node placement",
            tags: ["Preset", "Small Graph"],
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
        _meta: {
            title: "Circular",
            description: "Circular node placement",
            tags: ["Preset", "Small Graph"],
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
        _meta: {
            title: "Grid",
            description: "Grid node placement",
            tags: ["Preset", "Small Graph"],
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
        _meta: {
            title: "Radial",
            description: "Radial node placement",
            tags: ["Preset", "Small Graph"],
        },
        gpuEnabled: false,
        workerEnabled: false,
        workerScriptURL: "",
        onTick: () => {},
        onLayoutEnd: () => {},
        animate: true,
    },
    // [Layouts.radialout]: {
    //     type: "radialout",
    //     preset: {
    //         type: "radialout",
    //     },
    //     gpuEnabled: false,
    //     workerEnabled: false,
    //     workerScriptURL: "",
    //     onTick: () => {},
    //     onLayoutEnd: () => {},
    //     animate: true,
    // },

    [Layouts.dagre]: {
        type: "dagre",
        preset: {
            type: "dagre",
            rankdir: "LR",
            align: "DL",
        },
        _meta: {
            title: "Dagre",
            description: "Heirarchical node placement",
            tags: ["Preset", "Small Graph"],
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
        _meta: {
            title: "Force",
            description: "Classic force-directed layout",
            tags: ["Preset", "Classic"],
        },
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
        _meta: {
            title: "Fruchterman",
            description: "Different force-directed layout",
            tags: ["Large Graph"],
        },
        gravity: 10,
        speed: 5,
        clustering: true,
        clusterGravity: 10,
        maxIteration: 1000,
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
        _meta: {
            title: "GForce",
            description: "GPU enabled force-directed layout",
            tags: ["GPU", "Large Graph", "Fast"],
        },
        onTick: () => {},
        onLayoutEnd: () => {
            console.log("gForce layout end")
            actions.graph.layoutState("Done")
            actions.graph.graphReady(true)
        },
        animate: true,
        preventOverlap: true,
        maxIteration: 2000,
    },
    [Layouts.mds]: {
        type: "mds",
        _meta: {
            title: "MDS",
            description: "Multidemensional scaling layout",
            tags: ["Large Graph", "Fast"],
        },
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
        _meta: {
            title: "ForceAtlas2",
            description: "Force directed, converges quickly",
            tags: ["GPU", "Large Graph", "Fast"],
        },
        maxIteration: 1000,
        gravity: 10,
        speed: 5,
        clustering: true,
        clusterGravity: 10,
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
        _meta: {
            title: "ClusterForce",
            description: "Used for clustering.",
            tags: ["Clustering"],
        },
        linkDistance: 50,
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
        _meta: {
            title: "ClusterCombined",
            description: "Main layout for clustering.",
            tags: ["Clustering", "Large Graph"],
        },
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
