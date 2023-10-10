import { Card, Table, Toggle, Range } from "react-daisyui"
import { BaseModalPanel } from "./BaseModalPanel"
import { actions, store, useTrackedStore } from "../../stores/Store"

export const GraphPanel: React.FC = () => {
    const rowsToSample = useTrackedStore().data.rowsToSample()
    const rowsLimit = useTrackedStore().data.totalRows()

    const clusteringLimit = useTrackedStore().graph.clusteringLimit()
    const clusteringEnabled = useTrackedStore().graph.clusteringEnabled()

    // filter nodes by degree
    const filterGraphByDegree = useTrackedStore().graph.filterGraphByDegree()
    const filteringLimit = useTrackedStore().graph.filteringLimit()

    const hoverMode = useTrackedStore().pref.hoverMode()
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
                                actions.data.fetchData()
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
                            max={10}
                            value={clusteringLimit}
                            onChange={(val: any) => {
                                if (val.target.value === clusteringLimit) return
                                actions.graph.clusteringLimit(val.target.value)
                                actions.data.fetchData()
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
                            disabled={!filterGraphByDegree}
                            min={0}
                            max={store.data.totalRows()}
                            value={filteringLimit}
                            onChange={(val: any) => {
                                // console.log(
                                //     "changing filter limit",
                                //     val.target.value,
                                // )
                                actions.graph.filteringLimit(val.target.value)
                            }}
                            onBlur={(val: any) => {
                                // console.log("onblur", val.target.value)
                                actions.graph.filterGraphByDegree(
                                    val.target.value,
                                )
                                // actions.data.fetchData()
                            }}
                        />
                    </Table.Row>
                    <Table.Row>
                        <div className="flex flex-1 flex-col justify-center prose">
                            <span>Sample Rows</span>
                            <span className="text-xs font-normal text-gray-400">
                                Sampling rows will speed up the graph creation
                                when working with large datasets
                            </span>
                        </div>

                        <Toggle
                            checked={rowsToSample !== 0}
                            onChange={() =>
                                actions.data.rowsToSample(
                                    rowsToSample === 0 ? 200 : 0,
                                )
                            }
                            color="primary"
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
                            value={rowsToSample}
                            onChange={(val: any) => {
                                actions.data.rowsToSample(val.target.value)
                                // actions.data.fetchData()
                            }}
                        />
                    </Table.Row>
                </Table.Body>
            </Table>
        </BaseModalPanel>
    )
}
