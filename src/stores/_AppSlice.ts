import Graphin, { GraphinContextType } from "@antv/graphin"
import { StoreState } from "./_Store"
import { StateCreator } from "zustand"
import React from "react"
import { STORAGE } from "../lib/Constants"

export enum STATUS {
    DONE = "Done",
    FETCHING = "Fetching Data",
    SHAPING = "Creating Graph",
    SIMULATING = "Simulating...",
    GRAPH_SIMULATED = "Graph Simulated",
}

interface State {
    devMode: boolean
    status: STATUS
    loading: boolean
}

const initialState: State = {
    // app state
    loading: false,
    devMode: false,
    status: STATUS.FETCHING,
}

interface Actions {
    // drop actions
    toggleDevMode: () => void
    toggleLayout: (ctx: GraphinContextType) => void
    setStatus: (status: STATUS, loading: boolean) => void
    reset: () => void
    clearLocalStorage: () => void
}

export type AppSlice = State & Actions

const createAppSlice: StateCreator<
    StoreState,
    [["zustand/immer", never], ["zustand/devtools", never]],
    [],
    AppSlice
> = (set, get) => ({
    ...initialState,

    devMode: false,
    status: STATUS.FETCHING,
    loading: true,

    toggleDevMode: () =>
        set(
            (state) => {
                return { devMode: !state.devMode }
            },
            false,
            "toggleDevMode",
        ),
    setStatus: (status: STATUS, loading: boolean) =>
        set(
            (state) => {
                state.status = status
                state.loading = loading
            },
            false,
            "setStatus",
        ),
    toggleLayout: (ctx: GraphinContextType) =>
        set(
            (state) => {
                const { layout } = ctx
                console.log("toggleLayout", layout)
                // layout.processForce()
            },
            false,
            "toggleLayout",
        ),
    clearLocalStorage: () => {
        get().reset()
        window.localStorage.removeItem(STORAGE)
    },
    reset: () => set(() => initialState, false, "reset"),
})

export default createAppSlice
