import { observer } from 'mobx-react-lite';
import { FC } from 'react';
import useInject from '../hooks/useInject';
import { RootStoreModel } from '../stores/RootStore';
import DevPanelHeader from './DevPanelHeader';
import { GraphRow } from './GraphRow';

const mapStore = ({ appStore }: RootStoreModel) => ({
    appStore,
});

export const NodeContextPanel: FC<{}> = observer(() => {
    const { appStore } = useInject(mapStore);
    return (
        <div className="border-1 pb-18 absolute bottom-20 left-0 right-0 mx-auto flex max-h-[75vh] !max-w-xl rounded-lg border border-gray-300 bg-white/50  backdrop-blur-md lg:max-h-[25vh]">
            <div className="flex w-full flex-col !overflow-y-auto overflow-x-hidden !scroll-smooth">
                <DevPanelHeader
                    title={appStore.targetNode?.label}
                    subtitle={appStore.targetNode?.clusterLabel}
                />
                {Object.entries(appStore.targetNode).map(([key, val]) => {
                    // checks if object, which throws an error if displayed, currently only displays top level values
                    if (typeof val == 'object') {
                        return null;
                    }
                    return <GraphRow label={key} value={val} key={key} />;
                })}
            </div>
        </div>
    );
});
