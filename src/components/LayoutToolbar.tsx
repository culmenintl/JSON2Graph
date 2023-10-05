import React, { useState } from "react"
import { Button, Dropdown, Kbd, Menu } from "react-daisyui"
import { GraphinContext } from "@antv/graphin"
import { Cog } from "./icons"

// mock layout data
const layouts = [
    {
        name: "gForce",
        options: {
            gpuEnabled: true,
            webworkerEnabled: true,
        },
    },
    { name: "random", options: {} },
    {
        name: "graphin-force",
        options: {
            gpuEnabled: true,
            webworkerEnabled: true,
        },
    },
    { name: "layout4", options: {} },
    {
        name: "random",
        options: {},
    },
    {
        name: "radial",
        options: {},
    },
    {
        name: "mds",
        options: {},
    },
    {
        name: "circular",
        options: {},
    },
    {
        name: "fruchterman",
        options: {
            gpuEnabled: true,
            webworkerEnabled: true,
        },
    },
    {
        name: "force",
        options: {},
    },
    {
        name: "dagre",
        options: {},
    },
    {
        name: "concentric",
        options: {},
    },
    {
        name: "grid",
        options: {},
    },
]

const ToolbarComponent = () => {
    const [selectedLayout, setSelectedLayout] = useState("")
    const ctx = React.useContext(GraphinContext)

    const changeGraphLayout = (layout: { name: string; options: object }) => {
        // console.log("selecting", layout)
        setSelectedLayout(layout.name)
        // console.log("selecting", layout)

        ctx.graph?.updateLayout({ type: layout.name, ...layout.options })
        // ctx.graph?.positionsAnimate()
        // Graph.updateLayout({ type: layout }) // use the Graphin instance method to update the graph layout
    }

    return (
        <></>
        // <Dropdown vertical="top" className="flex-1">
        //     <Dropdown.Toggle>{Cog}</Dropdown.Toggle>
        //     <Dropdown.Menu>
        //         {layouts.map((layout, index) => (
        //             <Dropdown.Item
        //                 // rome-ignore lint/suspicious/noArrayIndexKey: <explanation>
        //                 key={index}
        //                 onClick={() => changeGraphLayout(layout)}
        //             >
        //                 {layout.name}
        //             </Dropdown.Item>
        //         ))}
        //     </Dropdown.Menu>
        // </Dropdown>
    )
}

export default ToolbarComponent
