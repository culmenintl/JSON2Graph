import { mapValuesKey } from "@udecode/zustood"
import { AppStore } from "./AppStore"
import { DataStore } from "./DataStore"
import { GraphStore } from "./GraphStore"
import { GraphinRefStore } from "./GraphinRefStore"
import { PreferencesStore } from "./PreferencesStore"

// Global store
export const rootStore = {
    app: AppStore,
    pref: PreferencesStore,
    data: DataStore,
    graph: GraphStore,
    graphinRef: GraphinRefStore,
}

// Global hook selectors
export const useStore = () => mapValuesKey("use", rootStore)

// Global tracked hook selectors
export const useTrackedStore = () => mapValuesKey("useTracked", rootStore)

// Global getter selectors
export const store = mapValuesKey("get", rootStore)

// Global actions
export const actions = mapValuesKey("set", rootStore)
