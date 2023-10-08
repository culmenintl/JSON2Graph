import { Graph, GraphData, LayoutConfig } from "@antv/g6"
import { createStore } from "@udecode/zustood"
import { GraphinRefStore } from "./GraphinRefStore"
import { Layouts, LayoutsMap } from "./Layouts"

interface State {
    layouts: LayoutConfig[]
    layoutState: "Simulating" | "Done" | "error" | undefined
    graphReady: boolean
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
    layoutState: undefined,
    graphReady: false,
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
