import { FC, useEffect, useRef } from "react"
import { Button, Collapse, Table } from "react-daisyui"
import { actions, store, useTrackedStore } from "../../stores/Store"

import { IUserNode } from "@antv/graphin"
import { generateUniqueId as generateId, truncateString } from "../../lib/Utils"

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
                    {truncateString(part, truncateLength)}
                </span>
            ))}
        </span>
    )
}

export const SearchResults: FC<{}> = () => {
    const searchResults = useTrackedStore().data.searchResults()
    const size = searchResults?.size ?? 0
    const searchTerm = useTrackedStore().data.searchTerm()
    const showResults = useTrackedStore().data.showResults()

    const graphinApis = store.graphinRef.graphinApis()
    const graph = store.graphinRef.graphRef()

    return (
        <Collapse
            className="group max-h-[75vh] max-w-xl"
            open={showResults && size > 0}
            icon="arrow"
            tabIndex={0}
            onBlur={() => {
                actions.data.showResults(false)
            }}
        >
            <Collapse.Content
                className="overflow-y-auto"
                onBlur={() => {
                    actions.data.showResults(false)
                }}
            >
                {size > 0 && (
                    <Button
                        variant="link"
                        size="xs"
                        className="absolute right-0"
                        color="ghost"
                        onClick={() => {
                            actions.data.clearSearch()
                        }}
                    >
                        Clear
                    </Button>
                )}
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
                                                    // console.log("clicked", node)
                                                    actions.data.showResults(
                                                        false,
                                                    )
                                                    graphinApis?.focusNodeById(
                                                        node.id,
                                                    )

                                                    // zoom graph if not zoomed
                                                }}
                                                className="hover cursor-pointer"
                                            >
                                                <SpanComponent
                                                    term={searchTerm}
                                                    value={
                                                        node._metadata?._title
                                                    }
                                                />
                                                <SpanComponent
                                                    term={searchTerm}
                                                    value={
                                                        node._metadata
                                                            ?._subtitle
                                                    }
                                                />
                                                <SpanComponent
                                                    term={searchTerm}
                                                    value={
                                                        node._metadata?._title
                                                    }
                                                />
                                                <SpanComponent
                                                    term={searchTerm}
                                                    value={
                                                        node._metadata
                                                            ?._clusterId
                                                    }
                                                />
                                                <SpanComponent
                                                    term={searchTerm}
                                                    value={
                                                        node._metadata?._body
                                                    }
                                                />
                                            </Table.Row>
                                        ))}
                                    </Table.Body>
                                </Table>
                            </div>
                        )
                    },
                )}
            </Collapse.Content>
        </Collapse>
    )
}

export default SearchResults
