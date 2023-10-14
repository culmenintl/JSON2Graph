import { FC } from "react"
import { Badge, Dropdown } from "react-daisyui"
import { ThemesArray } from "../../lib/AppTypes"
import { ThemeItem } from "./ThemeItem"
import { useTrackedStore } from "../../stores/Store"

/**
 * A component that allows the user to switch between light and dark themes.
 */
export const ThemeSwitcher: FC = () => {
    const nodeTheme = useTrackedStore().pref.nodeTheme()
    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-10 gap-x-3">
                {ThemesArray.map((t, i) => {
                    return (
                        <div
                            key={i}
                            className="flex flex-1 flex-col items-center"
                        >
                            <ThemeItem name={t} active={t === nodeTheme} />
                            {t === nodeTheme && (
                                <div className="absolute mt-20">
                                    <Badge color="primary" size="lg">
                                        Active
                                    </Badge>
                                </div>
                            )}
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default ThemeSwitcher
