import { FC } from "react"
import { Badge } from "react-daisyui"
import { useTrackedStore } from "../../stores/Store"
import { getColorFromNodeConfig } from "../../lib/Utils"

export const LegendComponent: FC<{}> = () => {
    const dataset = useTrackedStore().data.dataSet()

    return (
        <>
            {dataset && (
                <div className="w-full flex flex-1 flex-row justify-center items-center pb-2 gap-2">
                    {/* <span className="text-xs text-gray-400">Node Legend:</span> */}
                    {dataset?.nodes?.map((nodeConfig) => {
                        const color = getColorFromNodeConfig(nodeConfig)
                        return (
                            <Badge
                                color="primary"
                                style={{ color: `${color}` }}
                                outline
                                key={nodeConfig.label}
                            >
                                {nodeConfig.label}
                            </Badge>
                        )
                    })}
                </div>
            )}
        </>
    )
}
