import { FC } from "react"
import { Form, Input } from "react-daisyui"
import { useStore } from "../../stores/Store"

import { debounce } from "lodash"

export const SearchBar: FC<{}> = () => {
    const searchApi = useStore().data.searchApi()
    const debouncedSearch = debounce(async (value: string) => {
        console.log("searching for", value)
        const results = await searchApi.search(value)
        console.log(results)
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
