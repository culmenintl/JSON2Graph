import { FC, createRef, useEffect, useRef, useState } from "react"
import Graphin, {
    Behaviors,
    GraphinData,
    IUserEdge,
    IUserNode,
    Utils,
} from "@antv/graphin"
import "@antv/graphin/dist/index.css" // Don't forget to import CSS

const { DragCanvas, ZoomCanvas, DragNode, ActivateRelations, Hoverable } =
    Behaviors

import { FiltersState, RedditNode } from "../lib/types"
import GraphDataController from "./GraphDataController"

import LoadingLogo from "./LoadingLogo"

import { DevPanel } from "./DevPanel"
import StatusDisplay from "./StatusDisplay"
import { ToggleDev } from "./ToggleDev"

import { STATUS } from "../stores/_AppSlice"
import useStore from "../stores/_Store"
import Button from "./Button"
import { ToggleSimulation } from "./ToggleSimulate"
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline"
// notistack
import { useSnackbar } from "notistack"
import { convertG6ToGraphinData } from "../lib/Utils"
import { LayoutSelector, Toolbar } from "@antv/graphin-components"
import React from "react"
import LayoutToolbar from "./LayoutToolbar"

const Controls: FC<{}> = () => {
    return (
        <div
            className={`!left-0 !bottom-0 !mx-auto !flex max-h-[75vh] !w-full
                !justify-between !border-0 !border-gray-300 !bg-gray-300/20 !backdrop-blur-lg`}
        >
            <div className="mx-auto flex w-full !max-w-xl flex-col py-3">
                <div className="flex flex-row items-center justify-between gap-1 px-1 md:gap-2">
                    <ToggleDev />
                    <ToggleSimulation />
                    <StatusDisplay />
                    {/* <LayoutForceAtlas2Control
                        settings={dataStore.graph.layoutSettings}
                    /> */}
                    {/* <ZoomControl className="!flex !items-center !justify-center !border-b-0 !bg-transparent" /> */}
                    <div className="hidden md:flex">
                        {/* <SearchControl className="!border-b-2 !border-gray-300 !bg-transparent" /> */}
                    </div>

                    <Button
                        text="Centrifuge"
                        icon={
                            <ArrowTopRightOnSquareIcon
                                className="h-5 w-5 p-1"
                                aria-hidden="true"
                            />
                        }
                        onClick={() => alert("Opening Centrifuge")}
                    />
                </div>
            </div>
        </div>
    )
}

const Root: FC<{}> = () => {
    const [layout, setLayout] = React.useState({ name: "force", options: {} })

    // useEffect(() => {
    //     parent.current && autoAnimate(parent.current)
    // }, [parent])

    // notistack
    const { enqueueSnackbar, closeSnackbar } = useSnackbar()

    const [hoveredNode, setHoveredNode] = useState<string | null>(null)
    const dummyData = Utils.mock(10).circle().graphin()

    // zustand
    const {
        fetchData,
        settings,
        devMode,
        setStatus,
        dataSet,
        graph,
        graphinData,
    } = useStore((state) => ({
        fetchData: state.fetchData,
        settings: state.settings,
        devMode: state.devMode,
        setStatus: state.setStatus,
        dataSet: state.dataSet,
        graph: state.graph,
        graphinData: state.graphinData,
    }))

    const localGraphinRef = useRef<Graphin>(null)

    // Load data on mount:
    useEffect(() => {
        const asyncFetch = async () => {
            await fetchData()
        }

        try {
            asyncFetch()
        } catch (e: any) {
            enqueueSnackbar(e.message, {
                variant: "error",
                persist: true,
            })
        }
    }, [])

    // useEffect(() => {
    //     console.log("localGraphinRef", localGraphinRef)
    // }, [localGraphinRef])

    if (!graphinData) return <LoadingLogo />

    return (
        <div className="absolute inset-0">
            <div id="graph-container" />
            <Graphin
                data={graphinData}
                ref={localGraphinRef}
                layout={{
                    type: "random",
                    fitCenter: true,
                    onTick: () => {
                        console.log("ticking")
                    },
                    onLayoutEnd: () => {
                        // setGraphinRef(localGraphinRef)
                        console.log("force layout done")
                    },
                    // workerEnabled: true, // Whether to activate web-worker
                    animate: true,
                    animation: true,
                    // gpuEnabled: true, // Whether to enable the GPU parallel computing, supported by G6 4.0
                    // webworkerEnabled: true,
                }}
            >
                <ZoomCanvas enableOptimize sensitivity={1} />
                <Hoverable bindType="node" />
                <Toolbar
                    direction="horizontal"
                    style={{ position: "absolute", right: "250px" }}
                >
                    <LayoutToolbar />
                </Toolbar>
                <div className="absolute left-0 bottom-0 w-full ">
                    <Controls />
                </div>
            </Graphin>
            {/* <SigmaContainer
                settings={{
                    labelRenderer: drawLabel,
                    ...settings,
                }}
            >
                <div ref={parent}>{devMode && <DevPanel />}</div>
                {!graphStore.firstSim && <LoadingLogo />}
                <GraphSettingsController hoveredNode={hoveredNode} />
                <GraphEventsController setHoveredNode={setHoveredNode} />
                <GraphDataController filters={filtersState} />

                <span className="absolute left-0 top-0 p-3 text-sm text-gray-400">
                    Centrifuge Widget Demo - v{APP_VERSION}
                </span>

                <Controls />
            </SigmaContainer> */}
        </div>
    )
}

export default Root
