import { classNames } from "../lib/Utils"
// import useBoundStore from "../stores/Store"
import { WrenchScrewdriverIcon } from "@heroicons/react/24/outline"
import { FC } from "react"

export const ToggleDev: FC<{}> = () => {
    // const toggleDevMode = useBoundStore((state) => state.toggleDevMode)
    // const devMode = useBoundStore((state) => state.devMode)
    // const toggleDev = () => toggleDevMode()
    return (
        <>
            {/* <button
                type="button"
                className={classNames(
                    devMode
                        ? "bg-indigo-600 text-white"
                        : "bg-gray-300 text-gray-900",
                    "inline-flex items-center rounded-full border border-transparent p-2 text-white shadow-sm hover:bg-indigo-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2",
                )}
                onClick={toggleDev}
            >
                <WrenchScrewdriverIcon className="h-5 w-5" aria-hidden="true" />
            </button> */}
        </>
    )
}
