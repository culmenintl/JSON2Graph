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

import { actions, store, useStore, useTrackedStore } from "../../stores/Store"
import { GraphStatsBar } from "./GraphStatsBar"

export const GraphNavbar: FC<{}> = () => {
    const menuOpen = useTrackedStore().app.menuOpen()
    return (
        <div className="max-w-xl mx-auto">
            <Navbar className="rounded-box shadow-xl bg-base-100">
                <div className="flex flex-col w-full">
                    {/*  statbar section*/}
                    <GraphStatsBar />
                    {/* rest of the navbar */}
                    <div className="flex flex-1 flex-row w-full justify-center gap-0 md:gap-2">
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

                        <Form>
                            <Input
                                className="flex flex-1"
                                size="md"
                                bordered
                                type="text"
                                placeholder="Search"
                                disabled
                            />
                        </Form>
                        <div>
                            <LayoutToolbar />
                        </div>
                        <Button
                            size="md"
                            onClick={() => alert("Opening Centrifuge")}
                        >
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
            </Navbar>
        </div>
    )
}
