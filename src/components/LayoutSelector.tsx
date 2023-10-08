import React from "react"
import { Avatar, Card, Dropdown } from "react-daisyui"

import layoutImage from "./../assets/layouts/force2.gif"
import { actions } from "../stores/Store"
import { LayoutsMap } from "../stores/Layouts"

export const LayoutSelector: React.FC = () => {
    return (
        <Dropdown end horizontal="right" vertical="bottom">
            <Dropdown.Toggle>Layouts</Dropdown.Toggle>
            <Dropdown.Menu className="w-64">
                {Object.keys(LayoutsMap).map((key) => {
                    const layout = LayoutsMap[key]
                    return (
                        <Dropdown.Item
                            key={key}
                            onClick={() => {
                                actions.graph.selectedLayout(layout)
                            }}
                            className="flex flex-1 w-full p-1"
                        >
                            <div className="flex flex-1 flex-row p-1">
                                <div>
                                    <img
                                        alt="Layout"
                                        src={layoutImage}
                                        className="w-10 h-10 rounded-sm"
                                    />
                                </div>
                                <div className="flex flex-1 flex-col pl-2">
                                    <span className="text-base">
                                        {layout.type}
                                    </span>
                                    <span className="text-xs text-gray-400 line-clamp-1">
                                        {"This is the layout description"}
                                    </span>
                                </div>
                            </div>

                            {/* <p>{subtitle}</p> */}
                        </Dropdown.Item>
                    )
                })}
            </Dropdown.Menu>
        </Dropdown>
    )
}
