import React, { useCallback, useEffect, useRef } from "react"
import { Button, Range, Table, Toggle, Input, Loading } from "react-daisyui"
import { actions, useStore, useTrackedStore } from "../stores/Store"

import { useHotkeys } from "react-hotkeys-hook"
import { ChangelogModal } from "./ChangelogModal"
import { BaseModalPanel } from "./navigation/BaseModalPanel"

const SampleJsonData = (data: Object) => (
    <pre>{JSON.stringify(data, null, 2)}</pre>
)

export const DeveloperPanel: React.FC = () => {
    const userTheme = useTrackedStore().pref.theme()

    const rowsToSample = useTrackedStore().data.rowsToSample()

    // handles the opening and closing of the menu
    const menuOpen = useTrackedStore().app.menuOpen()

    const clusteringLimit = useTrackedStore().graph.clusteringLimit()
    const clusteringEnabled = useTrackedStore().graph.clusteringEnabled()

    // filter nodes by degree
    const filterGraphByDegree = useTrackedStore().graph.filterGraphByDegree()
    const filteringLimit = useTrackedStore().graph.filteringLimit()

    const hoverMode = useTrackedStore().pref.hoverMode()
    const JsonSample = useStore().data.JsonSample()

    const nodesCount = useTrackedStore()
        .graphinRef.graphRef()
        ?.getNodes()
        .length.toLocaleString()

    const edgesCount = useTrackedStore()
        .graphinRef.graphRef()
        ?.getEdges()
        .length.toLocaleString()

    useHotkeys("mod+i", () => {
        if (menuOpen) actions.app.menuOpen(false)
        else actions.app.menuOpen(true)
    })

    const handleKeyDown = async (
        event: React.KeyboardEvent<HTMLInputElement>,
    ) => {
        if (event.key === "Enter") {
            event.preventDefault()
            await actions.data.fetchData()
        }
    }

    return (
        <BaseModalPanel>
            <div className="pl-4">
                <h2 className="font-semibold text-2xl">Graph Data</h2>
                <span className="absolute top-0 right-2 text-sm text-gray-400 underline">
                    {APP_VERSION}
                </span>
                <ChangelogModal />
                <Input
                    className="flex flex-1 w-full"
                    size="md"
                    bordered
                    type="text"
                    placeholder={"Enter a data url"}
                    disabled={useTrackedStore().app.loading()}
                    onChange={(e) => {
                        actions.data.dataUrl(e.target.value)
                    }}
                    onKeyDown={handleKeyDown}
                    value={useTrackedStore().data.dataUrl()}
                />
                <div className="prose">
                    <h4>Description</h4>
                    {useTrackedStore().app.loading() && (
                        <Loading variant="spinner" />
                    )}
                    <p className="">
                        {useTrackedStore().data.dataSet().description}
                    </p>
                </div>
            </div>
            <Table>
                <Table.Body className="prose">
                    <Table.Row>
                        <span>
                            Theme:
                            <span className="text-2xl ml-3">
                                {userTheme === "light" ? "☀️" : "🌙"}
                            </span>
                        </span>
                        <Toggle
                            checked={userTheme === "dark"}
                            // checked={userTheme === "dark"}
                            onChange={() => {
                                const theme =
                                    userTheme === "dark" ? "light" : "dark"

                                actions.pref.theme(theme)
                            }}
                        />
                    </Table.Row>
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
                                Number of clusters to show of top nodes
                            </small>
                        </div>
                        <Range
                            disabled={!clusteringEnabled}
                            min={0}
                            max={10}
                            value={clusteringLimit}
                            onChange={(val: any) => {
                                if (val.target.value === clusteringLimit) return
                                actions.graph.clusteringLimit(val.target.value)
                                actions.data.fetchData()
                            }}
                        />
                    </Table.Row>

                    <Table.Row>
                        <span>Hover Mode</span>
                        <Toggle
                            checked={hoverMode}
                            onChange={() => {
                                actions.pref.hoverMode(!hoverMode)
                            }}
                        />
                    </Table.Row>
                    <Table.Row>
                        <span>Nodes</span>
                        <span className="ml-auto">{nodesCount}</span>
                    </Table.Row>
                    <Table.Row>
                        <span>Edges</span>
                        <span className="ml-auto">{edgesCount}</span>
                    </Table.Row>

                    <Table.Row>
                        <span>Clear Local Cache</span>
                        <span className="ml-auto">
                            <Button
                                onClick={() => console.log("clearing cache")}
                                color="warning"
                                size="sm"
                            >
                                Clear
                            </Button>
                        </span>
                    </Table.Row>
                    <Table.Row>
                        <div className="flex flex-1 flex-col prose">
                            <span className="">
                                Filter by degree: {filteringLimit}
                            </span>
                            <small className="font-medium text-slate-400">
                                Filter the visible nodes by the number of
                                degrees
                            </small>
                        </div>
                        <Range
                            disabled={!filterGraphByDegree}
                            min={0}
                            max={10}
                            value={filteringLimit}
                            onChange={(val: any) => {
                                // console.log(
                                //     "changing filter limit",
                                //     val.target.value,
                                // )
                                actions.graph.filteringLimit(val.target.value)
                            }}
                            onBlur={(val: any) => {
                                // console.log("onblur", val.target.value)
                                actions.graph.filterGraphByDegree(
                                    val.target.value,
                                )
                                // actions.data.fetchData()
                            }}
                        />
                    </Table.Row>
                    <Table.Row>
                        <span>Sample Rows</span>
                        <Toggle
                            checked={rowsToSample !== 0}
                            onChange={() =>
                                actions.data.rowsToSample(
                                    rowsToSample === 0 ? 200 : 0,
                                )
                            }
                        />
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
        </BaseModalPanel>
    )
}
