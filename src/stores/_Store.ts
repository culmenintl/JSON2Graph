import createAppSlice, { AppSlice } from "./_AppSlice"
import createDataSlice, { DataSlice } from "./_DataStore"
import { StoreApi, create } from "zustand"
import { devtools, persist } from "zustand/middleware"
import { immer } from "zustand/middleware/immer"
import { STORAGE } from "../lib/Constants"
// import createUserSlice, { UserSlice } from "./user/UserSlice"

// export type StoreState = AppSlice & UserSlice
export type StoreState = AppSlice & DataSlice
export type StoreSlice<T> = (
    set: StoreApi<StoreState>["setState"],
    get: StoreApi<StoreState>["getState"],
) => T

const useStore = create<StoreState>()(
    persist(
        devtools(
            immer((...a) => {
                return {
                    ...createAppSlice(...a),
                    ...createDataSlice(...a),
                }
            }),
            { name: "devtools" },
        ),
        { name: STORAGE },
    ),
)

export default useStore
