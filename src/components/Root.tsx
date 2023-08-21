import { FC, createRef, useEffect, useRef, useState } from "react"
import Graphin, {
    Behaviors,
    GraphinData,
    IUserEdge,
    IUserNode,
    Utils,
} from "@antv/graphin"
import "@antv/graphin/dist/index.css" // Don't forget to import CSS

import CentrifugeText from "/images/centrifuge-text.svg"

const { DragCanvas, ZoomCanvas, DragNode, ActivateRelations, Hoverable } =
    Behaviors

import { FiltersState, RedditNode } from "../lib/types"
import GraphDataController from "./GraphDataController"

import LoadingLogo from "./LoadingLogo"

import { DevPanel } from "./DevPanel"
import StatusDisplay from "./StatusDisplay"
import { ToggleDev } from "./ToggleDev"

import { STATUS } from "../stores/AppStore"
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
import { GraphNavbar } from "./GraphNavbar"
import { store, actions, useTrackedStore, useStore } from "../stores/Store"
import { NodeToolTip } from "./NodeToolTip"

const Root: FC<{}> = () => {
    const [layout, setLayout] = React.useState({ name: "force", options: {} })
    const { theme, setTheme } = useTheme(useTrackedStore().app.theme())

    // useEffect(() => {
    //     parent.current && autoAnimate(parent.current)
    // }, [parent])

    // notistack
    const { enqueueSnackbar, closeSnackbar } = useSnackbar()

    const [hoveredNode, setHoveredNode] = useState<string | null>(null)

    // zustand

    // Load data on mount:
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

    const graphinRef = useRef<Graphin>(null)

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

    useEffect(() => {
        const getRef = async () => {
            const graphinInstance = await getGraphinRef()
            if (graphinInstance) {
                const { graph, apis } = graphinInstance
                // setGraph(graph)
                console.log("ref", graphinRef, graph, apis)
                console.log("graphinInstance", graph.getNodes())
                actions.graph.graphRef(graph)
            }
        }
        getRef()
    }, [])

    const graphGraphinData = useTrackedStore().data.graphinData()
    const initialLayout = useTrackedStore().graph.selectedLayout()
    const themeMode = useTrackedStore().app.colors().colorScheme

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
                theme={{
                    mode: themeMode,
                }}
                defaultCombo={{
                    type: "circle",
                }}
            >
                <Theme dataTheme={theme}>
                    <NodeToolTip />
                    <ActivateRelations trigger="click" />
                    <DragCanvas enableOptimize />
                    <ZoomCanvas enableOptimize sensitivity={1} />
                    {/* <Hoverable bindType="node" /> */}
                    <Toolbar
                        direction="horizontal"
                        style={{ position: "absolute", right: "250px" }}
                    >
                        {/* <LayoutToolbar /> */}
                    </Toolbar>
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
