import { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { RootStoreModel } from '../stores/RootStore';
import useInject from '../hooks/useInject';
import Loading from './Loading';

const mapStore = ({ appStore, dataStore, graphStore }: RootStoreModel) => ({
    appStore,
    dataStore,
    graphStore,
});

const StatusDisplay: FC<{}> = observer(() => {
    const { appStore, dataStore, graphStore } = useInject(mapStore);
    return (
        <div className="flex flex-grow gap-1">
            <div className="my-auto w-5 items-center justify-center">
                {(appStore.loading || graphStore.isSimulating) && (
                    <Loading size={5} />
                )}
            </div>
            <div className="flex flex-1">
                <div className="flex flex-col">
                    <span
                        className={`text-md text-gray-500 ${
                            (appStore.loading || graphStore.isSimulating) &&
                            'animate-pulse'
                        }`}
                    >
                        {appStore.status}
                    </span>
                </div>
            </div>
        </div>
    );
});

export default StatusDisplay;
