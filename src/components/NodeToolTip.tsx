import { ModelConfig } from "@antv/g6"
import { Components, TooltipValue } from "@antv/graphin"
import { Avatar, Badge, Card } from "react-daisyui"
import { ExtendedNode, truncateString } from "../lib/Utils"
import { UserIcon } from "@heroicons/react/24/outline"

const { Tooltip } = Components

interface ToolTipCardProps {
    model: ModelConfig
}

// ToolTipCard component, which is the content of the tooltip,
// has an avatar title, subtitle, and body
// also contains the node type as a badge
// if the body is longer than 50 characters, it will be truncated,
// and the full body will be displayed in the tooltip
const ToolTipCard: React.FC<ToolTipCardProps> = (model: ToolTipCardProps) => {
    if (!model) return null

    // cast to ExtendedNode type, which has metadata on the node model
    const node = model.model as unknown as ExtendedNode
    console.log("node", node)
    return (
        <Card bordered={false} className="max-w-md w-screen p-5 bg-slate-50">
            <Card.Title>
                <div className="flex flex-1 flex-row">
                    <div className="flex flex-col justify-center items-center rounded-lg max-w-28 max-h-28">
                        <div className="w-12 h-12">
                            <UserIcon />
                        </div>
                        <div className="flex-1">
                            <span>{node._metadata?._subtitle}</span>
                        </div>
                        <div className="flex-1">
                            <Badge color="primary" className="">
                                {node._metadata?._type}
                            </Badge>
                        </div>
                    </div>
                    <span className="pl-5">
                        {truncateString(node._metadata?._title, 50)}
                    </span>
                </div>
            </Card.Title>

            {node?._metadata?._title && node._metadata._title.length > 50 && (
                <Card.Body className="prose lg:prose-lg">
                    <p>{node._metadata?._body}</p>
                </Card.Body>
            )}
        </Card>
    )
}

const placement = "auto"
const hasArrow = false
const style = {}

// NodeToolTip component, which is a wrapper around the Graphin Tooltip component
// https://graphin.antv.vision/en/packages/graphin-components#tooltip
// which contains the tooltip card content above
export const NodeToolTip: React.FC<{}> = () => {
    return (
        <Tooltip bindType="node" placement={placement} hasArrow={hasArrow}>
            {(value: TooltipValue) => {
                if (value.model) {
                    const { model } = value
                    return <ToolTipCard model={model} />
                }
                return null
            }}
        </Tooltip>
    )
}
