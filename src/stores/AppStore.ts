import { createStore } from "@udecode/zustood"
// @ts-ignore
import daisyuiColors from "daisyui/src/theming/themes"
import { STATUS, ThemeColors } from "../lib/AppTypes"

import { stripAndCamelCase } from "../lib/Utils"

const initTheme = "light"

interface State {
    devMode: boolean
    status: STATUS
    loading: boolean
    menuOpen: boolean
    colors: ThemeColors
}

const initialState: State = {
    loading: false,
    devMode: false,
    menuOpen: false,
    status: STATUS.FETCHING,
    colors: stripAndCamelCase(daisyuiColors)[`${initTheme}`],
}

export const AppStore = createStore("App")(
    { ...initialState },
    {
        devtools: { enabled: true },
    },
)
