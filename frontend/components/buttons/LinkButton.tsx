"use client"
import { ReactNode } from "react"



const LinkButton = ({children, onClick}: {children: ReactNode, onClick: () => void}) => {
  return (
    <div className="flex justify-center px-2 py-2 cursor-pointer hover:bg-slate-100 text-sm rounded" onClick={onClick} style={{ fontWeight: 100 }}>
        {children}
    </div>
  )
}

export default LinkButton