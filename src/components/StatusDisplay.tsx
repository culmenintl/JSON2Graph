import autoAnimate from "@formkit/auto-animate"
import React, { useEffect, useRef, useState } from "react"
import { useTrackedStore } from "../stores/Store"

export const StatusDisplay: React.FC = () => {
    return <></>
    // const parent = useRef(null)
    // const status = useTrackedStore().app.status()
    // const [localStatus, setLocalStatus] = useState<string[]>([])

    // useEffect(() => {
    //     parent.current && autoAnimate(parent.current)
    // }, [parent])

    // useEffect(() => {
    //     console.log("new value:", status)
    //     if (!localStatus.length) {
    //         setLocalStatus([status])
    //     } else {
    //         setLocalStatus([])
    //         setTimeout(() => {
    //             setLocalStatus([status])
    //         }, 500)
    //     }

    //     // update value in 500 ms
    // }, [status])
    // return (
    //     <div ref={parent} className="flex flex-1 flex-col">
    //         {localStatus.map((val) => (
    //             <span key={val} className="">
    //                 {val}
    //             </span>
    //         ))}
    //     </div>
    // )
}
