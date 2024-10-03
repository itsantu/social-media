import React, { useState } from "react";
import { useSignup } from "../../hooks/useSignup";
import useSendOtp from "../../hooks/useSendOtp";
import { IoEye, IoEyeOffSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useThemeContext } from "../../hooks/useThemeContext";

const Signup = () => {
  const { mode } = useThemeContext();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { signup, isloading, error } = useSignup();
  const { sendOtp, otpError, loading, OTP, setOTP, otpSent } = useSendOtp();

  const handleOtpRequest = async (e) => {
    e.preventDefault();

    await sendOtp(email, "signUpRequest", { username, password });
  };

  const handleVerifyOtpSubmit = async (e) => {
    e.preventDefault();

    await signup(username, email, password, OTP);
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div
      className={`container mx-auto p-4 w-[90%] max-w-[600px] rounded-xl m-6 ${
        mode == "dark" && "bg-gray-800"
      }`}
    >
      <h2
        className={`text-3xl font-semibold mb-10 ${
          mode == "dark" && "text-gray-400"
        }`}
      >
        Sign Up
      </h2>
      {!otpSent ? (
        <form
          onSubmit={handleOtpRequest}
          className={`px-4 py-8  rounded-lg ${
            mode == "dark" ? "bg-gray-900" : "bg-slate-200"
          }`}
        >
          <div className="mb-4">
            <label
              className={`block mb-2 ${
                mode == "dark" ? "text-white" : "text-gray-700"
              }`}
            >
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="john"
              className={`w-full p-2 border border-gray-300 rounded ${
                mode == "dark" && "bg-gray-700 text-gray-200"
              }`}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className={`block mb-2 ${
                mode == "dark" ? "text-white" : "text-gray-700"
              }`}
            >
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@gmail.com"
              className={`w-full p-2 border border-gray-300 rounded ${
                mode == "dark" && "bg-gray-700 text-gray-200"
              }`}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className={`block mb-2 ${
                mode == "dark" ? "text-white" : "text-gray-700"
              }`}
            >
              Password
            </label>
            <div className="flex items-center ">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full p-2 border border-gray-300 rounded ${
                  mode == "dark" && "bg-gray-700 text-gray-200"
                }`}
                required
              ></input>
              <span
                onClick={handleShowPassword}
                className={`p-2 text-xl cursor-pointer ${
                  mode == "dark" && "text-gray-200"
                }`}
              >
                {showPassword ? <IoEye /> : <IoEyeOffSharp />}
              </span>
            </div>
          </div>
          <div className="mt-4 text-gray-500 text-sm">We'll send an OTP to the email</div>
          <button
            type="submit"
            className={` ${
              !loading ? "bg-blue-600 text-white" : "bg-blue-800 text-gray-400"
            }  py-2 px-4 rounded-lg mt-3 w-full select-none`}
            disabled={loading}
          >
            {!loading ? "Sign Up" : "Sending OTP"}
          </button>
          <div className="mt-4 text-sm select-none">
            <span className={`${mode == "dark" && "text-gray-100"}`}>
              Already a user?
            </span>
            <Link to="/login" className="text-blue-600 ml-2 hover:underline">
              Login
            </Link>
          </div>
          {otpError && <div className="mt-4 text-red-500">{otpError}</div>}
        </form>
      ) : (
        <form
          onSubmit={handleVerifyOtpSubmit}
          className={`px-4 py-8 rounded-lg ${
            mode == "dark" ? "bg-gray-900" : "bg-slate-200"
          }`}
        >
          <div className="mb-4">
            <label className="block text-sm text-gray-500 mb-3">
              We've sent a 6-digit OTP to your email. Please fill that below
            </label>
            <input
              type="text"
              value={OTP}
              placeholder="XXXXXX"
              minLength={6}
              maxLength={6}
              onChange={(e) => setOTP(e.target.value)}
              className={`w-full p-2 border border-gray-300 rounded ${
                mode == "dark" && "bg-gray-700 text-gray-200"
              }`}
              required
            />
          </div>
          <button
            type="submit"
            className={`${
              !isloading
                ? "bg-blue-500 text-white"
                : "bg-blue-300 text-gray-400"
            } py-2 px-4 rounded-lg mt-5 w-full select-none`}
            disabled={isloading}
          >
            {!isloading ? "Verify OTP" : "Verifying OTP..."}
          </button>
          {error && <div className="mt-4 text-red-500">{error}</div>}
        </form>
      )}
    </div>
  );
};

export default Signup;
