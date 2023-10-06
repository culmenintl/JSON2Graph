import { createStore } from "@udecode/zustood"
import daisyuiColors from "daisyui/src/theming/themes"
import { ThemeColors } from "../lib/AppTypes"

import { stripAndCamelCase } from "../lib/Utils"

interface State {
    theme: string
    colors: ThemeColors

    // graph pref
    hoverMode: boolean
}

const initialState: State = {
    // app state
    theme: "light",
    colors: stripAndCamelCase(daisyuiColors)[`${"light"}`],

    // graph pref
    hoverMode: true,
}

export const PreferencesStore = createStore("Preferences")(
    { ...initialState },
    {
        devtools: { enabled: true },
        persist: {
            enabled: true,
            name: "Pref",
        },
    },
)
