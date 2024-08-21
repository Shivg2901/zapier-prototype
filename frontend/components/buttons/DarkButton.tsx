"use client"
import { ReactNode } from "react"

const DarkButton = ({children, onClick, size = "small"}: {children: ReactNode,
onClick: () => void, size?: "small" | "big"}) => {
    return <div className={` flex flex-col justify-center px-8 py-2 bg-purple-800  text-white rounded
    hover:shadow-md cursor-pointer text-center`} onClick={onClick}>
    {children}
    </div>
}

export default DarkButton