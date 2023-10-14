import { FC, useCallback, useEffect, useRef, useState } from "react"
import Graphin, { Behaviors, Components } from "@antv/graphin"

// graphin CSS
import "@antv/graphin/dist/index.css" // Don't forget to import CSS
import "@antv/graphin-icons/dist/index.css"

// graphin components used
const {
    DragCanvas,
    ZoomCanvas,
    ActivateRelations,
    DragCombo,
    DragNode,
    ClickSelect,
} = Behaviors

const { ContextMenu } = Components

import { useSnackbar } from "notistack"
import { GraphNavbar } from "./navigation/GraphNavbar"
import { actions, useTrackedStore } from "../stores/Store"
import { NodeToolTip } from "./NodeToolTip"
import { LoadingLogo } from "./LoadingLogo"
import autoAnimate from "@formkit/auto-animate"
import { initEvents } from "../lib/Utils"
import { ContextMenuComponent } from "./ContextMenuComponent"
import { useHotkeys } from "react-hotkeys-hook"
import { HOVERMODE_HOTKEY } from "../lib/Constants"
import { Button, Modal } from "react-daisyui"
import { marked } from "marked"

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

    const graphinData = useTrackedStore().data.graphinData()
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
                initEvents(graph)
                actions.graphinRef.graphRef(graph)
                actions.graphinRef.graphinApis(apis)
            }
        }
        getRef()
    }, [graphinData])

    useEffect(() => {
        if (graphReady && graphinData && graphinRef.current) {
            // set timeout to allow graph to render
            setTimeout(() => {
                setReady(true)
            }, 3000)
        } else {
            setReady(false)
        }
    }, [graphReady, graphinData, graphinRef.current])

    const hoverMode = useTrackedStore().pref.hoverMode()
    useHotkeys(HOVERMODE_HOTKEY, () => {
        actions.pref.hoverMode(!hoverMode)
        enqueueSnackbar(`Hover mode ${!hoverMode ? "enabled" : "disabled"}`, {
            variant: "info",
        })
    })

    const showchangeLog = useTrackedStore().app.showChangelog()

    const ref = useRef<HTMLDialogElement>(null)
    const handleShow = useCallback(() => {
        ref.current?.showModal()
    }, [ref])

    const handleHide = useCallback(() => {
        ref.current?.close()
        actions.app.showChangelog(false)
    }, [ref])

    const changelog = useTrackedStore().app.changelog()

    useEffect(() => {
        if (showchangeLog) {
            actions.app.fetchChangelog()
            handleShow()
        } else {
            handleHide()
        }
    }, [showchangeLog])

    // if not ready, show loading logo

    return (
        <div ref={parent} className="absolute inset-0">
            {!ready && <LoadingLogo />}
            {graphinData && (
                <Graphin
                    data={graphinData}
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
                    <ContextMenu
                        bindType="node"
                        style={{
                            display: "flex",
                            flex: 1,
                            minWidth: "200px",
                            padding: "2px",
                            boxShadow: "none",
                            backgroundColor: "transparent",
                        }}
                    >
                        {(value) => {
                            return <ContextMenuComponent value={value} />
                        }}
                    </ContextMenu>
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
            <div className="absolute bottom-0 w-full pb-5 pointer-events-none">
                {graphinData && <GraphNavbar />}
                <Modal ref={ref} open={false}>
                    <Modal.Header className="font-bold">Changelog</Modal.Header>
                    <Modal.Body
                        className="prose"
                        // rome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
                        dangerouslySetInnerHTML={{ __html: marked(changelog) }}
                    />
                    <Modal.Actions className="sticky bottom-0">
                        <Button color="primary" onClick={handleHide}>
                            Close
                        </Button>
                    </Modal.Actions>
                </Modal>
            </div>
        </div>
    )
}
