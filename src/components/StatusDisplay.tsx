import useInject from "../hooks/useInject"
import useStore from "../stores/_Store"
import Loading from "./Loading"
import { FC } from "react"

const StatusDisplay: FC<{}> = () => {
    const { loading, status } = useStore((state) => state)
    return (
        <div className="flex flex-grow gap-1">
            {/* <div className="my-auto w-5 items-center justify-center">
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
            </div> */}
        </div>
    )
}

export default StatusDisplay
