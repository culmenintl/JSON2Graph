import React, { useState } from "react"
import { Button } from "react-daisyui"

interface Action {
    id: number
    text: string
    undo: () => void
}

const ActionLogger: React.FC = () => {
    const [actions, setActions] = useState<Action[]>([])
    // const transitions = useTransition(actions, {
    //     from: { opacity: 0, transform: "translate3d(0,40px,0)" },
    //     enter: { opacity: 1, transform: "translate3d(0,0px,0)" },
    //     leave: { opacity: 0, transform: "translate3d(0,-40px,0)" },
    //     keys: (action) => action.id.toString(),
    // })

    // Call this function to add a new action
    function addAction(action: Action) {
        if (actions.length >= 5) {
            actions.shift()
        }
        setActions([...actions, action])
    }
    const [items, setItems] = useState([0, 1, 2])
    // const [parent, enableAnimations] = useAutoAnimate(/* optional config */)
    const add = () => setItems([...items, items.length])

    return (
        <></>
        // <div ref={parent} className="fixed bottom-4 w-full ">
        //     <div
        //         ref={parent}
        //         className="max-w-md mx-auto overflow-hidden bg-white rounded-xl shadow-md space-y-2 p-4"
        //     >
        //         {transitions.map(({ item, props, key }) => (
        //             <animated.div
        //                 key={key}
        //                 style={props}
        //                 className="flex justify-between items-center px-2 text-base"
        //             >
        //                 <p>{item.text}</p>
        //                 <Button
        //                     onClick={item.undo}
        //                     className="text-xs py-0.5 px-1 rounded bg-blue-500 text-white"
        //                 >
        //                     Undo
        //                 </Button>
        //             </animated.div>
        //         ))}
        //     </div>
        // </div>
    )
}

export default ActionLogger
