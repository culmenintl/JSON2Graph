import { createStore } from "@udecode/zustood"
import daisyuiColors from "daisyui/src/theming/themes"
import { ThemeColors } from "../lib/AppTypes"

import { stripAndCamelCase } from "../lib/Utils"

interface State {
    theme: string
    nodeTheme: string
    colors: ThemeColors | undefined
    aiMappingEnabled: boolean

    // graph pref
    hoverMode: boolean

    // sampledRows
    rowsToSample: number
}

const initialState: State = {
    // app state
    theme: "light",
    nodeTheme: "light",
    // colors: stripAndCamelCase(daisyuiColors)[`${"light"}`],
    colors: undefined,
    aiMappingEnabled: false,

    // graph pref
    hoverMode: false,
    rowsToSample: 1000,
}

export const PreferencesStore = createStore("Preferences")(
    { ...initialState },
    {
        devtools: { enabled: true },
        persist: {
            enabled: true,
            name: "Preferences",
        },
    },
).extendActions((set, get, api) => ({
    setNodeColors: (theme: string) => {
        set.nodeTheme(theme)
        const colors = stripAndCamelCase(daisyuiColors)[`${theme}`]
        set.colors(colors)
    },
}))
