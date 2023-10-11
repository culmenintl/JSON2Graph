import { Root } from "./components/Root"

// notistack snackbar
import { SnackbarProvider } from "notistack"

import { actions, useTrackedStore } from "./stores/Store"
import { useEffect } from "react"
import { getColorFromNodeConfig } from "./lib/Utils"
import { ExtendedNode } from "./lib/AppTypes"

// padding bottom so the error tray is above the tool tray
function App() {
    const theme = useTrackedStore().pref.theme()
    const nodeTheme = useTrackedStore().pref.nodeTheme()
    const graphRef = useTrackedStore().graphinRef.graphRef()
    const config = useTrackedStore().data.dataSet()

    // set theme when theme changes
    useEffect(() => {
        document.body.dataset.theme = theme
    }, [theme])

    // set node colors when nodeTheme changes
    useEffect(() => {
        actions.pref.setNodeColors(nodeTheme)

        graphRef?.getNodes().forEach((node) => {
            // console.log(node)
            // if node label matches config label, set color
            const configNode = config?.nodes?.find(
                (configNode) =>
                    configNode.label ===
                    (node.getModel() as ExtendedNode)._metadata._type,
            )
            // console.log("configNode", configNode)
            if (!configNode) return
            node.update({
                style: {
                    keyshape: {
                        fill: getColorFromNodeConfig(configNode),
                    },
                },
            })
        })
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
