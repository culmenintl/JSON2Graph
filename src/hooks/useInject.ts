import { RootStoreModel, useStore } from "../stores/RootStore"

export type MapStore<T> = (store: RootStoreModel) => T

// basic injection helper for typescript and having many stores
const useInject = <T>(mapStore: MapStore<T>) => {
    const store = useStore()
    return mapStore(store)
}

export default useInject
