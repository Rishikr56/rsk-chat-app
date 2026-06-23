import React, { useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import ThemeToggle from "../context/ThemeToggle";

const VerifyOtp = () => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleVerify = async () => {
    if (otp.length < 6) {
      setError("Please enter the complete 6-digit OTP.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const token = await axiosInstance.get("/auth/token-get");
      const res = await axiosInstance.post("/auth/verify-otp", {
        email: token.data?.token,
        otp,
      });
      console.log("response from server", res);
      if (res?.data?.success) {
        navigate("/chat");
      } else {
        setError(res?.data?.message || "Invalid OTP. Please try again.");
      }
    } catch (err) {
      console.error("OTP verification error:", err);
      setError(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-amber-50 dark:bg-gray-950 px-4 transition-colors duration-200">
      {/* Theme Toggle */}
      <div className="w-full max-w-sm flex justify-end mb-4">
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
      <div className="bg-white dark:bg-gray-900 w-full max-w-sm rounded-2xl shadow-sm border border-amber-100 dark:border-gray-800 p-8 transition-colors duration-200">
        {/* Lock icon */}
        <div className="w-14 h-14 bg-violet-100 dark:bg-violet-950/40 rounded-2xl flex items-center justify-center mx-auto mb-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-7 h-7 text-violet-600 dark:text-violet-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
            />
          </svg>
        </div>

        <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100 text-center mb-1">
          Verify OTP
        </h1>
        <p className="text-sm text-gray-400 dark:text-gray-500 text-center mb-7">
          Enter the 6-digit code sent to your email/mobile
        </p>

        {/* Single OTP Input */}
        <input
          type="number"
          placeholder="Enter 6-digit OTP"
          value={otp}
          onChange={(e) => {
            if (e.target.value.length <= 6) setOtp(e.target.value);
          }}
          onKeyDown={(e) => e.key === "Enter" && handleVerify()}
          className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-center tracking-widest font-semibold text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 bg-white dark:bg-gray-800 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100 dark:focus:ring-violet-900/40 transition mb-4"
        />

        {/* Error */}
        {error && (
          <p className="text-red-500 text-xs text-center mb-4">{error}</p>
        )}

        {/* Verify Button */}
        <button
          onClick={handleVerify}
          disabled={loading || otp.length < 6}
          className={`w-full py-2.5 rounded-xl text-sm font-medium flex items-center justify-center gap-2 transition-all duration-200 ${
            loading || otp.length < 6
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
              Verifying...
            </>
          ) : (
            "Verify OTP"
          )}
        </button>

        {/* Resend */}
        <div className="text-center mt-4">
          <button className="text-sm text-violet-500 hover:text-violet-700 dark:hover:text-violet-300 hover:underline transition">
            Resend OTP
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtp;
