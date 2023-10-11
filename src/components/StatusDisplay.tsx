import autoAnimate from "@formkit/auto-animate"
import React, { useEffect, useRef } from "react"
import { useTrackedStore } from "../stores/Store"

export const StatusDisplay: React.FC = () => {
    const parent = useRef(null)
    const status = useTrackedStore().app.status()

    useEffect(() => {
        parent.current && autoAnimate(parent.current)
    }, [parent])

    return (
        <div ref={parent} className="flex flex-1 flex-col">
            <span className="">{status}</span>
        </div>
    )
}
