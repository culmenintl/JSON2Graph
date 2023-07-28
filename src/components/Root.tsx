import { FC, createRef, useEffect, useRef, useState } from "react"
import Graphin, {
    Behaviors,
    GraphinData,
    IUserEdge,
    IUserNode,
    Utils,
} from "@antv/graphin"
import "@antv/graphin/dist/index.css" // Don't forget to import CSS

import CentrifugeLogoCentered from "/images/cent-logo-centered.svg"
import CentrifugeText from "/images/centrifuge-text.svg"

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
import { ToggleSimulation } from "./ToggleSimulate"
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline"
// notistack
import { useSnackbar } from "notistack"
// import { convertG6ToGraphinData } from "../lib/Utils"
import { LayoutSelector, Toolbar } from "@antv/graphin-components"
import React from "react"
import LayoutToolbar from "./LayoutToolbar"
import { Navbar, Button, Form, Dropdown, Input, Theme } from "react-daisyui"
import { WrenchScrewdriverIcon } from "@heroicons/react/24/outline"
import DeveloperPanel from "./DeveloperPanel"

const Controls: FC<{}> = () => {
    return (
        <div className="max-w-4xl mx-auto">
            <Theme dataTheme="light">
                <Navbar className="shadow-xl rounded-box">
                    <div className="flex flex-col w-full">
                        {/*  statbar section*/}
                        {/* <div className="flex flex-1 flex-row">
                            <div className="flex-1 h-12 bg-red-400">test</div>
                            <div className="flex-1 h-12 bg-red-400">test</div>
                            <div className="flex-1 h-12 bg-red-400">test</div>
                        </div> */}

                        {/* rest of the navbar */}
                        <div className="flex flex-1 flex-row">
                            <Button
                                className="text-xl normal-case"
                                color="ghost"
                            >
                                JSON2Graph
                            </Button>
                            <div className="flex flex-1">
                                {/* <ToggleDev /> */}
                            </div>
                            <div className="flex flex-1 flex-row gap-2">
                                <Form>
                                    <Input
                                        bordered
                                        type="text"
                                        placeholder="Search"
                                    />
                                </Form>
                                <LayoutToolbar />
                                <Button
                                    size="md"
                                    // endIcon={
                                    //     <ArrowTopRightOnSquareIcon
                                    //         className="h-5 w-5"
                                    //         aria-hidden="true"
                                    //     />
                                    // }
                                    onClick={() => alert("Opening Centrifuge")}
                                >
                                    <div className="flex-1 flex-col items-center justify-center">
                                        <img
                                            src={CentrifugeLogoCentered}
                                            className={"h-10"}
                                            alt="Centrifuge"
                                        />
                                        {/* <img
                                            src={CentrifugeText}
                                            className="h-5 w-10"
                                            alt="Centrifuge"
                                        /> */}
                                    </div>
                                </Button>
                            </div>
                        </div>
                    </div>
                </Navbar>
            </Theme>
        </div>
    )
    // return (
    //     <div
    //         className={`!left-0 !bottom-0 !mx-auto !flex max-h-[75vh] !w-full
    //             !justify-between !border-0 !border-gray-300 !bg-gray-300/20 !backdrop-blur-lg`}
    //     >
    //         <div className="mx-auto flex w-full !max-w-xl flex-col py-3">
    //             <div className="flex flex-row items-center justify-between gap-1 px-1 md:gap-2">
    //                 <ToggleDev />
    //                 <ToggleSimulation />
    //                 <StatusDisplay />
    //                 {/* <LayoutForceAtlas2Control
    //                     settings={dataStore.graph.layoutSettings}
    //                 /> */}
    //                 {/* <ZoomControl className="!flex !items-center !justify-center !border-b-0 !bg-transparent" /> */}
    //                 <div className="hidden md:flex">
    //                     {/* <SearchControl className="!border-b-2 !border-gray-300 !bg-transparent" /> */}
    //                 </div>

    //                 <Button
    //                     text="Centrifuge"
    //                     icon={
    //                         <ArrowTopRightOnSquareIcon
    //                             className="h-5 w-5 p-1"
    //                             aria-hidden="true"
    //                         />
    //                     }
    //                     onClick={() => alert("Opening Centrifuge")}
    //                 />
    //             </div>
    //         </div>
    //     </div>
    // )
}

const Root: FC<{}> = () => {
    const [layout, setLayout] = React.useState({ name: "force", options: {} })

    // useEffect(() => {
    //     parent.current && autoAnimate(parent.current)
    // }, [parent])

    // notistack
    const { enqueueSnackbar, closeSnackbar } = useSnackbar()

    const [hoveredNode, setHoveredNode] = useState<string | null>(null)

    // zustand
    const { fetchData, devMode, setStatus, dataSet, graph, graphinData } =
        useStore((state) => ({
            fetchData: state.fetchData,
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
            try {
                await fetchData()
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

    // const newGraphinData = Utils.mock(10).circle().graphin()

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
                animate={true}
                layout={{
                    type: "gForce",
                    preset: {
                        name: "random",
                    },
                    fitCenter: true,
                    onTick: () => {
                        console.log("ticking")
                    },
                    onLayoutEnd: () => {
                        // setGraphinRef(localGraphinRef)
                        console.log("force layout done")
                        enqueueSnackbar("Force layout done", {
                            variant: "success",
                        })
                        localGraphinRef.current?.graph?.fitCenter()
                    },
                    // workerEnabled: true, // Whether to activate web-worker
                    animate: true,
                    animation: true,
                    gpuEnabled: true, // Whether to enable the GPU parallel computing, supported by G6 4.0
                    // webworkerEnabled: true,
                }}
            >
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
                <div className="absolute bottom-0 w-full pb-5 bg-transparent">
                    <Controls />
                </div>
                <DeveloperPanel />
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
