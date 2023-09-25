import { createStore } from "@udecode/zustood"
// @ts-ignore
import daisyuiColors from "daisyui/src/theming/themes"
import { STATUS, ThemeColors } from "../lib/AppTypes"

import { stripAndCamelCase } from "../lib/Utils"

// import daisyuiColors from "react-daisyui/dist/defaultThemes"

// console.log("daisyuiColors", daisyuiColors)

const initTheme = "light"

interface State {
    devMode: boolean
    status: STATUS
    loading: boolean
    theme: string
    menuOpen: boolean
    colors: ThemeColors
}

const initialState: State = {
    // app state
    loading: false,
    devMode: false,
    menuOpen: false,
    status: STATUS.FETCHING,
    theme: initTheme,
    colors: stripAndCamelCase(daisyuiColors)[`${initTheme}`],
}

export const AppStore = createStore("App")(
    { ...initialState },
    {
        devtools: { enabled: true },
    },
)
