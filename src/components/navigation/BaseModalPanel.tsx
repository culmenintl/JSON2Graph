import React from "react"
import { Card } from "react-daisyui"

interface Props {
    children: React.ReactNode
}
export const BaseModalPanel: React.FC<Props> = ({ children }) => {
    return (
        <div className="p-4 flex flex-col h-full">
            <Card
                bordered={false}
                compact
                className="flex-1 overflow-y-auto h-full"
            >
                {children}
            </Card>
        </div>
    )
}
