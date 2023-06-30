import Root from "./components/Root"

import { StoreProvider, createStore } from "../src/stores/RootStore"
// mobx
import makeInspectable from "mobx-devtools-mst"

const rootStore = createStore()

// console.log(import.meta.env.MODE);

// dev tooling
if (import.meta.env.MODE === "development") {
    makeInspectable(rootStore)
}

// notistack snackbar
import { SnackbarProvider } from "notistack"

// padding bottom so the error tray is above the tool tray
const paddingBottom = "pb-16"

function App() {
    return (
        <div className="flex h-screen min-h-screen flex-col items-center justify-center">
            <SnackbarProvider
                anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
                classes={{ containerRoot: paddingBottom }}
                maxSnack={3}
            >
                <StoreProvider value={rootStore}>
                    <Root />
                </StoreProvider>
            </SnackbarProvider>
        </div>
    )
}

export default App
