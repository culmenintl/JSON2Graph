import React from "react"
import { Badge, Card, Divider, Dropdown } from "react-daisyui"

import layoutImage from "./../assets/layouts/force2.gif"
import { actions } from "../stores/Store"
import { LayoutsMap } from "../stores/Layouts"
import { ViewfinderCircleIcon } from "@heroicons/react/24/outline"
import _ from "lodash"

export const LayoutSelector: React.FC = () => {
    return (
        <Dropdown end horizontal="left" vertical="bottom">
            <Dropdown.Toggle>
                <ViewfinderCircleIcon className="w-8 h-8" />
            </Dropdown.Toggle>
            <Dropdown.Menu className="grid grid-cols-1 gap-1 max-h-[75vh] overflow-y-auto w-96">
                {Object.keys(LayoutsMap).map((key) => {
                    const layout = LayoutsMap[key]
                    return (
                        <>
                            <Dropdown.Item
                                key={key}
                                onClick={() => {
                                    actions.graph.selectedLayout(layout)
                                }}
                                className="flex flex-1 p-1 gap-2 "
                            >
                                <div className="flex flex-1 flex-row p-1">
                                    {/* image */}
                                    <div className="flex">
                                        <img
                                            alt="Layout"
                                            src={layoutImage}
                                            className="w-16 rounded-sm"
                                        />
                                    </div>
                                    <div className="grid grid-cols-1 pl-2">
                                        <span className="text-base">
                                            {layout._meta?.title}
                                        </span>
                                        <span className="text-xs text-gray-400 line-clamp-1">
                                            {layout._meta?.description}
                                        </span>
                                        <span className="flex flex-1 flex-row gap-1">
                                            {layout._meta?.tags?.map((tag) => {
                                                return (
                                                    <Badge
                                                        size="sm"
                                                        outline
                                                        color="info"
                                                    >
                                                        {tag}
                                                    </Badge>
                                                )
                                            })}
                                        </span>
                                    </div>
                                </div>
                                {/* <p>{subtitle}</p> */}
                            </Dropdown.Item>
                        </>
                    )
                })}
            </Dropdown.Menu>
        </Dropdown>
    )
}
