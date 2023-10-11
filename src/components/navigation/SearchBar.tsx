import { FC, useEffect, useRef, useState } from "react"
import { Input } from "react-daisyui"
import { actions, useTrackedStore } from "../../stores/Store"

import { IUserNode } from "@antv/graphin"
import autoAnimate from "@formkit/auto-animate"

export const SearchBar: FC = () => {
    const parent = useRef(null)

    const searchResults = useTrackedStore().data.searchResults()
    const searchTerm = useTrackedStore().data.searchTerm()

    // method to cound the sum of all values in the searchResults map
    const count = Array.from(searchResults?.values() ?? []).reduce(
        (acc: number, nodes: IUserNode[]) => {
            return acc + nodes?.length
        },
        0,
    )

    useEffect(() => {
        parent.current && autoAnimate(parent.current)
    }, [parent])

    return (
        <div ref={parent}>
            <Input
                id="search-bar"
                className="flex flex-1 w-full"
                size="md"
                bordered
                type="text"
                placeholder="Search"
                value={searchTerm ?? ""}
                onChange={(e) => {
                    const value = e.target.value
                    actions.data.setSearchTerm(value)
                }}
                onSubmit={(e) => {
                    console.log("submit", e)
                    // prevent form submission
                    e.preventDefault()
                }}
                onFocus={() => {
                    actions.data.showResults(true)
                }}
            />
            {(searchResults?.size ? true : false) && (
                <div className="flex flex-1 flex-row fixed bottom-5 right-32 items-center">
                    <div className="">
                        <span className="text-sm text-slate-400 bg-base-10">
                            {`${count} results`}
                        </span>
                    </div>
                </div>
            )}
        </div>
    )
}
