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
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Signup = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const router = useRouter()
  return (
    <div>
      <Appbar />
      <div className="flex justify-center h-max">
        <div className="flex pt-8 max-w-4xl ">
          <div className="flex-1 pt-24 px-4">
            <div className="font-semibold text-3xl pb-4 pr-2 ">
              Join millions worldwide who automate their work using Zapier.
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
          <div className="flex-1 pt-8` px-4 pb-8 border mt-12 rounded h-fit">
            <Input
              label="Name"
              placeholder="Your Name"
              type="text"
              onChange={(e) => {
                setName(e.target.value)
              }}
            />
            <Input
              label="Work Email"
              placeholder="Your Email"
              type="text"
              onChange={(e) => {
                setEmail(e.target.value)
              }}
            />
            <div className="relative">
              <Input
                label="Password"
                placeholder="Password"
                type={showPassword ? "text" : "password"}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="absolute text-gray-600 cursor-pointer right-3 top-10"
                onClick={togglePasswordVisibility}>
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </div>
            </div>
            {/* <Input
              label="Password"
              placeholder="Password"
              type="password"
              onChange={(e) => {
                setPassword(e.target.value)
              }}
            /> */}
            <div className="pt-4 ">
              <PrimaryButton
                size="big"
                onClick={async () => {
                  try {
                    const res = await axios.post(
                      `${BACKEND_URL}/api/v1/user/signup`,
                      {
                        username: email,
                        password,
                        name,
                      }
                    )

                    toast.success("Sign up successful")
                    router.push("/login")
                  } catch (error) {
                    if (error instanceof AxiosError) {
                      toast.error(
                        error.response?.data?.message || "Error Signing up"
                      )
                    } else {
                      toast.error("An unexpected error occurred")
                    }
                  }
                }}
              >
                Get started free
              </PrimaryButton>
            </div>
            <div className="text-center mt-4 text-sm text-gray-600">
              Already have an account?{" "}
              <button 
                className="text-amber-700 hover:underline"
                onClick={() => router.push("/login")}
              >
                Login
              </button>
              </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup
