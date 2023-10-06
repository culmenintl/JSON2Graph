import { Root } from "./components/Root"

// notistack snackbar
import { SnackbarProvider } from "notistack"

import { useTrackedStore } from "./stores/Store"
import { useEffect } from "react"

// padding bottom so the error tray is above the tool tray
function App() {
    const theme = useTrackedStore().pref.theme()

    useEffect(() => {
        document.body.dataset.theme = theme
    }, [theme])
    return (
        <div className="flex h-screen min-h-screen flex-col items-center justify-center">
            <SnackbarProvider
                anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
                classes={{ containerRoot: "pb-16" }}
                maxSnack={5}
                autoHideDuration={3000}
            >
                <Root />
            </SnackbarProvider>
        </div>
    )
}

export default App
