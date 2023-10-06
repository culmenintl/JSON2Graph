import { Cog8ToothIcon as CogOutline } from "@heroicons/react/24/outline"
import { Cog8ToothIcon as CogSolid } from "@heroicons/react/24/solid"
import { FC } from "react"
import { Navbar, Button, Swap } from "react-daisyui"
import CentrifugeLogoCentered from "/images/cent-logo-centered.svg"

import { actions, useTrackedStore } from "../../stores/Store"
import { GraphStatsBar } from "./GraphStatsBar"
import { SearchBar } from "./SearchBar"
import { SearchResults } from "./SearchResults"

// GraphNavbar component, which is the main navbar for the graph view
// contains the search bar, search results, and stats bar
export const GraphNavbar: FC = () => {
    const menuOpen = useTrackedStore().app.menuOpen()

    const onButtonClick = async () => {
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
        <div className="container max-w-xl mx-auto">
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
                            {/* Cog icon click for opening/closing dev panel modal */}
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
                        {/* Search Bar */}
                        <div className="flex-grow">
                            <SearchBar />
                        </div>
                        {/* Centrifuge Logo */}
                        <div>
                            <Button size="md" onClick={onButtonClick}>
                                <img
                                    src={CentrifugeLogoCentered}
                                    className={"h-10"}
                                    alt="Centrifuge"
                                />
                            </Button>
                        </div>
                    </div>
                </div>
            </Navbar>
        </div>
    )
}
