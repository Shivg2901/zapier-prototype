"use client"
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Appbar from "@/components/Appbar";
import CheckFeature from "@/components/CheckFeature";
import Input from "@/components/Input";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import { BACKEND_URL } from "../config";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <div>
      <Appbar />
      <div className="flex justify-center">
        <div className="flex pt-8 max-w-4xl ">
          <div className="flex-1 pt-24 px-4">
            <div className="font-semibold text-4xl pb-4 pr-2">Automate across your teams</div>
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
          <div className="flex-1 pt-8 px-4 pb-8 border mt-12 rounded relative">
            <Input
              label="Work Email"
              placeholder="Your Email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
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
            <div className="pt-4">
              <PrimaryButton
                size="big"
                onClick={async () => {
                  try {
                    const res = await axios.post(`${BACKEND_URL}/api/v1/user/signin`, {
                      username: email,
                      password,
                    });
                    localStorage.setItem("token", res.data.token);
                    toast.success("Sign in successful");
                    router.push("/dashboard");
                  } catch (error) {
                    if (error instanceof AxiosError) {
                      toast.error(error.response?.data?.message || "Error logging in");
                    } else {
                      toast.error("An unexpected error occurred");
                    }
                  }
                }}>
                Login
              </PrimaryButton>
            </div>
            <div className="text-center mt-4 text-sm text-gray-600">
              Don't have an account?{" "}
              <button 
                className="text-amber-700 hover:underline"
                onClick={() => router.push("/signup")}
              >
                Sign up
              </button>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
