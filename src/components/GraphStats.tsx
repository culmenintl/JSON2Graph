import { FC } from "react"
import Button from "./Button"
import { observer } from "mobx-react-lite"
import { RootStoreModel } from "../stores/RootStore"
import useInject from "../hooks/useInject"
import { useSigma } from "@react-sigma/core"
import { GraphRow } from "./GraphRow"
import DevPanelHeader from "./DevPanelHeader"
import ToggleSwitch from "./Switch"
import { GraphInput } from "./GraphInput"
import useStore from "../stores/_Store"

const mapStore = ({ graphStore }: RootStoreModel) => ({
    graphStore,
})

const SampleJsonData = (data: Object) => (
    <pre>{JSON.stringify(data, null, 2)}</pre>
)

const GraphStats: FC<{}> = observer(() => {
    const sigma = useSigma()
    const { graphStore } = useInject(mapStore)

    const { rows, setRows, dataSet } = useStore()
    return (
        <>
            <DevPanelHeader
                title="Graph Information"
                subtitle="Attributes and settings for the displayed graph"
            />
            <GraphRow label="Description" value={dataSet.description} />
            <GraphInput
                label="Rows"
                type={"number"}
                value={rows}
                onChange={setRows}
            />
            <GraphRow
                label="Nodes"
                value={graphStore.graph?.order.toString()}
            />
            <GraphRow label="Edges" value={graphStore.graph?.size.toString()} />
            <GraphRow
                label="Rows of Data"
                value={dataSet.data?.length.toString()}
            />
            <GraphRow
                label="Sample Data Row"
                preRendered={SampleJsonData(
                    dataSet.data ? (dataSet.data[0] as Object) : {},
                )}
            />
            <GraphRow label="Graph Type" value={graphStore.graph?.type} />
            <GraphRow
                label="Parallel Edges"
                value={new String(graphStore.graph?.multi)}
            />
            <GraphRow
                label="Allows Self Loops"
                value={new String(graphStore.graph?.allowSelfLoops)}
            />
            <GraphRow
                label="Self Loops Count"
                value={new String(graphStore.graph?.selfLoopCount)}
            />
            <GraphRow
                label="WebWorker Simulation"
                value={
                    <ToggleSwitch
                        sr="WebWorker Simulation"
                        disabled={true}
                        enabled={graphStore.settings.webWorkerLayout}
                        onChange={() =>
                            graphStore.settings.toggleWebWorkerLayout()
                        }
                    />
                }
            />
            <GraphRow
                label="Simulation Time"
                value={`${graphStore.settings.runLayoutInMs.toString()}ms`}
            />
            <GraphRow
                label="Crop Non Connected"
                value={
                    <ToggleSwitch
                        sr="Crop Non Connected"
                        enabled={graphStore.settings.crop}
                        onChange={() => graphStore.settings.toggleCropped()}
                    />
                }
            />
            <DevPanelHeader
                title="Graph Metrics"
                subtitle={"Compute Graph Metrics using Graphology Utilities"}
            />
            <GraphRow
                label="Graph Stats"
                value={
                    <Button
                        text={"Compute Stats"}
                        onClick={() => {
                            console.log("computing stats")
                            graphStore.setStats(graphStore.graph)
                        }}
                    />
                }
            />
            {graphStore.stats.map((val, index) => (
                // rome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                <GraphRow label={val.name} value={val.val} key={index} />
            ))}

            {/* <div className="self-start px-4 py-5 sm:px-6">
                <h3 className="text-left text-lg font-medium leading-6 text-gray-900">
                    Data
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                    Attributes and settings for the displayed graph data
                </p>
            </div> */}

            {/* {dataStore.nodeAttributes.map((attribute, index) => {
                return (
                    <GraphRow
                        label={`Node Attribute #${index + 1}`}
                        value={attribute}
                        key={attribute}
                    />
                );
            })}
            {dataStore.edgeAttributes.map((attribute, index) => {
                return (
                    <GraphRow
                        label={`Edge Attribute #${index + 1}`}
                        preRendered={SampleJsonData(attribute)}
                        key={index}
                    />
                );
            })} */}
        </>
    )
})

export default GraphStats
