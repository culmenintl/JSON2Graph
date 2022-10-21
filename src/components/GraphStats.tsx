import { FC } from 'react';
import Button from './Button';
import { observer } from 'mobx-react-lite';
import { RootStoreModel } from '../stores/RootStore';
import useInject from '../hooks/useInject';
import { useSigma } from '@react-sigma/core';

const mapStore = ({ appStore, dataStore }: RootStoreModel) => ({
    dataStore,
});

const GraphStats: FC<{}> = observer(() => {
    const sigma = useSigma();
    const graph = sigma.getGraph();
    const { dataStore } = useInject(mapStore);
    return (
        <div className="">
            <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                    Graph
                </h3>
                <Button
                    text={'Compute Stats'}
                    onClick={() => {
                        console.log('computing stats');
                        dataStore.graph.setStats(graph);
                    }}
                />
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                        <dt className="text-sm font-medium text-gray-500">
                            Metrics
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900">
                            <ul
                                role="list"
                                className="divide-y divide-gray-200 rounded-md border border-gray-200"
                            >
                                {dataStore.graph.stats.map((val, index) => (
                                    <li
                                        className="flex items-center justify-between py-3 pl-3 pr-4 text-sm"
                                        key={index}
                                    >
                                        <div className="flex w-0 flex-1 items-start justify-start">
                                            <span className="ml-2 w-0 flex-1 truncate text-sm font-medium text-gray-500">
                                                {val.name}
                                            </span>
                                        </div>
                                        <div className="ml-4 flex-shrink-0">
                                            <span className=" text-gray-900">
                                                {val.val}
                                            </span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </dd>
                    </div>
                </dl>
            </div>
        </div>
    );
});

export default GraphStats;
