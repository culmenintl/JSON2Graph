import { Switch } from "@headlessui/react"
import { useState } from "react"

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ")
}

import useInject from "../hooks/useInject"
import { RootStoreModel } from "../stores/RootStore"
import Loading from "./Loading"
import { observer } from "mobx-react-lite"
import { FC } from "react"

const mapStore = ({ appStore }: RootStoreModel) => ({
    appStore,
})

type Props = {
    sr: string
    enabled: boolean
    disabled?: boolean
    onChange?: () => void
}
const ToggleSwitch: FC<Props> = observer(
    ({ sr, enabled, onChange, disabled = false }) => {
        return (
            <Switch
                disabled={disabled}
                checked={enabled}
                onChange={onChange}
                className={classNames(
                    enabled ? "bg-indigo-600" : "bg-gray-200",
                    "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2",
                )}
            >
                <span className="sr-only">{sr}</span>
                <span
                    aria-hidden="true"
                    className={classNames(
                        enabled ? "translate-x-5" : "translate-x-0",
                        "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
                    )}
                />
            </Switch>
        )
    },
)

export default ToggleSwitch
