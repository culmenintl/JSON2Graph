import { FC } from 'react';
import { Switch } from '@headlessui/react';
import { WrenchScrewdriverIcon } from '@heroicons/react/24/outline';
import { classNames } from '../lib/Utils';
import { observer } from 'mobx-react-lite';
import { RootStoreModel } from '../stores/RootStore';
import useInject from '../hooks/useInject';

const mapStore = ({ dataStore, appStore }: RootStoreModel) => ({
    dataStore,
    appStore,
});

export const ToggleDev: FC<{}> = observer(() => {
    const { appStore } = useInject(mapStore);
    const toggleDev = () => appStore.toggleDevMode();
    return (
        <>
            <Switch.Group
                as="div"
                className="flex items-center justify-between"
            >
                <span className="flex flex-grow flex-col">
                    <Switch.Label
                        as="span"
                        className="mr-2 text-sm font-medium text-gray-900"
                        passive
                    >
                        <WrenchScrewdriverIcon
                            className="h-5 w-5"
                            aria-hidden="true"
                        />
                    </Switch.Label>
                </span>
                <Switch
                    checked={appStore.devMode}
                    onChange={toggleDev}
                    className={classNames(
                        appStore.devMode ? 'bg-indigo-600' : 'bg-gray-200',
                        'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                    )}
                >
                    <span
                        aria-hidden="true"
                        className={classNames(
                            appStore.devMode
                                ? 'translate-x-5'
                                : 'translate-x-0',
                            'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                        )}
                    />
                </Switch>
            </Switch.Group>
        </>
    );
});
