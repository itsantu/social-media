import React, { useState } from "react";
import useSendOtp from "../../hooks/useSendOtp.js";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useThemeContext } from "../../hooks/useThemeContext.js";

const ForgotPasswordEmail = () => {
  const { mode } = useThemeContext();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const { sendOtp, otpError, loading, OTP, setOTP, otpSent } = useSendOtp();

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(email);
    await sendOtp(email, "loginRequest", {});
  };

  const verifyOtp = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        "https://social-media-fxfa.onrender.com/api/user/verify-otp",
        { email, OTP },
        { headers: { "Content-Type": "application/json" } }
      );
      if (response.data?.error) {
        setError(response.data.error);
      } else if (response.data.verified) {
        navigate("/login/forgot-password", { state: email });
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto w-[90%] p-4 max-w-[600px] m-6">
      <h2 className={`text-xl md:text-3xl font-semibold mb-6 ${mode == 'dark' && "text-gray-300"}`}>Log In</h2>
      {!otpSent ? (
        <form
          onSubmit={handleSubmit}
          className={`px-4 py-8 rounded-lg ${mode == 'dark' ? "bg-gray-900" : "bg-slate-200"}`}
        >
          <div className="mb-4">
            <label className={`block  mb-2 ${mode == 'dark' && 'text-gray-100'}`}>Enter your Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full p-2 border border-gray-300 rounded ${mode == 'dark' && "bg-gray-700 text-gray-200"}`}
              required
            />
          </div>
          <button
            type="submit"
            className={`${
              !loading ? "bg-blue-500 text-white" : "bg-blue-300 text-gray-400"
            } p-2 rounded-lg w-full mt-5 select-none`}
            disabled={loading}
          >
            {!loading ? "Send OTP" : "Sending OTP..."}
          </button>
          {otpError && <div className="mt-4 text-red-500">{otpError}</div>}
        </form>
      ) : (
        <form
          onSubmit={verifyOtp}
          className={`px-4 py-8 rounded-lg ${mode == 'dark' ? "bg-gray-900" : "bg-slate-200"}`}
        >
          <div className="mb-4">
            <label className={`block mb-2 ${mode == 'dark' ? "text-white" : "text-gray-700"}`}>
              We have sent an OTP to your email. Please fill it below
            </label>
            <input
              type="text"
              value={OTP}
              placeholder="XXXXXX"
              onChange={(e) => setOTP(e.target.value)}
              minLength={6}
              maxLength={6}
              className={`w-full p-2 border border-gray-300 rounded ${mode == 'dark' && "bg-gray-700 text-gray-200"}`}
              required
            />
          </div>
          <button
            type="submit"
            className={`${
              !isLoading
                ? "bg-blue-500 text-white"
                : "bg-blue-300 text-gray-400"
            } p-2 rounded-lg w-full mt-5 select-none`}
            disabled={isLoading}
          >
            {!isLoading ? "Verify OTP" : "Verifying..."}
          </button>
          {error && <div className="mt-4 text-red-500">{error}</div>}
        </form>
      )}
    </div>
  );
};

export default ForgotPasswordEmail;
