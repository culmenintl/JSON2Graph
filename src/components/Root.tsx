import autoAnimate from "@formkit/auto-animate"
import {
    ControlsContainer,
    SearchControl,
    SigmaContainer,
} from "@react-sigma/core"
import { FC, createRef, useEffect, useRef, useState } from "react"
import Graphin, {
    Behaviors,
    GraphinData,
    IUserEdge,
    IUserNode,
    Utils,
} from "@antv/graphin"
const { DragCanvas, ZoomCanvas, DragNode, ActivateRelations } = Behaviors

import drawLabel from "../lib/canvas-utils"
import { FiltersState, RedditNode } from "../lib/types"
import GraphDataController from "./GraphDataController"
import GraphEventsController from "./GraphEventsController"
import GraphSettingsController from "./GraphSettingsController"

import LoadingLogo from "./LoadingLogo"

import "@react-sigma/core/lib/react-sigma.min.css"

import useInject from "../hooks/useInject"
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

const Controls: FC<{}> = () => {
    return (
        <ControlsContainer
            className={`!left-0 !bottom-0 !mx-auto !flex max-h-[75vh] !w-full
                !justify-between !border-0 !border-gray-300 !bg-gray-300/20 !backdrop-blur-lg`}
        >
            <div className="mx-auto flex w-full !max-w-xl flex-col py-3">
                <div className="flex flex-row items-center justify-between gap-1 px-1 md:gap-2">
                    <ToggleDev />
                    {/* <ToggleSimulation /> */}
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
        </ControlsContainer>
    )
}

const Root: FC<{}> = () => {
    const [filtersState, setFiltersState] = useState<FiltersState>({
        clusters: {},
        tags: {},
    })

    const parent = useRef(null)

    useEffect(() => {
        parent.current && autoAnimate(parent.current)
    }, [parent])

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
    } = useStore()

    const graphinRef = createRef<Graphin>()

    useEffect(() => {
        // const {
        //     graph, // Graph instance of g6
        //     apis, // API interface provided by Graphin
        // } = graphinRef.current
        // console.log("ref", graphinRef, graph, apis)
    }, [])

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

    if (!graphinData) return <LoadingLogo />

    return (
        <div className="absolute inset-0">
            <div id="graph-container" />
            <Graphin
                data={graphinData}
                ref={graphinRef}
                animate={true}
                fitView={true}
                layout={{
                    type: "gForce",
                    onTick: () => {
                        console.log("ticking")
                    },
                    onLayoutEnd: () => {
                        console.log("force layout done")
                    },
                    // workerEnabled: true, // Whether to activate web-worker
                    animate: true,
                    animation: true,
                    gpuEnabled: true, // Whether to enable the GPU parallel computing, supported by G6 4.0
                }}
            >
                <Controls />
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
