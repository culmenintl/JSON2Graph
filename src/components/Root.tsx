import { FC, createRef, useEffect, useRef, useState } from "react"
import Graphin, {
    Behaviors,
    GraphinData,
    IUserEdge,
    IUserNode,
    Utils,
} from "@antv/graphin"

// graphin CSS
import "@antv/graphin/dist/index.css" // Don't forget to import CSS
import "@antv/graphin-icons/dist/index.css"

const { DragCanvas, ZoomCanvas, DragNode, ActivateRelations, DragCombo } =
    Behaviors
import LoadingLogo from "./LoadingLogo"

import { DevPanel } from "./DevPanel"
import StatusDisplay from "./StatusDisplay"
import { ToggleDev } from "./ToggleDev"

import { ToggleSimulation } from "./ToggleSimulate"
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline"
// notistack
import { useSnackbar } from "notistack"
// import { convertG6ToGraphinData } from "../lib/Utils"
import { LayoutSelector, Toolbar } from "@antv/graphin-components"
import React from "react"
import LayoutToolbar from "./LayoutToolbar"
import { Theme, useTheme } from "react-daisyui"
import { WrenchScrewdriverIcon } from "@heroicons/react/24/outline"
import { FunnelIcon } from "@heroicons/react/24/outline"
import DeveloperPanel from "./DeveloperPanel"
import { GraphNavbar } from "./navigation/GraphNavbar"
import { store, actions, useTrackedStore, useStore } from "../stores/Store"
import { NodeToolTip } from "./NodeToolTip"

const Root: FC<{}> = () => {
    //
    const { theme, setTheme } = useTheme(useTrackedStore().pref.theme())

    // notistack
    const { enqueueSnackbar, closeSnackbar } = useSnackbar()

    // graph ref to be used later
    const graphinRef = useRef<Graphin>(null)

    const graphGraphinData = useTrackedStore().data.graphinData()
    const initialLayout = useTrackedStore().graph.selectedLayout()
    const themeMode = useTrackedStore().app.colors().colorScheme

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

    if (!graphGraphinData) return <LoadingLogo />

    return (
        <div className="absolute inset-0">
            <Graphin
                data={graphGraphinData}
                ref={graphinRef}
                layout={initialLayout}
                fitCenter={true}
                fitView={true}
                groupByTypes={false}
                dragCombo={true}
                theme={{
                    mode: themeMode,
                }}
                defaultCombo={{
                    type: "circle",
                }}
                animate={true}
            >
                <Theme dataTheme={theme}>
                    <NodeToolTip />
                    <ActivateRelations trigger="click" />
                    <DragCanvas enableOptimize />
                    <DragCombo />
                    <ZoomCanvas enableOptimize sensitivity={1} />
                    <div className="absolute bottom-0 w-full pb-5">
                        <GraphNavbar />
                    </div>
                    <DeveloperPanel />
                </Theme>
            </Graphin>
        </div>
    )
}

export default Root
