import { FC, useEffect } from 'react';
import Button from './Button';
import { observer } from 'mobx-react-lite';
import { RootStoreModel } from '../stores/RootStore';
import useInject from '../hooks/useInject';
import { GraphRow } from './GraphRow';
import DevPanelHeader from './DevPanelHeader';
import ToggleSwitch from './Switch';
import { GraphInput } from './GraphInput';
import { DatasetSelect } from './DatasetSelect';
import { useSigma } from '@react-sigma/core';

const mapStore = ({ graphStore, dataStore, appStore }: RootStoreModel) => ({
    graphStore,
    dataStore,
    appStore,
});

const SampleJsonData = (data: Object) => (
    <pre>{JSON.stringify(data, null, 2)}</pre>
);

const GraphStats: FC<{}> = observer(() => {
    const { dataStore, graphStore, appStore } = useInject(mapStore);
    if (!dataStore.dataSet[dataStore.datasetIndex].data) {
        return <></>;
    }
    const sigma = useSigma();

    // @logan for some reason this seems to have the graph recalculate nodes/edges correctly on simulation. This is so the nodes/edges correctly update when the graph is manually reloaded.
    useEffect(() => {
        if (!dataStore.dataSet || !graphStore.graph) {
            return;
        }
        const nodes = sigma.getGraph().order.toString();
        const edges = sigma.getGraph().size.toString();
        // console.log('nodes', nodes);
        // console.log('edges', edges);
    }, [graphStore.isSimulating]);

    return (
        <>
            <DevPanelHeader
                title="Graph Information"
                subtitle="Attributes and settings for the displayed graph"
            />
            <GraphRow label="Dataset" value={<DatasetSelect />} />
            <GraphRow
                label="Description"
                value={dataStore.dataSet[dataStore.datasetIndex].description}
            />
            <GraphInput
                label="Target # Rows"
                type={'number'}
                value={dataStore.rows}
                onChange={dataStore.setRows}
            />
            <GraphRow
                label="Rows randomly selected"
                value={dataStore.dataSet[
                    dataStore.datasetIndex
                ].data.length.toString()}
            />
            <GraphRow label="Nodes" value={sigma.getGraph().order.toString()} />
            <GraphRow label="Edges" value={sigma.getGraph().size.toString()} />
            <GraphRow
                label="Sample Data Row"
                preRendered={SampleJsonData(
                    dataStore.dataSet[dataStore.datasetIndex].data[0]
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
                value={graphStore.settings.runLayoutInMs.toString() + 'ms'}
            />
            <GraphRow
                label="Crop Non Connected"
                value={
                    <ToggleSwitch
                        sr="Crop Non Connected"
                        enabled={graphStore.settings.crop}
                        onChange={() => {
                            appStore.toggleDevMode();
                            graphStore.settings.toggleCropped();
                        }}
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
                            // console.log('computing stats');
                            graphStore.setStats(graphStore.graph);
                        }}
                    />
                }
            />
            {graphStore.stats.map((val, index) => (
                <GraphRow label={val.name} value={val.val} key={index} />
            ))}
        </>
    );
});

export default GraphStats;
