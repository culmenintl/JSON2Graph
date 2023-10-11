import React from "react"
import { Button, Card, Menu, useTheme } from "react-daisyui"
import type { ContextMenuValue } from "@antv/graphin"
import { useTrackedStore } from "../stores/Store"
import { exportNodesAsCsv } from "../lib/Utils"
import { ExtendedNode } from "../lib/AppTypes"

interface Props {
    value: ContextMenuValue
}
export const ContextMenuComponent: React.FC<Props> = ({ value }) => {
    // console.log("value", value)
    const graph = useTrackedStore().graphinRef.graphRef()
    const selected = graph?.findAllByState("node", "selected")
    // console.log("graph", graph?.findAllByState("node", "selected"))

    const exportToCsv = () => {
        console.log("exporting")
        const selectedVals = selected?.map((node) => {
            return node.getModel() as ExtendedNode
        })
        if (!selectedVals) return
        exportNodesAsCsv(selectedVals)
    }
    return (
        <Card className="flex flex-1 w-52 overflow-hidden shadow-lg">
            <Menu className="flex flex-1 bg-base-100">
                <Menu.Title>{selected?.length} Nodes Selected</Menu.Title>
                <Menu.Item
                    onClick={() => {
                        exportToCsv()
                    }}
                >
                    <span>Export</span>
                </Menu.Item>
            </Menu>
        </Card>
    )
}
