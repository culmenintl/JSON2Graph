import React from "react"
import { Badge, Table } from "react-daisyui"
import fileConfig from "./../../../configs/data.mapping.json"
import { GraphConfig, _NodeConfig } from "../../lib/AppTypes"
import { store, useTrackedStore } from "../../stores/Store"
import { getColorFromNodeConfig, truncateString } from "../../lib/Utils"

const isNodeByKey = (key: string, config: _NodeConfig) => {
    if (config["id_data_property"] === key) {
        return true
    }
    return false
}
const isDataByKey = (key: string, config: _NodeConfig) => {
    if (config["content_data_property"] === key) {
        return true
    }
    return false
}

const NodeBadge: React.FC<{ JSONKey: string; configs: _NodeConfig[] }> = ({
    JSONKey,
    configs,
}) => {
    return (
        <div key={JSONKey}>
            {/* <Badge outline>{JSONKey}</Badge> */}
            {configs.map((config, index) => {
                const isNode = isNodeByKey(JSONKey, config)
                const isData = isDataByKey(JSONKey, config)
                const color = getColorFromNodeConfig(config)
                // console.log("color", color)
                return (
                    // rome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                    <div key={index}>
                        {isNode && (
                            <Badge style={{ color: `${color}` }} outline>
                                {config.label} ID
                            </Badge>
                        )}
                        {isData && (
                            <Badge style={{ color: `${color}` }} outline>
                                {config.label} Data
                            </Badge>
                        )}
                    </div>
                )
            })}
        </div>
    )
}

export const DataMappingDisplay: React.FC = () => {
    const config = fileConfig as unknown as GraphConfig
    const nodeConfigs = config.datasets[0].nodes
    const graphReady = useTrackedStore().graph.graphReady()

    const dataJson = store.data?.JsonSample() as any
    if (!dataJson || !config || !graphReady) return <></>

    return (
        <Table zebra>
            <Table.Head>
                <span>JSON Key</span>
                <span>Sample Data</span>
            </Table.Head>

            <Table.Body>
                {Object.keys(dataJson).map((key, index) => {
                    if (!nodeConfigs) return null
                    return (
                        <Table.Row key={key + index}>
                            <div className="truncate overflow-x-auto">
                                <code className="">{key}</code>
                                <div className="inline-block">
                                    <NodeBadge
                                        JSONKey={key}
                                        configs={nodeConfigs}
                                    />
                                </div>
                            </div>
                            <code className="">
                                {truncateString(dataJson[key], 15)}
                            </code>
                        </Table.Row>
                    )
                })}
            </Table.Body>
        </Table>
    )
}
