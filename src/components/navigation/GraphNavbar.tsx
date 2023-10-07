import { Cog8ToothIcon as CogOutline } from "@heroicons/react/24/outline"
import { FC, useCallback, useEffect, useRef } from "react"
import { Navbar, Swap, Modal } from "react-daisyui"

import { actions, store, useTrackedStore } from "../../stores/Store"
import { GraphStatsBar } from "./GraphStatsBar"
import { SearchBar } from "./SearchBar"
import { SearchResults } from "./SearchResults"

import autoAnimate from "@formkit/auto-animate"
import { DeveloperPanel } from "../DeveloperPanel"
import { Layouts, LayoutsMap } from "../../stores/GraphStore"
import { LayoutSelector } from "../LayoutSelector"

// GraphNavbar component, which is the main navbar for the graph view
// contains the search bar, search results, and stats bar
export const GraphNavbar: FC = () => {
    const menuOpen = useTrackedStore().app.menuOpen()
    const graphGraphinData = useTrackedStore().data.graphinData()
    const parent = useRef(null)

    useEffect(() => {
        parent.current && autoAnimate(parent.current)
    }, [parent])

    const onButtonClick = async () => {
        // update the g6 layout to force a re-render
        const graph = store.graphinRef.graphRef()

        // create layout and update graph
        const layout = LayoutsMap[Layouts.forceAtlas2]

        // graph?.updateLayout(layout)

        // set the layout
        actions.graph.selectedLayout(layout)
    }

    const dialogRef = useRef<HTMLDialogElement>(null)
    const handleOpen = useCallback(() => {
        console.log("handleOpen")
        dialogRef.current?.showModal()
    }, [dialogRef])

    return (
        <div className="container max-w-xl mx-auto">
            <Modal ref={dialogRef} backdrop>
                <DeveloperPanel />
            </Modal>
            <Navbar className="rounded-box shadow-xl bg-base-100 glass">
                <div ref={parent} className="flex flex-col w-full">
                    {/*  statbar section top section*/}
                    {graphGraphinData && (
                        <div>
                            <GraphStatsBar />
                        </div>
                    )}
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

                            {/* <Button size="md" onClick={onButtonClick}>
                                <img
                                    src={CentrifugeLogoCentered}
                                    className={"h-10"}
                                    alt="Centrifuge"
                                />
                            </Button> */}
                        </div>
                    </div>
                </div>
            </Navbar>
        </div>
    )
}
