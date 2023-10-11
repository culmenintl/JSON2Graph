import { Cog8ToothIcon as CogOutline } from "@heroicons/react/24/outline"
import { FC, useCallback, useEffect, useRef } from "react"
import { Navbar, Swap, Modal } from "react-daisyui"

import { actions, store, useTrackedStore } from "../../stores/Store"
import { GraphStatsBar } from "./GraphStatsBar"
import { SearchBar } from "./SearchBar"
import { SearchResults } from "./SearchResults"

import autoAnimate from "@formkit/auto-animate"
import { Layouts, LayoutsMap } from "../../stores/Layouts"
import { LayoutSelector } from "../LayoutSelector"
import { PanelNavigation } from "./PanelNavigation"
import { exportGraphAsCSV } from "../../lib/Utils"
import { GraphData } from "@antv/g6"
import { LegendComponent } from "../LegendComponent"

// GraphNavbar component, which is the main navbar for the graph view
// contains the search bar, search results, and stats bar
export const GraphNavbar: FC = () => {
    const menuOpen = useTrackedStore().app.menuOpen()
    const graphGraphinData = useTrackedStore().data.graphinData()

    const parent = useRef(null)
    useEffect(() => {
        parent.current && autoAnimate(parent.current)
    }, [parent])

    const dialogRef = useRef<HTMLDialogElement>(null)
    const handleOpen = useCallback(() => {
        console.log("handleOpen")
        dialogRef.current?.showModal()
    }, [dialogRef])

    return (
        <div className="flex flex-1 max-w-xl mx-auto pointer-events-auto">
            <Modal ref={dialogRef} backdrop className="max-w-xl p-0">
                <PanelNavigation />
            </Modal>
            <Navbar className="rounded-box shadow-xl bg-base-100 glass">
                <div ref={parent} className="flex flex-col w-full">
                    {/*  statbar section top section*/}
                    {graphGraphinData && <GraphStatsBar />}
                    {/*  statbar section top section*/}
                    {graphGraphinData && <LegendComponent />}
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
                                onChange={handleOpen}
                                onElement={<CogOutline className="w-8 h-8" />}
                                offElement={<CogOutline className="w-8 h-8" />}
                            />
                        </div>
                        {/* Search Bar */}
                        <div className="flex-grow">
                            <SearchBar />
                        </div>
                        {/* Centrifuge Logo */}
                        <div>
                            <LayoutSelector />
                        </div>
                    </div>
                </div>
            </Navbar>
        </div>
    )
}
