import { FC } from "react"
import { Input } from "react-daisyui"
import { actions } from "../../stores/Store"

import debounce from "lodash/debounce"

export const SearchBar: FC = () => {
    const debouncedSearch = debounce(async (value: string) => {
        console.log("searching for", value)
        await actions.data.searchNodesApi(value)
    }, 500)

    return (
        <>
            <Input
                className="flex flex-1 w-full"
                size="md"
                bordered
                type="text"
                placeholder="Search"
                onChange={(e) => {
                    debouncedSearch(e.target.value)
                }}
                onSubmit={(e) => {
                    console.log("submit", e)
                    // prevent form submission
                    e.preventDefault()
                }}
            />
        </>
    )
}
