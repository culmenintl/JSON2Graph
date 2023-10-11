import { FC } from "react"
import { Dropdown } from "react-daisyui"
import { ThemesArray } from "../../lib/AppTypes"
import { ThemeItem } from "./ThemeItem"

/**
 * A component that allows the user to switch between light and dark themes.
 */
export const ThemeSwitcher: FC = () => {
    return (
        <>
            <Dropdown vertical="top">
                <Dropdown.Toggle button={true}>
                    Change Theme
                    {/* rome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
                    <svg
                        width="12px"
                        height="12px"
                        className="h-2 w-2 fill-current opacity-60"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 2048 2048"
                    >
                        <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z" />
                    </svg>
                </Dropdown.Toggle>
                <Dropdown.Menu className="grid grid-cols-1 w-52 max-h-96 overflow-y-auto">
                    {ThemesArray.map((t, i) => {
                        return (
                            // rome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                            <Dropdown.Item key={i}>
                                <ThemeItem name={t} />
                            </Dropdown.Item>
                        )
                    })}
                </Dropdown.Menu>
            </Dropdown>
        </>
    )
}

export default ThemeSwitcher
