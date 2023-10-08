import { FC } from "react"
import { BottomNavigation } from "react-daisyui"
import {
    CubeTransparentIcon,
    PlayPauseIcon,
    CogIcon,
} from "@heroicons/react/24/outline"
import { actions, useTrackedStore } from "../../stores/Store"

export const BottomNav: FC = () => {
    const panelNavigation = useTrackedStore().app.panelNavigation()

    const isSelected = (panel: string) => {
        return panelNavigation === panel
    }
    return (
        <BottomNavigation className="sticky bottom-0 bg-base-200">
            <BottomNavigation.Item
                active={isSelected("data")}
                color={isSelected("data") ? "primary" : undefined}
                onClick={(e) => {
                    // prevent default
                    e.preventDefault()
                    actions.app.panelNavigation("data")
                }}
            >
                <CubeTransparentIcon />
                <BottomNavigation.Label>Data</BottomNavigation.Label>
            </BottomNavigation.Item>
            <BottomNavigation.Item
                active={isSelected("layout")}
                color={isSelected("layout") ? "primary" : undefined}
                onClick={(e) => {
                    e.preventDefault()
                    actions.app.panelNavigation("layout")
                }}
            >
                <PlayPauseIcon />
                <BottomNavigation.Label>Layout</BottomNavigation.Label>
            </BottomNavigation.Item>
            <BottomNavigation.Item
                active={panelNavigation === "settings"}
                color={isSelected("settings") ? "primary" : undefined}
                onClick={(e) => {
                    e.preventDefault()
                    actions.app.panelNavigation("settings")
                }}
            >
                <CogIcon />
                <BottomNavigation.Label>Settings</BottomNavigation.Label>
            </BottomNavigation.Item>
        </BottomNavigation>
    )
}
