import { createStore } from "@udecode/zustood"

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

export const AppStore = createStore("App")(
    { ...initialState },
    {
        devtools: { enabled: true },
    },
)
