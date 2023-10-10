import { FC } from "react"

import CentrifugeLogoCentered from "/images/cent-logo-centered.svg"
import CentrifugeText from "/images/centrifuge-text.svg"
import { Circles } from "./Circles"

import { StatusDisplay } from "./StatusDisplay"

type Props = {
    size?: number
    iconOnly?: boolean
}
// Basic fullscreen loading animation w/ centrifuge logo
export const LoadingLogo: FC<Props> = () => {
    return (
        <div className="absolute w-full h-full bg-gradient-to-br from-base-100 to-base-300 z-10">
            <div
                className={
                    "absolute flex flex-1 flex-col top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 items-center justify-center"
                }
            >
                <div className="absolute -z-10">
                    <Circles speed={1300} />
                </div>
                <img
                    alt="Logo"
                    src={CentrifugeLogoCentered}
                    className="flex flex-1 w-20"
                />
                <img
                    alt="Logo"
                    src={CentrifugeText}
                    className="flex flex-1 mt-3 w-40"
                />

                <span className="flex flex-1 flex-row items-end">
                    <span className="text-md text-gray-400 font-semibold animate-pulse">
                        <StatusDisplay />
                    </span>
                    {/* <Loading variant="dots" className="ml-2" /> */}
                </span>
            </div>
        </div>
    )
}
