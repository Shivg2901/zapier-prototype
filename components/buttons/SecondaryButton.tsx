"use client"

import { ReactNode } from "react"

const SecondaryButton = ({children, onClick, size = "small"}: {children: ReactNode,
onClick: () => void, size?: "small" | "big"}) => {
    return <div className={`${size==="small"? "text-sm": "text-xl"}
    ${size==="small"? "px-8 py-2": "px-14 py-3"} 
    hover:shadow-md cursor-pointer rounded-full border border-black`} onClick={onClick}>
    {children}
    </div>
}

export default SecondaryButton