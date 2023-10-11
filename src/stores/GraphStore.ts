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
    filteringLimit: number
}

const initialState: State = {
    layouts: Object.values(LayoutsMap),
    layoutState: undefined,
    graphReady: false,
    selectedLayout: LayoutsMap[Layouts.gForce],

    clusteringEnabled: false,
    clusteringLimit: 0,

    filteringLimit: 0,
}

export const GraphStore = createStore("Graph")(
    { ...initialState },
    {
        devtools: { enabled: true },
    },
).extendActions((set, get, api) => ({
    filterGraphByDegree: () => {
        const degree = get.filteringLimit()
        const graph = GraphinRefStore.get.graphRef()
        if (graph) {
            filterGraphByDegree(graph, degree)
        }
    },
}))

export const filterGraphByDegree = (
    inputGraph: Graph,
    minimumDegree: number,
): void => {
    // console.log("filterGraphByDegree", minimumDegree)
    const graphData: GraphData = inputGraph.save() as GraphData

    inputGraph.getCombos().forEach((combo) => {
        // console.log("uncombo", combo.getID())
        inputGraph.uncombo(combo.getID())
    })

    resetVisibility(inputGraph)

    if (!graphData) {
        // console.log("returning because graphData is null")
        return
    }

    inputGraph.getNodes().forEach((node) => {
        const degree = inputGraph.getNodeDegree(node.getID(), "in") as number
        // console.log("degree", degree, node.getID())
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
    inputGraph.changeData(inputGraph.save() as GraphData)
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
