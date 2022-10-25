import Root from './components/Root';

// mobx
import makeInspectable from 'mobx-devtools-mst';
import { createStore, StoreProvider } from '../src/stores/RootStore';

const rootStore = createStore();

// console.log(import.meta.env.MODE);

// dev tooling
if (import.meta.env.MODE === 'development') {
    makeInspectable(rootStore);
}

// notistack snackbar
import { SnackbarProvider } from 'notistack';

// connectReduxDevtools(remotedev, asReduxStore(rootStore));

// padding bottom so the error tray is above the tool tray
const paddingBottom = 'pb-16';

function App() {
    return (
        <div className="text-center selection:bg-green-900">
            <header className="flex min-h-screen flex-col items-center justify-center">
                <SnackbarProvider
                    anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
                    classes={{ containerRoot: paddingBottom }}
                >
                    <StoreProvider value={rootStore}>
                        <Root />
                    </StoreProvider>
                </SnackbarProvider>
            </header>
        </div>
    );
}

export default App;
