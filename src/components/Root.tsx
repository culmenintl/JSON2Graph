import { FC, useEffect, useRef, useState } from "react"
import Graphin, { Behaviors } from "@antv/graphin"

// graphin CSS
import "@antv/graphin/dist/index.css" // Don't forget to import CSS
import "@antv/graphin-icons/dist/index.css"

// graphin components used
const { DragCanvas, ZoomCanvas, ActivateRelations, DragCombo, DragNode } =
    Behaviors

import { useSnackbar } from "notistack"
import { GraphNavbar } from "./navigation/GraphNavbar"
import { actions, useTrackedStore } from "../stores/Store"
import { NodeToolTip } from "./NodeToolTip"
import { LoadingLogo } from "./LoadingLogo"
import autoAnimate from "@formkit/auto-animate"

export const Root: FC<{}> = () => {
    const userTheme = useTrackedStore().pref.theme()
    const parent = useRef(null)
    useEffect(() => {
        parent.current && autoAnimate(parent.current)
    }, [parent])

    const [ready, setReady] = useState(false)

    // notistack
    const { enqueueSnackbar } = useSnackbar()

    // graph ref to be used later
    const graphinRef = useRef<Graphin>(null)

    const graphGraphinData = useTrackedStore().data.graphinData()
    const initialLayout = useTrackedStore().graph.selectedLayout()
    const graphReady = useTrackedStore().graph.graphReady()

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
    // side effect to get graphin instance async
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

    useEffect(() => {
        if (graphReady && graphGraphinData && graphinRef.current) {
            // set timeout to allow graph to render
            setTimeout(() => {
                setReady(true)
            }, 3000)
        }
    }, [graphReady, graphGraphinData, graphinRef.current])

    // if not ready, show loading logo

    return (
        <div ref={parent} className="absolute inset-0">
            {!ready && <LoadingLogo />}
            {graphGraphinData && (
                <Graphin
                    data={graphGraphinData}
                    ref={graphinRef}
                    layout={initialLayout}
                    groupByTypes={true}
                    dragCombo={true}
                    theme={{
                        mode: userTheme === "dark" ? "dark" : "light",
                    }}
                    defaultCombo={{
                        type: "circle",
                    }}
                    animate={true}
                    fitView={true}
                >
                    <DragNode />
                    {/* Handles the on hover node tooltips */}
                    <NodeToolTip />
                    {/* Activates the closest relationships */}
                    <ActivateRelations trigger="click" />

                    <DragCanvas enableOptimize />
                    <DragCombo />
                    <ZoomCanvas enableOptimize sensitivity={1} />
                </Graphin>
            )}
            <div className="absolute bottom-0 w-full pb-5">
                <GraphNavbar />
            </div>
        </div>
    )
}
