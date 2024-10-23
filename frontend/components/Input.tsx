"use client"

const Input = ({label, placeholder, onChange, type}: {
    label: string, placeholder: string, onChange: (e: any) => void, type?: "text" | "password" | "email"
}) => {
  return (
    <div>
        <div className="text-sm pb-1 pt-2 outline-none">
        * <label>{label}</label>
        </div>
        <input className="border px-4 rounded py-2 w-full outline-none"
        type={type} placeholder={placeholder} onChange={onChange}></input>
    </div>
  )
}

export default Input