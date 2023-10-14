import { createStore } from "@udecode/zustood"
// @ts-ignore
import daisyuiColors from "daisyui/src/theming/themes"
import { STATUS, ThemeColors } from "../lib/AppTypes"

import { stripAndCamelCase } from "../lib/Utils"
import { enqueueSnackbar } from "notistack"

interface State {
    devMode: boolean
    status: STATUS | undefined
    loading: boolean
    menuOpen: boolean
    panelNavigation: "data" | "graph" | "settings"
    showChangelog: boolean
    changelog: string
}

const initialState: State = {
    loading: false,
    devMode: false,
    menuOpen: false,
    status: STATUS.FETCHING,
    panelNavigation: "data",
    showChangelog: false,
    changelog: "",
}

export const AppStore = createStore("App")(
    { ...initialState },
    {
        devtools: { enabled: true },
    },
).extendActions((set, get, api) => ({
    fetchChangelog: async () => {
        try {
            fetch("/CHANGELOG.md")
                .then((response) => response.text())
                .then((text) => set.changelog(text))
        } catch (error) {
            enqueueSnackbar("Error fetching changelog", { variant: "error" })
        }
    },
}))
