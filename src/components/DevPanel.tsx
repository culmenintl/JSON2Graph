import useStore from "../stores/_Store"
import Button from "./Button"
import DevPanelHeader from "./DevPanelHeader"
import { GraphRow } from "./GraphRow"
import GraphStats from "./GraphStats"
import { ArrowPathIcon } from "@heroicons/react/24/outline"
import { FC } from "react"

const LoseContext: FC<{}> = () => {
    // const sigma = useSigma()
    return (
        <Button
            text="LoseContext"
            onClick={() => {
                // const canvases = sigma.getCanvases()
                // canvases.edges
                //     .getContext("webgl2")
                //     ?.getExtension("WEBGL_lose_context")
                //     ?.loseContext()
            }}
        />
    )
}

const RestoreContext: FC<{}> = () => {
    // const sigma = useSigma()
    return (
        <Button
            text="RestoreContext"
            onClick={() => {
                // const canvases = sigma.getCanvases()
                // canvases.edges
                //     .getContext("webgl2")
                //     ?.getExtension("WEBGL_lose_context")
                //     ?.restoreContext()
            }}
        />
    )
}

const ReloadGraph: FC<{}> = () => {
    const fetchData = useStore((state) => state.fetchData)
    return (
        <div className="border-1 sticky bottom-0 mx-auto flex w-full justify-center bg-black/10 py-3 backdrop-blur-lg">
            <Button
                text="Reload"
                onClick={async () => {
                    await fetchData()
                }}
                icon={
                    <ArrowPathIcon
                        className="h-5 w-5 pr-1"
                        aria-hidden="true"
                    />
                }
            />
        </div>
    )
}

export const DevPanel: FC<{}> = () => {
    return (
        <div className="border-1 pb-18 absolute bottom-20 left-0 right-0 mx-auto flex max-h-[75vh] !max-w-xl rounded-lg border border-gray-300 bg-white/50 backdrop-blur-md">
            <div className="flex w-full flex-col !overflow-y-auto overflow-x-hidden !scroll-smooth">
                <GraphStats />
                <DevPanelHeader
                    title="WebGL"
                    subtitle={"Testing losing and regaining context"}
                />
                <GraphRow label="Lose Context" value={<LoseContext />} />
                <GraphRow label="Restore Context" value={<RestoreContext />} />
                <ReloadGraph />
            </div>
        </div>
    )
}
