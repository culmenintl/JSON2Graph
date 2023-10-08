import { FC, useEffect, useRef } from "react"
import { Table } from "react-daisyui"
import { store, useTrackedStore } from "../../stores/Store"

import { IUserNode } from "@antv/graphin"
import {
    generateUniqueId as generateId,
    truncateString as truncate,
} from "../../lib/Utils"

type SpanProps = {
    term?: string
    value: string
}
const SpanComponent: FC<SpanProps> = ({ term, value }) => {
    if (!value) return null

    const truncateLength = 15
    const parts = value.split(new RegExp(`(${term})`, "gi"))

    term = term?.toLowerCase()
    // only highlight the text that is the same as the search term
    return (
        <span className="inline-block">
            {parts.map((part, i) => (
                <span
                    // rome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                    key={i}
                    className={
                        part.toLowerCase() === term ?? "".toLowerCase()
                            ? "bg-yellow-200"
                            : ""
                    }
                >
                    {truncate(part, truncateLength)}
                </span>
            ))}
        </span>
    )
}

export const SearchResults: FC<{}> = () => {
    const searchResults = useTrackedStore().data.searchResults()
    const searchTerm = useTrackedStore().data.searchTerm()
    const graphinApis = store.graphinRef.graphinApis()
    const graph = store.graphinRef.graphRef()

    return (
        <div className="container max-w-xl overflow-y-auto px-4 max-h-96">
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
                                        <Table.Row
                                            key={generateId()}
                                            onClick={() => {
                                                graph?.zoomTo(1)
                                                console.log("clicked", node)
                                                graphinApis?.focusNodeById(
                                                    node.id,
                                                )
                                                // zoom graph if not zoomed
                                            }}
                                            className="hover cursor-pointer"
                                        >
                                            <SpanComponent
                                                term={searchTerm}
                                                value={node._metadata?._title}
                                            />
                                            <SpanComponent
                                                term={searchTerm}
                                                value={
                                                    node._metadata?._subtitle
                                                }
                                            />
                                            <SpanComponent
                                                term={searchTerm}
                                                value={node._metadata?._title}
                                            />
                                            <SpanComponent
                                                term={searchTerm}
                                                value={
                                                    node._metadata?._clusterId
                                                }
                                            />
                                            <SpanComponent
                                                term={searchTerm}
                                                value={node._metadata?._body}
                                            />
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
