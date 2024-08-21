"use client"

import Appbar from "@/components/Appbar"
import ZapCell from "@/components/ZapCell"
import LinkButton from "@/components/buttons/LinkButton"
import PrimaryButton from "@/components/buttons/PrimaryButton"
import { useState } from "react"

const page = () => {

    const [selectedTrigger, setSelectedTrigger] = useState("")
    const [selectedActions, setSelectedActions] = useState<{
        availableActionId: string,
        availableActionName: string
    }[]>([])

  return (
    <div>
        <Appbar />
        <div className="w-full min-h-screen bg-slate-200 flex flex-col justify-center">
            <div className="flex justify-center w-full">
            <ZapCell name={selectedTrigger? selectedTrigger: "Trigger"} index={1}/>
            </div>
            <div className=" w-full py-2">
                {selectedActions.map((action, index) => (
                    <div className="flex justify-center py-2"><ZapCell name={action.availableActionName ? action.availableActionName: "Action"} index={2 + index}/></div>
                ))}
            </div>
            <div className="flex justify-center">
            <div className="">
            <PrimaryButton onClick={() => {
                setSelectedActions(a => [...a, {
                    availableActionId: "",
                    availableActionName: ""
                }])
            }}><div className="text-2xl flex justify-center">
                +</div></PrimaryButton>
            </div>
            </div>
        </div>
    </div>

  )
}

export default page