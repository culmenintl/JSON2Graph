import Button from "./Button"
import { FC } from "react"

const GraphSelector: FC<{}> = ({}) => {
    return (
        <div className="flex w-full flex-col items-start">
            <span>
                <h2>Graph Data</h2>
            </span>
            <span className="flex w-full flex-row justify-between">
                <Button text="Wikipedia" />
                <Button text="CaveMan" />
                <Button text="Karate Club" />
            </span>
        </div>
    )
}

export default GraphSelector
