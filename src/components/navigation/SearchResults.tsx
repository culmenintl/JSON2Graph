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
    const truncateLength = 15

    console.log(searchResults)

    return (
        <>
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
                            </Table>
                        </div>
                    )
                },
            )}
        </>
    )
}

export default SearchResults
