"use client"
import Appbar from "@/components/Appbar"
import CheckFeature from "@/components/CheckFeature"
import Input from "@/components/Input"
import PrimaryButton from "@/components/buttons/PrimaryButton"
import axios, { AxiosError } from "axios"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { BACKEND_URL } from "../config"
import toast from "react-hot-toast"

const Signup = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const router = useRouter()
  return (
    <div>
      <Appbar />
      <div className="flex justify-center">
        <div className="flex pt-8 max-w-4xl">
          <div className="flex-1 pt-20 px-4">
            <div className="font-semibold text-4xl pb-4">
              Automate across your teams
            </div>
            <div className="pb-6 pt-4">
              <CheckFeature title="Easy setup, no coding required" />
            </div>
            <div className="pb-6">
              <CheckFeature title="Free forever for core features" />
            </div>
            <div className="pb-6">
              <CheckFeature title="14-day trial of premium features & apps" />
            </div>
          </div>
          <div className="flex-1 pt-8` px-4 pb-8 border mt-12 rounded">
            <Input
              label="Work Email"
              placeholder="Your Email"
              type="text"
              onChange={(e) => {
                setEmail(e.target.value)
              }}
            />
            <Input
              label="Password"
              placeholder="Password"
              type="password"
              onChange={(e) => {
                setPassword(e.target.value)
              }}
            />
            <div className="pt-4">
              <PrimaryButton
                size="big"
                onClick={async () => {
                  try {
                    const res = await axios.post(
                      `${BACKEND_URL}/api/v1/user/signin`,
                      {
                        username: email,
                        password,
                      }
                    )
                    localStorage.setItem("token", res.data.token)
                    toast.success("Sign in successful")
                    router.push("/dashboard")
                  } catch (error) {
                    if (error instanceof AxiosError) {
                      toast.error(
                        error.response?.data?.message || "Error logging in"
                      )
                    } else {
                      toast.error("An unexpected error occurred")
                    }
                  }
                }}
              >
                Login
              </PrimaryButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup
