import React from "react"
import { Toggle, Input, Collapse, Badge, Card, Button } from "react-daisyui"
import { actions, store, useTrackedStore } from "../stores/Store"

import { useHotkeys } from "react-hotkeys-hook"
// import { ChangelogModal } from "./ChangelogModal"
import { BaseModalPanel } from "./navigation/BaseModalPanel"
import { DataMappingDisplay } from "./navigation/DataMappingDisplay"
import { MiniGraph } from "./MiniGraph"
import { ChangelogModal } from "./ChangelogModal"
import { GraphData } from "@antv/g6"
import { exportGraphAsCSV } from "../lib/Utils"
import { ArrowUpOnSquareIcon } from "@heroicons/react/24/outline"

const SampleJsonData = (data: Object) => (
    <pre>{JSON.stringify(data, null, 2)}</pre>
)

export const DataPanel: React.FC = () => {
    const description = useTrackedStore().data.dataSet().description
    const aiMappingEnabled = useTrackedStore().pref.aiMappingEnabled()

    // handles the opening and closing of the menu
    const menuOpen = useTrackedStore().app.menuOpen()

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

    const onExport = async () => {
        // update the g6 layout to force a re-render
        const graph = store.graphinRef.graphRef()
        const graphData = graph?.save()

        exportGraphAsCSV(graphData as GraphData)
    }

    return (
        <BaseModalPanel>
            <div className="pl-4 prose">
                <h1 className="">Graph Data</h1>

                <span className="absolute top-5 right-5 text-sm text-gray-400 font-bold underline">
                    v{APP_VERSION}
                </span>
                <Card>
                    <MiniGraph />
                </Card>

                <h3>Description</h3>
                <p>{description}</p>

                <h3>Source</h3>
                <div>
                    <div className="flex flex-row items-center gap-2">
                        <span className="label label-text">https://</span>
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
                    </div>
                    <div className="flex flex-row items-center">
                        <span className="label label-text">
                            Local Examples:
                        </span>
                        <Badge
                            variant="outline"
                            color="primary"
                            onClick={() => alert("This is currently disabled.")}
                            className="cursor-pointer"
                        >
                            Reddit 10k
                        </Badge>
                        <Badge
                            variant="outline"
                            onClick={() => alert("This is currently disabled.")}
                            className="cursor-pointer"
                        >
                            Yelp 3.5k
                        </Badge>
                    </div>
                </div>

                <h3>Mapping</h3>

                <Collapse icon="arrow" checkbox>
                    <Collapse.Title className="bg-base-200">
                        <span>Graph Configuration</span>
                    </Collapse.Title>
                    <Collapse.Content className="px-0">
                        <DataMappingDisplay />
                    </Collapse.Content>
                </Collapse>
                <div className="flex flex-col my-6">
                    <div className="flex flex-row items-center">
                        <span className="text-md font-semibold mr-10 block">
                            AI Mapping ✨
                        </span>
                        <Toggle
                            checked={aiMappingEnabled}
                            // checked={userTheme === "dark"}
                            onChange={() => {
                                actions.pref.aiMappingEnabled(!aiMappingEnabled)
                                alert("AI Mapping is currently disabled.")
                            }}
                        />
                    </div>
                    <span className="text-sm text-gray-400">
                        Map your data to a graph structure using AI
                    </span>
                </div>
            </div>
            <div className="fixed bottom-20 right-0 left-0 justify-center flex">
                <Button onClick={onExport} className="w-96" variant="link">
                    Export .CSV <ArrowUpOnSquareIcon className="h-5 w-5" />
                </Button>
            </div>
        </BaseModalPanel>
    )
}
