import { StoreApi, create } from "zustand"
import { devtools } from "zustand/middleware"
import createAppSlice, { AppSlice } from "./_AppSlice"
import createDataSlice, { DataSlice } from "./_DataStore"
import { immer } from "zustand/middleware/immer"
// import createUserSlice, { UserSlice } from "./user/UserSlice"

// export type StoreState = AppSlice & UserSlice
export type StoreState = AppSlice & DataSlice
export type StoreSlice<T> = (
    set: StoreApi<StoreState>["setState"],
    get: StoreApi<StoreState>["getState"],
) => T

const useStore = create<StoreState>()(
    devtools(
        immer((...a) => {
            return {
                ...createAppSlice(...a),
                ...createDataSlice(...a),
            }
        }),
        { name: "devtools" },
    ),
)

export default useStore
