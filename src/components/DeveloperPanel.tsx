import React, { useState, useEffect } from "react"
import {
    Button,
    Card,
    Range,
    Table,
    Theme,
    Toggle,
    useTheme,
} from "react-daisyui"
import { actions, useStore, useTrackedStore } from "../stores/Store"

import { useHotkeys } from "react-hotkeys-hook"

const SampleJsonData = (data: Object) => (
    <pre>{JSON.stringify(data, null, 2)}</pre>
)

export const DeveloperPanel: React.FC = () => {
    const [showModal, setShowModal] = useState(false)
    const [lastKeyPressTime, setLastKeyPressTime] = useState(0)

    const { theme, setTheme } = useTheme()

    const userTheme = useTrackedStore().app.theme()
    const clusteringLimit = useTrackedStore().graph.clusteringLimit()
    const clusteringEnabled = useTrackedStore().graph.clusteringEnabled()
    const hoverMode = useTrackedStore().graph.hoverMode()
    const JsonSample = useStore().data.JsonSample()

    const nodesCount = useStore()
        .graph.graphRef()
        ?.getNodes()
        .length.toLocaleString()

    const edgesCount = useStore()
        .graph.graphRef()
        ?.getEdges()
        .length.toLocaleString()

    useHotkeys("mod+i", () => {
        if (showModal) setShowModal(false)
        else setShowModal(true)
    })

    // useEffect(() => {
    //     const handleKeyPress = (event: KeyboardEvent) => {
    //         const currentTime = new Date().getTime()
    //         if (event.key === "d" && currentTime - lastKeyPressTime < 250) {
    //             console.log("d was pressed twice quickly")
    //         }
    //         setLastKeyPressTime(currentTime)
    //     }

    //     window.addEventListener("keydown", handleKeyPress)

    //     return () => {
    //         window.removeEventListener("keydown", handleKeyPress)
    //     }
    // }, [lastKeyPressTime])

    // method to toggle the theme
    const toggleTheme = () => {
        console.log("toggling theme", theme)
        if (theme === "light") {
            document
                .getElementsByTagName("html")[0]
                .setAttribute("data-theme", "dark")
            setTheme("dark")
            actions.app.theme("dark")
        } else {
            document
                .getElementsByTagName("html")[0]
                .setAttribute("data-theme", "light")
            setTheme("light")
            actions.app.theme("light")
        }
    }

    return (
        <>
            {showModal && (
                <div className="absolute left-10 top-0 w-full max-w-2xl overflow-hidden">
                    <Card
                        normal
                        className="rounded-box bg-base-100 max-h-screen overflow-y-auto"
                    >
                        <Card.Body>
                            <div className="prose lg:prose-lg mb-10 ">
                                <h2>Developer Panel</h2>
                                <p>{APP_VERSION}</p>
                            </div>
                            <Table>
                                <Table.Body className="prose">
                                    <Table.Row>
                                        <span>Clustering</span>
                                        <Toggle
                                            checked={clusteringEnabled}
                                            onChange={() => {
                                                actions.graph.clusteringEnabled(
                                                    !clusteringEnabled,
                                                )
                                                actions.data.fetchData()
                                            }}
                                        />
                                    </Table.Row>

                                    <Table.Row>
                                        <div className="flex flex-1 flex-col prose">
                                            <span className="">
                                                Cluster Limit: {clusteringLimit}
                                            </span>
                                            <small className="font-medium text-slate-400">
                                                Number of clusters to show of
                                                top nodes
                                            </small>
                                        </div>
                                        <Range
                                            disabled={!clusteringEnabled}
                                            min={0}
                                            max={10}
                                            value={clusteringLimit}
                                            onChange={(val: any) => {
                                                if (
                                                    val.target.value ===
                                                    clusteringLimit
                                                )
                                                    return
                                                console.log(
                                                    "changing cluster limit",
                                                )
                                                actions.graph.clusteringLimit(
                                                    val.target.value,
                                                )
                                                actions.data.fetchData()
                                            }}
                                        />
                                    </Table.Row>

                                    <Table.Row>
                                        <span>Hover Mode</span>
                                        <Toggle
                                            checked={hoverMode}
                                            onChange={() => {
                                                actions.graph.hoverMode(
                                                    !hoverMode,
                                                )
                                                // actions.data.fetchData()
                                            }}
                                        />
                                    </Table.Row>
                                    <Table.Row>
                                        <span>Nodes</span>
                                        <span className="ml-auto">
                                            {nodesCount}
                                        </span>
                                    </Table.Row>
                                    <Table.Row>
                                        <span>Edges</span>
                                        <span className="ml-auto">
                                            {edgesCount}
                                        </span>
                                    </Table.Row>

                                    <Table.Row>
                                        <span>
                                            Theme:
                                            <span className="text-lg ml-3">
                                                {userTheme === "light"
                                                    ? "☀️"
                                                    : "🌙"}
                                            </span>
                                        </span>
                                        <Toggle
                                            checked={userTheme === "dark"}
                                            onChange={() => toggleTheme()}
                                        />
                                    </Table.Row>
                                    <Table.Row>
                                        <span>Clear Local Cache</span>
                                        <span className="ml-auto">
                                            <Button
                                                onClick={() =>
                                                    console.log(
                                                        "clearing cache",
                                                    )
                                                }
                                                color="warning"
                                                size="sm"
                                            >
                                                Clear
                                            </Button>
                                        </span>
                                    </Table.Row>
                                    <Table.Row className="max-w-2xl overflow-x-hidden w-full">
                                        <span>Example Json</span>
                                        <span>Test</span>
                                        {/* <span className="ml-auto ">
                                            {SampleJsonData(
                                                JsonSample
                                                    ? (JsonSample as Object)
                                                    : {},
                                            )}
                                        </span> */}
                                    </Table.Row>
                                </Table.Body>
                            </Table>
                        </Card.Body>
                    </Card>
                </div>
            )}
        </>
    )
}

export default DeveloperPanel
