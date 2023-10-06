import { FC, useEffect, useRef } from "react"
import Graphin, { Behaviors } from "@antv/graphin"

// graphin CSS
import "@antv/graphin/dist/index.css" // Don't forget to import CSS
import "@antv/graphin-icons/dist/index.css"

// graphin components used
const { DragCanvas, ZoomCanvas, DragNode, ActivateRelations, DragCombo } =
    Behaviors

import { useSnackbar } from "notistack"
import { DeveloperPanel } from "./DeveloperPanel"
import { GraphNavbar } from "./navigation/GraphNavbar"
import { actions, useTrackedStore } from "../stores/Store"
import { NodeToolTip } from "./NodeToolTip"
import { LoadingLogo } from "./LoadingLogo"

export const Root: FC<{}> = () => {
    const userTheme = useTrackedStore().pref.theme()

    // notistack
    const { enqueueSnackbar } = useSnackbar()

    // graph ref to be used later
    const graphinRef = useRef<Graphin>(null)

    const graphGraphinData = useTrackedStore().data.graphinData()
    const initialLayout = useTrackedStore().graph.selectedLayout()

    // Load data on mount asynchronously
    useEffect(() => {
        const asyncFetch = async () => {
            try {
                await actions.data.fetchData()
            } catch (e: unknown) {
                if (e instanceof Error) {
                    enqueueSnackbar(e.message, {
                        variant: "error",
                        persist: true,
                    })
                }
            }
        }

        asyncFetch()
    }, [])

    // async get graphin instance
    const getGraphinRef = () => {
        return new Promise<Graphin | null>((resolve) => {
            const interval = setInterval(() => {
                const graphinInstance = graphinRef.current
                if (graphinInstance) {
                    clearInterval(interval)
                    resolve(graphinInstance)
                }
            }, 100)
        })
    }
    // side effect to get graphin instance once it's ready
    useEffect(() => {
        const getRef = async () => {
            const graphinInstance = await getGraphinRef()
            if (graphinInstance) {
                const { graph, apis } = graphinInstance
                // setGraph(graph)
                // console.log("ref", graphinRef, graph, apis)
                // console.log("graphinInstance", graph.getNodes())
                actions.graphinRef.graphRef(graph)
                actions.graphinRef.graphinApis(apis)
            }
        }
        getRef()
    }, [graphGraphinData])

    // side effect to set graphin data once it's ready
    // if not ready, show loading logo
    if (!graphGraphinData) return <LoadingLogo />

    return (
        <div className="absolute inset-0">
            {userTheme && (
                <Graphin
                    data={graphGraphinData}
                    ref={graphinRef}
                    layout={initialLayout}
                    fitCenter={true}
                    fitView={true}
                    groupByTypes={false}
                    dragCombo={true}
                    theme={{
                        mode: userTheme === "dark" ? "dark" : "light",
                    }}
                    defaultCombo={{
                        type: "circle",
                    }}
                    animate={true}
                >
                    {/* Handles the on hover node tooltips */}
                    <NodeToolTip />
                    {/* Activates the closest relationships */}
                    <ActivateRelations trigger="click" />

                    <DragCanvas enableOptimize />
                    <DragCombo />
                    <ZoomCanvas enableOptimize sensitivity={1} />
                    <div className="absolute bottom-0 w-full pb-5">
                        <GraphNavbar />
                    </div>
                    <DeveloperPanel />
                </Graphin>
            )}
        </div>
    )
}
