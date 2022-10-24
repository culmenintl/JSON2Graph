import { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { RootStoreModel } from '../stores/RootStore';
import useInject from '../hooks/useInject';
import Loading from './Loading';

const mapStore = ({ appStore }: RootStoreModel) => ({
    appStore,
});

const StatusDisplay: FC<{}> = observer(() => {
    const { appStore } = useInject(mapStore);
    console.log('rendering');
    return (
        <div className="flex flex-grow pl-3">
            <div className="flex flex-1">
                <div className="flex flex-col">
                    <span className="text-md text-gray-400">
                        {appStore.status}
                    </span>
                </div>
            </div>

            <div className="flex justify-self-end pr-3">
                {appStore.loading && <Loading size={5} />}
            </div>
        </div>
    );
});

export default StatusDisplay;
