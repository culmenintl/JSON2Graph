import { FunnelIcon } from "@heroicons/react/24/outline"
import { FC } from "react"
import { GraphinContext } from "@antv/graphin"
import React from "react"
import {
    Navbar,
    Button,
    Form,
    Input,
    Divider,
    Theme,
    useTheme,
} from "react-daisyui"
import CentrifugeLogoCentered from "/images/cent-logo-centered.svg"
import LayoutToolbar from "./LayoutToolbar"

import { actions, store, useStore, useTrackedStore } from "../stores/Store"

export const GraphNavbar: FC<{}> = () => {
    const sampledRows = useStore().data.rows()
    const totalRows = useStore().data.totalRows()
    const { theme, setTheme } = useTheme()

    const nodesCount = useStore()
        .graph.graphRef()
        ?.getNodes()
        .length.toLocaleString()

    const edgesCount = useStore()
        .graph.graphRef()
        ?.getEdges()
        .length.toLocaleString()

    // converts 1234 to 1.2k
    const formattedSampleRows =
        totalRows >= 1000
            ? `${Math.floor(totalRows / 1000)}k`
            : sampledRows.toString()
    console.log(formattedSampleRows) // Output: "1234k"

    const filterGraph = () => {
        actions.data.filterGraphByDegree(2)
    }
    return (
        <div className="max-w-xl mx-auto">
            <Navbar className="rounded-box shadow-xl bg-base-100">
                <div className="flex flex-col w-full">
                    {/*  statbar section*/}

                    <div className="flex flex-1 flex-row w-full gap-2 text-sm text-slate-400 justify-center py-3">
                        <div className="">{nodesCount} nodes</div>
                        <Divider horizontal />
                        <div className="">{edgesCount} edges</div>
                        <Divider horizontal />
                        <div className="">
                            {sampledRows.toLocaleString()}/{formattedSampleRows}{" "}
                            rows
                        </div>
                    </div>

                    {/* rest of the navbar */}
                    <div className="flex flex-1 flex-row w-full justify-center gap-2">
                        <Button size="md" onClick={() => filterGraph()}>
                            {<FunnelIcon className="w-5 h-5" />}
                        </Button>
                        {/* <div className="flex flex-1"><ToggleDev /></div> */}
                        <Form>
                            <Input
                                className="flex flex-1"
                                size="md"
                                bordered
                                type="text"
                                placeholder="Search"
                            />
                        </Form>
                        <div>
                            <LayoutToolbar />
                        </div>
                        <Button
                            size="md"
                            onClick={() => alert("Opening Centrifuge")}
                        >
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
                        </Button>
                    </div>
                </div>
            </Navbar>
        </div>
    )
}
