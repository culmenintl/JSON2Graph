import { FC } from "react"
import { BottomNavigation } from "react-daisyui"
import {
    CubeTransparentIcon,
    CogIcon,
    CircleStackIcon,
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
                className="p-1"
            >
                <CircleStackIcon />
                <BottomNavigation.Label>Data</BottomNavigation.Label>
            </BottomNavigation.Item>
            <BottomNavigation.Item
                active={isSelected("graph")}
                color={isSelected("graph") ? "primary" : undefined}
                onClick={(e) => {
                    e.preventDefault()
                    actions.app.panelNavigation("graph")
                }}
                className="p-1"
            >
                <CubeTransparentIcon />

                <BottomNavigation.Label>Graph</BottomNavigation.Label>
            </BottomNavigation.Item>
            <BottomNavigation.Item
                active={panelNavigation === "settings"}
                color={isSelected("settings") ? "primary" : undefined}
                onClick={(e) => {
                    e.preventDefault()
                    actions.app.panelNavigation("settings")
                }}
                className="p-1"
            >
                <CogIcon />
                <BottomNavigation.Label>Settings</BottomNavigation.Label>
            </BottomNavigation.Item>
        </BottomNavigation>
    )
}
