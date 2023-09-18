import { FC } from "react"
import { Divider, useTheme } from "react-daisyui"
import { useStore, useTrackedStore } from "../../stores/Store"

export const GraphStatsBar: FC<{}> = () => {
    let sampledRows = useTrackedStore().data.rowsToSample()
    const totalRows = useStore().data.totalRows()

    const nodesCount = useStore()
        .graph.graphRef()
        ?.getNodes()
        .length.toLocaleString()

    const edgesCount = useStore()
        .graph.graphRef()
        ?.getEdges()
        .length.toLocaleString()

    if (!sampledRows) {
        sampledRows = totalRows
    }

    // converts 1234 to 1.2k
    const formattedSampleRows =
        totalRows >= 1000
            ? `${Math.floor(totalRows / 1000)}k`
            : sampledRows.toString()
    console.log(formattedSampleRows) // Output: "1234k"

    return (
        <div className="flex flex-1 flex-row w-full gap-2 text-sm text-slate-400 justify-center py-3">
            <div className="">{nodesCount} nodes</div>
            <Divider horizontal />
            <div className="">{edgesCount} edges</div>
            <Divider horizontal />
            <div className="">
                {sampledRows.toLocaleString()}/{formattedSampleRows} rows
            </div>
        </div>
    )
}
