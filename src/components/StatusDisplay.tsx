import useInject from "../hooks/useInject"
import { RootStoreModel } from "../stores/RootStore"
import useStore from "../stores/_Store"
import Loading from "./Loading"
import { observer } from "mobx-react-lite"
import { FC } from "react"

const mapStore = ({ graphStore }: RootStoreModel) => ({
    graphStore,
})

const StatusDisplay: FC<{}> = observer(() => {
    const { graphStore } = useInject(mapStore)
    const { loading, status } = useStore((state) => state)
    return (
        <div className="flex flex-grow gap-1">
            <div className="my-auto w-5 items-center justify-center">
                {(loading || graphStore.isSimulating) && <Loading size={5} />}
            </div>
            <div className="flex flex-1">
                <div className="flex flex-col">
                    <span
                        className={`text-md text-gray-500 ${
                            (loading || graphStore.isSimulating) &&
                            "animate-pulse"
                        }`}
                    >
                        {status}
                    </span>
                </div>
            </div>
        </div>
    )
})

export default StatusDisplay
