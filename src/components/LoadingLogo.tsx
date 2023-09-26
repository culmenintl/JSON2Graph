import { FC } from "react"

type Props = {
    size?: number
    iconOnly?: boolean
}

import CentrifugeLogoCentered from "/images/cent-logo-centered.svg"
import CentrifugeText from "/images/centrifuge-text.svg"
import { useTrackedStore } from "../stores/Store"
import { Loading } from "react-daisyui"

// Basic fullscreen loading animation w/ centrifuge logo
const LoadingLogo: FC<Props> = () => {
    return (
        <>
            <div
                role="status"
                className={
                    "flex-column absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 items-center justify-center"
                }
            >
                {/* rome-ignore lint/a11y/useAltText: <explanation> */}
                <img
                    src={CentrifugeLogoCentered}
                    className={"mx-auto h-20 w-20 animate-spin-logo"}
                />
                {/* rome-ignore lint/a11y/useAltText: <explanation> */}
                <img src={CentrifugeText} className="mt-3 w-40" />
                <span className="font-semibold text-md flex flex-1 flex-row items-end">
                    {useTrackedStore().app.status()}
                    <Loading variant="dots" className="ml-2" />
                </span>
            </div>
        </>
    )
}

export default LoadingLogo
