import React, { FC, useCallback, useEffect, useRef, useState } from "react"
import {
    Toggle,
    Input,
    Collapse,
    Badge,
    Card,
    Button,
    Modal,
} from "react-daisyui"
import { actions, store, useTrackedStore } from "../stores/Store"

import { useHotkeys } from "react-hotkeys-hook"
// import { ChangelogModal } from "./ChangelogModal"
import { BaseModalPanel } from "./navigation/BaseModalPanel"
import { DataMappingDisplay } from "./navigation/DataMappingDisplay"
import { MiniGraph } from "./MiniGraph"
import { GraphData } from "@antv/g6"
import { exportGraphAsCSV } from "../lib/Utils"
import { ArrowUpOnSquareIcon } from "@heroicons/react/24/outline"
import fileConfig from "../../configs/data.mapping.json"
import ThemeSwitcher from "./navigation/ThemeSwitcher"
import { GraphConfig } from "../lib/AppTypes"
import { marked } from "marked"

export const DataPanel: React.FC = () => {
    const description = useTrackedStore().data.dataSet()?.description
    const aiMappingEnabled = useTrackedStore().pref.aiMappingEnabled()
    const dataUrl = useTrackedStore().data.dataUrl()

    // handles the opening and closing of the menu
    const config = fileConfig as unknown as GraphConfig

    const configIndex = useTrackedStore().data.configIndex()

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

                {/* rome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
                <span
                    className="absolute btn btn-link top-1 right-1 text-sm font-bold lowercase cursor-pointer"
                    onClick={() => actions.app.showChangelog(true)}
                >
                    v{APP_VERSION}
                </span>
                <Card>
                    <MiniGraph />
                </Card>

                <h3>Description</h3>
                <p>{description}</p>
                <div className="flex flex-col my-10">
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

                <div>
                    {aiMappingEnabled && (
                        <div>
                            <h3>Source</h3>
                            <div>
                                <div className="flex flex-row items-center gap-2">
                                    <span className="label label-text">
                                        https://
                                    </span>
                                    <Input
                                        className="flex flex-1 w-full"
                                        size="md"
                                        bordered
                                        type="text"
                                        placeholder={"Enter a data url"}
                                        disabled={!aiMappingEnabled}
                                        onChange={(e) => {
                                            actions.data.dataUrl(e.target.value)
                                        }}
                                        onKeyDown={handleKeyDown}
                                        value={dataUrl}
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    <h3>Local Graph Datasets</h3>
                    <div className="flex flex-row items-center">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {config.datasets.map((dataset, index) => {
                                return (
                                    <Card
                                        className={`hover:bg-base-200 cursor-pointer ${
                                            index === configIndex
                                                ? "border-primary"
                                                : ""
                                        }`}
                                        onClick={async () => {
                                            await actions.data.setConfigIndex(
                                                index,
                                            )
                                        }}
                                        key={dataset.label}
                                    >
                                        <Card.Body className="">
                                            <span>{dataset.label}</span>
                                            <p className="text-xs text-gray-400">
                                                {dataset.description}
                                            </p>
                                            {index === configIndex && (
                                                <Badge
                                                    color="primary"
                                                    className="text-xs"
                                                    outline
                                                >
                                                    Active
                                                </Badge>
                                            )}
                                        </Card.Body>
                                    </Card>
                                )
                            })}
                        </div>
                        {/* <Badge
                            variant="outline"
                            color="primary"
                            onClick={() => alert("This is currently disabled.")}
                            className="cursor-pointer"
                        >
                            Reddit 10k
                        </Badge>
                        <Badge
                            variant="outline"
                            onClick={async () => {
                                // alert("This is currently disabled.")
                                await actions.data.setConfigIndex(2)
                            }}
                            className="cursor-pointer"
                        >
                            Yelp 3.5k
                        </Badge> */}
                    </div>
                </div>

                <h3>Graph to Data Mapping</h3>

                <DataMappingDisplay />

                <h3>Select Node Color Scheme</h3>
                <div>
                    <ThemeSwitcher />
                </div>
            </div>

            <div className="mx-auto my-10">
                <Button onClick={onExport} className="w-full" variant="link">
                    Export Graph .CSV
                    <ArrowUpOnSquareIcon className="h-5 w-5" />
                </Button>
            </div>
        </BaseModalPanel>
    )
}
