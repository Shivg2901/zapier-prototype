"use client"
import Appbar from "@/components/Appbar"
import CheckFeature from "@/components/CheckFeature"
import Input from "@/components/Input"
import PrimaryButton from "@/components/buttons/PrimaryButton"
import { useRouter } from "next/navigation"

const Signup = () => {

    const router = useRouter()
  return (
    <div>
        <Appbar />
        <div className="flex justify-center">
        <div className="flex pt-8 max-w-4xl">
        <div className="flex-1 pt-20 px-4">
            <div className="font-semibold text-3xl pb-4">
            Join millions worldwide who automate their work using Zapier.
            </div>
            <div className="pb-6 pt-4">
            <CheckFeature title="Easy setup, no coding required"/>
            </div>
            <div className="pb-6">
            <CheckFeature title="Free forever for core features"/>
            </div>
            <div className="pb-6">
            <CheckFeature title="14-day trial of premium features & apps"/>
            </div>
        </div>
    <div className="flex-1 pt-8 px-4 pb-8 border mt-12 rounded">
        <Input label="Name" placeholder="Your Name" type="text" onChange={(e) => {}}/>
        <Input label="Work Email" placeholder="Your Email" type="text" onChange={(e) => {}}/>
        <Input label="Password" placeholder="Password" type="password" onChange={(e) => {}}/>
        <div className="pt-4">
        <PrimaryButton size="big" onClick={() => {
            router.push('/')
        }} >Get started free</PrimaryButton>
        </div>
        </div>
        </div>
        
    </div>
    </div>
  )
}

export default Signup