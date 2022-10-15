import Root from './components/Root';

// mobx
import { connectReduxDevtools } from 'mst-middlewares';
import { createStore, StoreProvider } from '../src/stores/RootStore';

// layout

const rootStore = createStore();
// import remotedev from 'remotedev';

// connectReduxDevtools(require('remotedev'), rootStore);

function App() {
    return (
        <div className="text-center selection:bg-green-900">
            <header className="flex min-h-screen flex-col items-center justify-center bg-[#282c34]">
                <StoreProvider value={rootStore}>
                    <Root />
                </StoreProvider>
            </header>
        </div>
    );
}

export default App;
