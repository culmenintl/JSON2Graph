import { StoreState } from "./_Store"
import { StateCreator } from "zustand"

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
    setStatus: (status: STATUS, loading: boolean) => void
}

export type AppSlice = State & Actions

const createAppSlice: StateCreator<
    StoreState,
    [["zustand/immer", never], ["zustand/devtools", never]],
    [],
    State & Actions
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
})

export default createAppSlice
