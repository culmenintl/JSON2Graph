import { Table, Toggle, Range } from "react-daisyui"
import { BaseModalPanel } from "./BaseModalPanel"
import { actions, useTrackedStore } from "../../stores/Store"
import { debounce } from "lodash"

export const GraphPanel: React.FC = () => {
    const rowsToSample = useTrackedStore().data.rowsToSample()
    const rowsLimit = useTrackedStore().data.totalRows()

    const clusteringLimit = useTrackedStore().graph.clusteringLimit()
    const clusteringEnabled = useTrackedStore().graph.clusteringEnabled()

    // filter nodes by degree
    const filteringLimit = useTrackedStore().graph.filteringLimit()

    const hoverMode = useTrackedStore().pref.hoverMode()

    const debounceFetchData = debounce(actions.data.fetchData, 2000)
    const debounceFilterGraphByDegree = debounce(
        actions.graph.filterGraphByDegree,
        2000,
    )
    return (
        <BaseModalPanel>
            <div className="pl-4 prose mb-10">
                <h1 className="">Graph Settings</h1>
            </div>
            <Table>
                <Table.Body>
                    <Table.Row>
                        <div className="flex flex-1 flex-col justify-center prose">
                            <span className="">Clustering</span>
                            <span className="text-xs font-normal text-gray-400">
                                Enabling clustering will group nodes with a
                                colored background
                            </span>
                        </div>

                        <Toggle
                            checked={clusteringEnabled}
                            onChange={() => {
                                actions.graph.clusteringEnabled(
                                    !clusteringEnabled,
                                )
                                debounceFetchData()
                            }}
                        />
                    </Table.Row>

                    <Table.Row>
                        <div className="flex flex-1 flex-col justify-center prose">
                            <span className="">
                                Cluster Limit: {clusteringLimit}
                            </span>
                            <span className="text-xs font-normal text-gray-400">
                                Number of clusters to show
                            </span>
                        </div>
                        <Range
                            disabled={!clusteringEnabled}
                            min={0}
                            max={5}
                            value={clusteringLimit}
                            onChange={(val: any) => {
                                actions.graph.clusteringLimit(val.target.value)
                                debounceFetchData()
                            }}
                        />
                    </Table.Row>

                    <Table.Row>
                        <div className="flex flex-1 flex-col justify-center prose">
                            <span>Hover Mode</span>
                            <span className="text-xs font-normal text-gray-400">
                                Hovering over a node will show the node's
                                metadata
                            </span>
                        </div>

                        <Toggle
                            checked={hoverMode}
                            onChange={() => {
                                actions.pref.hoverMode(!hoverMode)
                            }}
                        />
                    </Table.Row>

                    <Table.Row>
                        <div className="flex flex-1 flex-col justify-center prose">
                            <span>Filter by degree: {filteringLimit}</span>
                            <span className="text-xs font-normal text-gray-400">
                                Remove nodes with less than the specified number
                                of degrees
                            </span>
                        </div>
                        <Range
                            min={0}
                            max={5}
                            value={filteringLimit}
                            onChange={(val: any) => {
                                actions.graph.filteringLimit(val.target.value)
                                debounceFilterGraphByDegree()
                            }}
                        />
                    </Table.Row>
                    <Table.Row>
                        <div className="flex flex-1 flex-col justify-center prose">
                            <span className="">
                                Sampled Rows: {rowsToSample}/{rowsLimit}
                            </span>
                            <span className="text-xs font-normal text-gray-400">
                                Sampling rows will speed up the graph creation
                                when working with large datasets. Rows are
                                randomly sampled from the dataset.
                            </span>
                        </div>
                        <Range
                            min={0}
                            max={rowsLimit}
                            step={Math.round(rowsLimit * 0.2)}
                            value={rowsToSample}
                            onChange={(val: any) => {
                                actions.data.rowsToSample(val.target.value)
                                debounceFetchData()
                            }}
                        />
                    </Table.Row>
                </Table.Body>
            </Table>
        </BaseModalPanel>
    )
}
