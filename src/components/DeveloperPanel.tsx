import React, { useState, useEffect } from "react"
import { Button, Card, Table, Theme, Toggle, useTheme } from "react-daisyui"
import { actions, useTrackedStore } from "../stores/Store"

export const DeveloperPanel: React.FC = () => {
    const [showModal, setShowModal] = useState(false)
    const [lastKeyPressTime, setLastKeyPressTime] = useState(0)

    const { theme, setTheme } = useTheme()

    const userTheme = useTrackedStore().app.theme()

    useEffect(() => {
        const handleKeyPress = (event: KeyboardEvent) => {
            const currentTime = new Date().getTime()
            if (event.key === "d" && currentTime - lastKeyPressTime < 250) {
                console.log("d was pressed twice quickly")
                if (showModal) setShowModal(false)
                else setShowModal(true)
            }
            setLastKeyPressTime(currentTime)
        }

        window.addEventListener("keydown", handleKeyPress)

        return () => {
            window.removeEventListener("keydown", handleKeyPress)
        }
    }, [lastKeyPressTime])

    // method to toggle the theme
    const toggleTheme = () => {
        console.log("toggling theme", theme)
        if (theme === "light") {
            document
                .getElementsByTagName("html")[0]
                .setAttribute("data-theme", "dark")
            setTheme("dark")
            actions.app.theme("dark")
        } else {
            document
                .getElementsByTagName("html")[0]
                .setAttribute("data-theme", "light")
            setTheme("light")
            actions.app.theme("light")
        }
    }

    return (
        <>
            {showModal && (
                <div className="absolute left-10 top-10 w-full max-w-2xl overflow-hidden">
                    <Card normal className="rounded-box bg-base-100">
                        <Card.Body>
                            <div className="prose lg:prose-lg mb-10 ">
                                <h1>DevPanel</h1>
                                <p>{APP_VERSION}</p>
                            </div>
                            <Table>
                                <Table.Body>
                                    <Table.Row>
                                        <span>Theme</span>
                                        <span className="ml-auto">{theme}</span>
                                    </Table.Row>
                                    <Table.Row>
                                        <span>Nodes</span>
                                        <span className="ml-auto">X</span>
                                    </Table.Row>
                                    <Table.Row>
                                        <span>Edges</span>
                                        <span className="ml-auto">X</span>
                                    </Table.Row>
                                    <Table.Row>
                                        <span>Example Json</span>
                                        <span className="ml-auto">X</span>
                                    </Table.Row>
                                    <Table.Row>
                                        <span>Clear Local Cache</span>
                                        <span className="ml-auto">
                                            <Button
                                                onClick={() =>
                                                    console.log(
                                                        "clearing cache",
                                                    )
                                                }
                                                color="warning"
                                                size="sm"
                                            >
                                                Clear
                                            </Button>
                                        </span>
                                    </Table.Row>
                                    <Table.Row>
                                        <span>Toggle Theme</span>
                                        <Toggle
                                            checked={userTheme === "dark"}
                                            onChange={() => toggleTheme()}
                                        />
                                    </Table.Row>
                                </Table.Body>
                            </Table>
                        </Card.Body>
                    </Card>
                </div>
            )}
        </>
    )
}

export default DeveloperPanel
