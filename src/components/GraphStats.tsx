import { FC } from 'react';
import Button from './Button';
import { observer } from 'mobx-react-lite';
import { RootStoreModel } from '../stores/RootStore';
import useInject from '../hooks/useInject';
import { useSigma } from '@react-sigma/core';
import { GraphRow } from './GraphRow';
import DevPanelHeader from './DevPanelHeader';
import ToggleSwitch from './Switch';

const mapStore = ({ appStore, dataStore }: RootStoreModel) => ({
    dataStore,
});

const SampleJsonData = (data: Object) => (
    <pre>{JSON.stringify(data, null, 2)}</pre>
);

const GraphStats: FC<{}> = observer(() => {
    const sigma = useSigma();
    const graph = sigma.getGraph();
    const { dataStore } = useInject(mapStore);
    return (
        <>
            <DevPanelHeader
                title="Graph Information"
                subtitle="Attributes and settings for the displayed graph"
            />
            <GraphRow label="Description" value={dataStore.desc} />
            <GraphRow label="Nodes" value={graph.order.toString()} />
            <GraphRow label="Edges" value={graph.size.toString()} />
            <GraphRow label="Type" value={graph.type} />
            <GraphRow label="Parallel Edges" value={new String(graph.multi)} />
            <GraphRow
                label="Allows Self Loops"
                value={new String(graph.allowSelfLoops)}
            />
            <GraphRow
                label="Self Loops Count"
                value={new String(graph.selfLoopCount)}
            />
            <GraphRow
                label="WebWorker Simulation"
                value={
                    <ToggleSwitch
                        sr="WebWorker Simulation"
                        disabled={true}
                        enabled={dataStore.graph.settings.webWorkerLayout}
                        onChange={() =>
                            dataStore.graph.settings.toggleWebWorkerLayout()
                        }
                    />
                }
            />
            <GraphRow
                label="Simulation Time"
                value={dataStore.graph.settings.runLayoutInMs.toString() + 'ms'}
            />
            <GraphRow
                label="Crop Non Connected"
                value={
                    <ToggleSwitch
                        sr="Crop Non Connected"
                        enabled={dataStore.graph.settings.crop}
                        onChange={() =>
                            dataStore.graph.settings.toggleCropped()
                        }
                    />
                }
            />
            <DevPanelHeader
                title="Graph Metrics"
                subtitle={'Compute Graph Metrics using Graphology Utilities'}
            />
            <GraphRow
                label="Graph Stats"
                value={
                    <Button
                        text={'Compute Stats'}
                        onClick={() => {
                            console.log('computing stats');
                            dataStore.graph.setStats(graph);
                        }}
                    />
                }
            />
            {dataStore.graph.stats.map((val, index) => (
                <GraphRow label={val.name} value={val.val} key={index} />
            ))}

            <div className="self-start px-4 py-5 sm:px-6">
                <h3 className="text-left text-lg font-medium leading-6 text-gray-900">
                    Data
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                    Attributes and settings for the displayed graph data
                </p>
            </div>
            <GraphRow label="Rows of Data" value={dataStore.rows.toString()} />
            <GraphRow
                label="Sample Data Row"
                pre={SampleJsonData(dataStore.data[0])}
            />
            {dataStore.nodeAttributes.map((attribute, index) => {
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
                        pre={SampleJsonData(attribute)}
                        key={index}
                    />
                );
            })}
        </>
    );
});

export default GraphStats;
