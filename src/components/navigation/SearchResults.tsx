import { FC } from "react"
import { Table } from "react-daisyui"
import { useStore } from "../../stores/Store"

import { IUserNode } from "@antv/graphin"
import {
    generateUniqueId as generateId,
    truncateString as truncate,
} from "../../lib/Utils"

export const SearchResults: FC<{}> = () => {
    const searchResults = useStore().data.searchResults()
    const searchValue = useStore().data.searchTerm()
    const truncateLength = 15

    // method to cound the sum of all values in the searchResults map
    const count = Array.from(searchResults?.values() ?? []).reduce(
        (acc: number, nodes: IUserNode[]) => {
            return acc + nodes.length
        },
        0,
    )

    return (
        <div className="container max-w-xl max-h-96 overflow-y-auto px-4">
            <span className="text-sm text-slate-400">
                {searchValue && `"${searchValue}" has ${count} results`}
            </span>
            {Array.from(searchResults?.values() ?? []).map(
                (nodes: IUserNode[]) => {
                    return (
                        <div key={generateId()} className="prose prose-sm">
                            <h2>{nodes[0]._metadata?._type}</h2>
                            <Table key={generateId()}>
                                <Table.Head>
                                    <span>Title</span>
                                    <span>Subtitle</span>
                                    <span>Cluster</span>
                                    <span>Body</span>
                                </Table.Head>
                                <Table.Body>
                                    {nodes.map((node: IUserNode) => (
                                        <Table.Row key={generateId()}>
                                            <span>
                                                {truncate(
                                                    node._metadata?._title,
                                                    truncateLength,
                                                )}
                                            </span>
                                            <span>
                                                {truncate(
                                                    node._metadata?._subtitle,
                                                    truncateLength,
                                                )}
                                            </span>
                                            <span>
                                                {truncate(
                                                    node._metadata?._clusterId,
                                                    truncateLength,
                                                )}
                                            </span>
                                            <span>
                                                {truncate(
                                                    node._metadata?._body,
                                                    truncateLength,
                                                )}
                                            </span>
                                        </Table.Row>
                                    ))}
                                </Table.Body>
                            </Table>
                        </div>
                    )
                },
            )}
        </div>
    )
}

export default SearchResults
