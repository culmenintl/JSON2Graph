import React from "react"
import autoAnimate from "@formkit/auto-animate"

import { useTrackedStore } from "../../stores/Store"
import { DeveloperPanel } from "../DeveloperPanel"
import { BottomNav } from "./BottomNav"
import { SettingsPanel } from "./SettingsPanel"
import { LayoutsPanel } from "./LayoutsPanel"

export const PanelNavigation: React.FC = () => {
    const panelNavigation = useTrackedStore().app.panelNavigation()

    const parent = React.useRef(null)
    React.useEffect(() => {
        parent.current && autoAnimate(parent.current)
    }, [parent])

    const showPanel = () => {
        switch (panelNavigation) {
            case "data":
                return <DeveloperPanel />
            case "layout":
                return <LayoutsPanel />
            case "settings":
                return <SettingsPanel />
            default:
                return <DeveloperPanel />
        }
    }

    return (
        <div ref={parent}>
            {showPanel()}
            <BottomNav />
        </div>
    )
}
