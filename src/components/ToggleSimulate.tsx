import { GraphinContext } from "@antv/graphin"
import { classNames } from "../lib/Utils"
import { STATUS } from "../stores/_AppSlice"
import useStore from "../stores/_Store"
import { PlayIcon, StopIcon } from "@heroicons/react/24/outline"
// import { useSigma } from "@react-sigma/core"
import React, { FC, useEffect } from "react"

export const ToggleSimulation: FC<{}> = () => {
    const { apis } = React.useContext(GraphinContext)
    const { handleZoomIn, handleZoomOut } = apis
    const ctx = React.useContext(GraphinContext)

    const setStatus = useStore((state) => state.setStatus)
    const status = useStore((state) => state.status)
    const toggleLayout = useStore((state) => state.toggleLayout)
    // const sigma = useSigma()
    const toggleSimulation = () => {
        if (status === STATUS.SIMULATING) {
            setStatus(STATUS.GRAPH_SIMULATED, false)
            toggleLayout(ctx)
        } else {
            setStatus(STATUS.SIMULATING, true)
            toggleLayout(ctx)
        }
    }
    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         if (graphStore.isSimulating) {
    //             sigma.scheduleRefresh()
    //         }
    //     }, graphStore.refreshInterval)
    //     return () => clearInterval(interval)
    // }, [graphStore.isSimulating])
    return (
        <>
            <button
                type="button"
                className={classNames(
                    status === STATUS.SIMULATING
                        ? "bg-indigo-600 text-white"
                        : "bg-gray-300 text-gray-900",
                    "inline-flex items-center rounded-full border border-transparent p-2 text-white shadow-sm hover:bg-indigo-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2",
                )}
                onClick={toggleSimulation}
            >
                {status === STATUS.SIMULATING ? (
                    <StopIcon className="h-5 w-5" aria-hidden="true" />
                ) : (
                    <PlayIcon className="h-5 w-5" aria-hidden="true" />
                )}
            </button>
        </>
    )
}
