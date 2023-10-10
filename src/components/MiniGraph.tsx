import React, { useEffect, useRef, useState } from "react"
import fileConfig from "../../configs/data.mapping.json"
import { GraphConfig, _EdgeConfig, _NodeConfig } from "../lib/AppTypes"
import Graphin, { Behaviors } from "@antv/graphin"
import { useTrackedStore } from "../stores/Store"
import { setNodeColor, setNodeIcon } from "../lib/Utils"

export const MiniGraph: React.FC = () => {
    const userTheme = useTrackedStore().pref.theme()
    const graphReady = useTrackedStore().graph.graphReady()
    const config = fileConfig as unknown as GraphConfig
    const nodes: _NodeConfig[] = config.datasets[0].nodes ?? []
    const edges: _EdgeConfig[] = config.datasets[0].edges ?? []

    const { DragCanvas, ZoomCanvas, FitView, DragNode } = Behaviors

    const graphGraphinData = {
        nodes: nodes.map((config) => {
            const newNode = {
                id: config.id_data_property,
                style: {
                    label: {
                        value: config.label,
                        fontSize: 10,
                    },
                    keyshape: {
                        // size: 20,
                    },
                },
            }

            setNodeIcon(newNode, config)
            setNodeColor(newNode, config)
            return newNode
        }),
        edges: edges.map((edge) => {
            return {
                source: edge.source_node_id,
                target: edge.target_node_id,
            }
        }),
    }

    return (
        <div className="w-full max-h-36 overflow-clip">
            {graphReady && (
                <Graphin
                    data={graphGraphinData}
                    layout={{
                        type: "mds",
                    }}
                    theme={{
                        mode: userTheme === "dark" ? "dark" : "light",
                    }}
                    animate={true}
                    // fitView={true}
                    height={144}
                >
                    <DragNode disabled />
                    <DragCanvas disabled />
                    <ZoomCanvas disabled />
                </Graphin>
            )}
        </div>
    )
}
