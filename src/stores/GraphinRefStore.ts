import G6, { Graph, GraphData, LayoutConfig } from "@antv/g6";
import { createStore } from "@udecode/zustood";

interface State {
  // graph ref for Graphin
  graphRef: any;

  // Graphin apis
  graphinApis: any;
}

const initialState: State = {
  graphRef: undefined,
  graphinApis: undefined,
};

export const GraphinRefStore = createStore("GraphinRef")(
  { ...initialState },
  {
    devtools: { enabled: false },
  }
);
