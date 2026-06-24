import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Signup from "./Signup";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import ThemeToggle from "../context/ThemeToggle";

const Login = () => {
  const [tab, setTab] = useState("login");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  async function handleGenerateOtp() {}
  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await axiosInstance.post("/auth/login", data);
      if (res.data?.success) {
        setLoading(false);
        navigate("/verify-otp");
      }
    } catch (error) {
      setLoading(false);
      setError("email", {
        message: error.response?.data?.message,
      });
    }
  };

  useEffect(() => {
    async function gettingMeRoute() {
      try {
        const authMeRes = await axiosInstance.get("/auth/me");
        if (authMeRes.success) {
          navigate("/chat");
        }
      } catch (err) {}
    }
    gettingMeRoute();
  }, []);

  return (
    <div className="min-h-screen w-full flex flex-col items-center bg-amber-50 dark:bg-gray-950 px-4 py-10 transition-colors duration-200">
      {/* Theme toggle */}
      <div className="w-full max-w-sm flex justify-end mb-2">
        <ThemeToggle />
      </div>

      {/* Brand */}
      <div className="flex items-center gap-2 mb-8">
        <div className="w-9 h-9 bg-violet-600 rounded-xl flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 text-white"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 2C6.477 2 2 6.163 2 11.322c0 2.773 1.228 5.261 3.178 6.98L4 22l4.239-1.66A10.94 10.94 0 0 0 12 20.644c5.523 0 10-4.163 10-9.322S17.523 2 12 2Z" />
          </svg>
        </div>
        <span className="text-lg font-semibold text-gray-800 dark:text-gray-100 tracking-tight">
          RSK-CHAT
        </span>
      </div>

      {/* Card */}
      <div className="bg-white dark:bg-gray-900 w-full max-w-sm rounded-2xl shadow-sm border border-amber-100 dark:border-gray-800 p-7 transition-colors duration-200">
        {/* Tabs */}
        <div className="flex bg-amber-100/60 dark:bg-gray-800 rounded-xl p-1 mb-6">
          <button
            onClick={() => setTab("login")}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              tab === "login"
                ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setTab("signup")}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              tab === "signup"
                ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
            }`}
          >
            Sign Up
          </button>
        </div>

        {tab === "login" ? (
          <div>
            <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-1">
              Welcome back
            </h1>
            <p className="text-sm text-gray-400 dark:text-gray-500 mb-5">
              Enter your email or phone to get an OTP
            </p>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              <div>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16 12H8m8 0a4 4 0 1 1-8 0 4 4 0 0 1 8 0Zm4 0a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z"
                      />
                    </svg>
                  </span>
                  <input
                    type="email"
                    placeholder="Email or mobile number"
                    className="w-full pl-9 pr-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 bg-white dark:bg-gray-800 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100 dark:focus:ring-violet-900/40 transition"
                    {...register("email", {
                      required: "Email or mobile number is required",
                    })}
                  />
                </div>
              </div>

              <button
                onClick={handleGenerateOtp}
                disabled={loading}
                type="submit"
                className={`w-full py-2.5 rounded-xl text-sm font-medium flex items-center justify-center gap-2 transition-all duration-200 ${
                  loading
                    ? "bg-violet-400 cursor-not-allowed text-white"
                    : "bg-violet-600 hover:bg-violet-700 text-white active:scale-95"
                }`}
              >
                {loading ? (
                  <>
                    <svg
                      className="w-4 h-4 animate-spin"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8H4z"
                      />
                    </svg>
                    Sending OTP...
                  </>
                ) : (
                  "Generate OTP"
                )}
              </button>
            </form>
            {errors.email && (
              <p className="text-red-500 text-center text-xs mt-1.5 ml-1">
                {errors.email.message}
              </p>
            )}
          </div>
        ) : (
          <Signup />
        )}
      </div>
    </div>
  );
};

export default Login;
