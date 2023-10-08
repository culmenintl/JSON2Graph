import { Graph } from "@antv/g6"
import { ApisType } from "@antv/graphin/lib/apis/types"
import { createStore } from "@udecode/zustood"

interface State {
    // graph ref for Graphin
    graphRef: Graph | undefined

    // Graphin apis
    graphinApis: ApisType | undefined
}

const initialState: State = {
    graphRef: undefined,
    graphinApis: undefined,
}

export const GraphinRefStore = createStore("GraphinRef")(
    { ...initialState },
    {
        devtools: { enabled: false },
    },
)
