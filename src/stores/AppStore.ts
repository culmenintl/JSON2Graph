import { createStore } from "@udecode/zustood"
// @ts-ignore
import daisyuiColors from "daisyui/src/theming/themes"
import { STATUS, ThemeColors } from "../lib/AppTypes"

import { stripAndCamelCase } from "../lib/Utils"

const initTheme = "light"

interface State {
    devMode: boolean
    status: STATUS | undefined
    loading: boolean
    menuOpen: boolean
    colors: ThemeColors
    panelNavigation: "data" | "graph" | "settings"
}

const initialState: State = {
    loading: false,
    devMode: false,
    menuOpen: false,
    status: STATUS.FETCHING,
    colors: stripAndCamelCase(daisyuiColors)[`${initTheme}`],
    panelNavigation: "data",
}

export const AppStore = createStore("App")(
    { ...initialState },
    {
        devtools: { enabled: true },
    },
)
