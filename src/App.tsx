import Root from "./components/Root"

// notistack snackbar
import { SnackbarProvider } from "notistack"

// padding bottom so the error tray is above the tool tray
function App() {
    return (
        <div className="flex h-screen min-h-screen flex-col items-center justify-center">
            <SnackbarProvider
                anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
                classes={{ containerRoot: "pb-16" }}
                maxSnack={5}
                autoHideDuration={1500}
            >
                <Root />
            </SnackbarProvider>
        </div>
    )
}

export default App
