import React, { useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { Navigate } from "react-router-dom";

const VerifyOtp = () => {
  const [otp, setOtp] = useState();
  const [error, setError] = useState();
  const VerifyOtp = async () => {
    const data = {
      email: localStorage.getItem("email"),
      otp: otp,
    };
    try {
      const otpVerificationRes = await axiosInstance.post("/verify-otp", data);
      if (otpVerificationRes.success) {
        Navigate("/chat");
      }
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <div className="h-screen flex justify-center items-center bg-slate-100">
      <div className="bg-white w-[400px] p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-2">Verify OTP</h1>

        <p className="text-center text-gray-500 mb-6">
          Enter the 6-digit OTP sent to your email/mobile
        </p>

        <div className="flex justify-center gap-3 mb-6">
          <input
            type="Number"
            onChange={(e) => setOtp(e.target.value)}
            className="w-12 h-12 text-center text-xl border rounded-lg outline-none focus:border-black"
          />
        </div>

        <button
          onClick={() => VerifyOtp()}
          className="w-full bg-black text-white py-3 rounded-lg font-medium"
        >
          Verify OTP
        </button>

        <div className="text-center mt-4">
          <button className="text-sm text-blue-600 hover:underline">
            Resend OTP
          </button>
        </div>
      </div>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default VerifyOtp;
