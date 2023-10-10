import React from "react"
import { Card } from "react-daisyui"

interface Props {
    children: React.ReactNode
}
export const BaseModalPanel: React.FC<Props> = ({ children }) => {
    return (
        <Card
            bordered={false}
            compact
            className="flex-1 overflow-y-auto min-h-[75vh]"
        >
            <Card.Body className="">{children}</Card.Body>
        </Card>
    )
}
