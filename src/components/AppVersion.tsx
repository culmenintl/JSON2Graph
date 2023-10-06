import React from "react"

interface AppVersionProps {
    version: string
}
const AppVersion: React.FC<AppVersionProps> = ({ version }) => {
    return (
        <div>
            <span className="absolute left-0 top-0 p-3 text-sm text-gray-400">
                Centrifuge Widget Demo - v{APP_VERSION}
            </span>
        </div>
    )
}

export default AppVersion
