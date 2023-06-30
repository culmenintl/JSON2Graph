import { StoreState } from "./_Store"
import { produce } from "immer"
import { StateCreator } from "zustand"

export enum STATUS {
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
    setLoading: (value: boolean) => void
    toggleDevMode: () => void
    setStatus: (status: STATUS) => void
}

export type AppSlice = State & Actions

const createAppSlice: StateCreator<
    StoreState,
    [["zustand/devtools", never]],
    [],
    State & Actions
> = (set, get) => ({
    ...initialState,

    devMode: false,
    status: STATUS.FETCHING,
    loading: true,

    toggleDevMode: () =>
        set((state) => {
            return { devMode: !state.devMode }
        }),
    setStatus: (status: STATUS) =>
        set(
            produce((state) => {
                state.status = status
            }),
        ),
    setLoading: (loading: boolean) =>
        set(
            produce((state) => {
                state.loading = loading
            }),
        ),
})

export default createAppSlice
