import { Button, Input, Loading, Table, Toggle } from "react-daisyui"
import { BaseModalPanel } from "./BaseModalPanel"
import { filterGraphByDegree } from "../../stores/GraphStore"
import { useTrackedStore, actions } from "../../stores/Store"

export const SettingsPanel: React.FC = () => {
    const userTheme = useTrackedStore().pref.theme()
    return (
        <BaseModalPanel>
            <div className="pl-4 prose mb-10">
                <h1 className="">App Settings</h1>
            </div>
            <Table>
                <Table.Body className="prose">
                    <Table.Row>
                        <span>
                            Theme:
                            <span className="text-2xl ml-3">
                                {userTheme === "light" ? "☀️" : "🌙"}
                            </span>
                        </span>
                        <Toggle
                            checked={userTheme === "dark"}
                            // checked={userTheme === "dark"}
                            onChange={() => {
                                const theme =
                                    userTheme === "dark" ? "light" : "dark"

                                actions.pref.theme(theme)
                            }}
                        />
                    </Table.Row>

                    <Table.Row>
                        <span>Clear Local Cache</span>
                        <span className="ml-auto">
                            <Button
                                onClick={() => console.log("clearing cache")}
                                color="warning"
                                size="sm"
                            >
                                Clear
                            </Button>
                        </span>
                    </Table.Row>
                </Table.Body>
            </Table>
        </BaseModalPanel>
    )
}
