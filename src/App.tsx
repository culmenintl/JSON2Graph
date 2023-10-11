import { Root } from "./components/Root"

// notistack snackbar
import { SnackbarProvider } from "notistack"

import { actions, useTrackedStore } from "./stores/Store"
import { useEffect } from "react"

// padding bottom so the error tray is above the tool tray
function App() {
    const theme = useTrackedStore().pref.theme()
    const nodeTheme = useTrackedStore().pref.nodeTheme()
    const graphRef = useTrackedStore().graphinRef.graphRef()

    useEffect(() => {
        document.body.dataset.theme = theme
    }, [theme])

    useEffect(() => {
        actions.pref.setNodeColors(nodeTheme)
        actions.data.fetchData()
    }, [nodeTheme])

    return (
        <div className="flex h-screen min-h-screen flex-col items-center justify-center">
            <SnackbarProvider
                anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
                classes={{ containerRoot: "pb-36" }}
                maxSnack={5}
                autoHideDuration={3000}
            >
                <Root />
            </SnackbarProvider>
        </div>
    )
}

export default App
