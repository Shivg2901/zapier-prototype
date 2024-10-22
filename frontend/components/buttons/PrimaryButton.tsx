"use client"

import { ReactNode } from "react"

const PrimaryButton = ({children, onClick, size = "small"}: {children: ReactNode,
onClick: () => void, size?: "small" | "big"}) => {
    return <div className={`${size==="small"? "text-sm": "text-xl"}
    ${size==="small"? "px-8 py-2": "px-14 py-3"} bg-amber-700 text-white rounded-full
    hover:shadow-lg cursor-pointer text-center flex flex-col justify-center hover:bg-[#ec4d03]`} onClick={onClick}>
    {children}
    </div>
}

export default PrimaryButton