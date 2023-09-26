import { FunnelIcon } from "@heroicons/react/24/outline"
import { Cog8ToothIcon as CogOutline } from "@heroicons/react/24/outline"
import { Cog8ToothIcon as CogSolid } from "@heroicons/react/24/solid"
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
    Swap,
} from "react-daisyui"
import CentrifugeLogoCentered from "/images/cent-logo-centered.svg"
import LayoutToolbar from "../LayoutToolbar"

import { actions, useTrackedStore } from "../../stores/Store"
import { GraphStatsBar } from "./GraphStatsBar"
import { SearchBar } from "./SearchBar"
import { SearchResults } from "./SearchResults"

export const GraphNavbar: FC<{}> = () => {
    const menuOpen = useTrackedStore().app.menuOpen()

    const onButtonClick = () => {
        // call messages endpoint
        fetch("/api/map")
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
            })
            .catch((error) => {
                console.error("Error:", error)
            })
        // alert("Opening Centrifuge")
    }

    return (
        <div className="max-w-xl mx-auto">
            <Navbar className="rounded-box shadow-xl bg-base-100 glass">
                <div className="flex flex-col w-full">
                    {/*  statbar section top section*/}
                    <div>
                        <GraphStatsBar />
                    </div>
                    {/* search results below stat bar */}
                    <div className="w-full">
                        <SearchResults />
                    </div>
                    {/* rest of the navbar */}
                    <div className="flex flex-1 flex-row w-full justify-center gap-0 md:gap-2">
                        <div>
                            <Swap
                                className="btn btn-md"
                                active={menuOpen === true}
                                rotate={true}
                                onChange={(e) => {
                                    actions.app.menuOpen(!menuOpen)
                                }}
                                onElement={<CogSolid className="w-8 h-8" />}
                                offElement={<CogOutline className="w-8 h-8" />}
                            />
                        </div>
                        <div className="flex-grow">
                            <SearchBar />
                        </div>

                        {/* <LayoutToolbar /> */}
                        <div>
                            <Button size="md" onClick={onButtonClick}>
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
                </div>
            </Navbar>
        </div>
    )
}
