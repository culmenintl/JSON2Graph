import Root from './components/Root';

// mobx
import makeInspectable from 'mobx-devtools-mst';
import { createStore, StoreProvider } from '../src/stores/RootStore';

const rootStore = createStore();

console.log(import.meta.env.MODE);

if (import.meta.env.MODE === 'development') {
    makeInspectable(rootStore);
}

// connectReduxDevtools(remotedev, asReduxStore(rootStore));

function App() {
    return (
        <div className="text-center selection:bg-green-900">
            <header className="flex min-h-screen flex-col items-center justify-center">
                <StoreProvider value={rootStore}>
                    <Root />
                </StoreProvider>
            </header>
        </div>
    );
}

export default App;
