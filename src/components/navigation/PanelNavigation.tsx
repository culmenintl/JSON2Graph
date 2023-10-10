import React from "react"
import autoAnimate from "@formkit/auto-animate"

import { useTrackedStore } from "../../stores/Store"
import { DataPanel } from "../DataPanel"
import { BottomNav } from "./BottomNav"
import { SettingsPanel } from "./SettingsPanel"
import { GraphPanel } from "./GraphPanel"

export const PanelNavigation: React.FC = () => {
    const panelNavigation = useTrackedStore().app.panelNavigation()

    const parent = React.useRef(null)
    React.useEffect(() => {
        parent.current && autoAnimate(parent.current)
    }, [parent])

    const showPanel = () => {
        switch (panelNavigation) {
            case "data":
                return <DataPanel />
            case "graph":
                return <GraphPanel />
            case "settings":
                return <SettingsPanel />
            default:
                return <DataPanel />
        }
    }

    return (
        <div ref={parent}>
            {showPanel()}
            <BottomNav />
        </div>
    )
}
