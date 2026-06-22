import { useState } from "react";
import { useForm } from "react-hook-form";
import axiosInstance from "../api/axiosInstance";

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      if (res.success == true) {
        setLoading(false);
      } else {
        setLoading(false);
        setError("Signup failed. Please try again.");
      }
    } catch (error) {
      setLoading(false);
      setError(error.message || "Something went wrong.");
    }
  };

  return (
    <div>
      <h1 className="text-xl font-semibold text-gray-900 mb-1">
        Create account
      </h1>
      <p className="text-sm text-gray-400 mb-5">
        Fill in your details to get started
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        {/* Name */}
        <div>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
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
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Full name"
              className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-800 placeholder-gray-400 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100 transition"
              {...register("name", { required: "Name is required" })}
            />
          </div>
          {errors.name && (
            <p className="text-red-500 text-xs mt-1.5 ml-1">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
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
                  d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                />
              </svg>
            </span>
            <input
              type="email"
              placeholder="Email address"
              className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-800 placeholder-gray-400 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100 transition"
              {...register("email", { required: "Email is required" })}
            />
          </div>
          {errors.email && (
            <p className="text-red-500 text-xs mt-1.5 ml-1">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Mobile */}
        <div>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
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
                  d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
                />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Mobile number"
              className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-800 placeholder-gray-400 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100 transition"
              {...register("mobileNo", {
                required: "Mobile number is required",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Enter a valid 10-digit mobile number",
                },
              })}
            />
          </div>
          {errors.mobileNo && (
            <p className="text-red-500 text-xs mt-1.5 ml-1">
              {errors.mobileNo.message}
            </p>
          )}
        </div>

        {/* DOB */}
        <div>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
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
                  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
                />
              </svg>
            </span>
            <input
              type="date"
              className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-800 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100 transition"
              {...register("dob", { required: "Date of birth is required" })}
            />
          </div>
          {errors.dob && (
            <p className="text-red-500 text-xs mt-1.5 ml-1">
              {errors.dob.message}
            </p>
          )}
        </div>

        {/* Location */}
        <div>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
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
                  d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Location (optional)"
              className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-800 placeholder-gray-400 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100 transition"
              {...register("location")}
            />
          </div>
        </div>

        {error && <p className="text-red-500 text-xs text-center">{error}</p>}

        <button
          type="submit"
          disabled={loading}
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
    </div>
  );
};

export default Signup;
