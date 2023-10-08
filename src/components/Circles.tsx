import autoAnimate from "@formkit/auto-animate"
import React, { useEffect, useRef, useState } from "react"

type Props = {
    speed?: number
    size?: number
    iconOnly?: boolean
}
export const Circles: React.FC<Props> = ({ size, iconOnly, speed = 1000 }) => {
    const [numbers, setNumbers] = useState<number[]>(
        new Array(size ?? 60 * 3).fill("").map((_, i) => i),
    )

    const randomize = () => {
        setNumbers((numbers) =>
            [...numbers].sort(() => (Math.random() > 0.5 ? 1 : -1)),
        )
    }

    const parent = useRef(null)
    useEffect(() => {
        parent.current &&
            autoAnimate(parent.current, {
                duration: speed,
                easing: "ease-in-out",
            })
    }, [parent])

    // call every 1 second
    useEffect(() => {
        randomize()
        const interval = setInterval(() => {
            randomize()
        }, speed + 100)
        return () => clearInterval(interval)
    }, [])

    // default size is 36
    size = size || 60

    return (
        <div className={`w-${size} h-${size} rounded-full overflow-hidden`}>
            <div className="boxes w-64 h-64" ref={parent}>
                {numbers.map((number) => (
                    <div
                        className="box border rounded-full bg-base-200 m-2 w-1 h-1"
                        key={number}
                    >
                        {null}
                    </div>
                ))}
            </div>
        </div>
    )
}
