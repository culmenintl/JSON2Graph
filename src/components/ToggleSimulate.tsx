import { FC, useEffect } from "react"
import { PlayIcon, StopIcon } from "@heroicons/react/24/outline"
import { classNames } from "../lib/Utils"
import { observer } from "mobx-react-lite"
import { RootStoreModel } from "../stores/RootStore"
import useInject from "../hooks/useInject"
import { useSigma } from "@react-sigma/core"
import { STATUS } from "../stores/_AppSlice"
import useStore from "../stores/_Store"

const mapStore = ({ graphStore }: RootStoreModel) => ({
    graphStore,
})

export const ToggleSimulation: FC<{}> = observer(() => {
    const { graphStore } = useInject(mapStore)

    const setStatus = useStore((state) => state.setStatus)
    const sigma = useSigma()
    const toggleSimulation = () => {
        if (graphStore.isSimulating) {
            setStatus(STATUS.GRAPH_SIMULATED)
        } else {
            setStatus(STATUS.SIMULATING)
        }
        graphStore.toggleSimulation()
    }
    useEffect(() => {
        const interval = setInterval(() => {
            if (graphStore.isSimulating) {
                sigma.scheduleRefresh()
            }
        }, graphStore.refreshInterval)
        return () => clearInterval(interval)
    }, [graphStore.isSimulating])
    return (
        <>
            <button
                type="button"
                className={classNames(
                    graphStore.isSimulating
                        ? "bg-indigo-600 text-white"
                        : "bg-gray-300 text-gray-900",
                    "inline-flex items-center rounded-full border border-transparent p-2 text-white shadow-sm hover:bg-indigo-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2",
                )}
                onClick={toggleSimulation}
            >
                {graphStore.isSimulating ? (
                    <StopIcon className="h-5 w-5" aria-hidden="true" />
                ) : (
                    <PlayIcon className="h-5 w-5" aria-hidden="true" />
                )}
            </button>
        </>
    )
})
