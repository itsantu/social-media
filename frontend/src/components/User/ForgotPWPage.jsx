import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import useForgotPassword from "../../../hooks/useForgotPassword";
import { useThemeContext } from "../../../hooks/useThemeContext";
import { IoEye, IoEyeOffSharp } from "react-icons/io5";

const ForgotPWPage = () => {
  const { mode } = useThemeContext();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const location = useLocation();
  const email = location.state;
  const { changePasswordViaEmail, error, isLoading } = useForgotPassword();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await changePasswordViaEmail(email, newPassword, confirmPassword);
  };

  const handleShowPassword1 = () => {
    setShowPassword1(!showPassword1);
  };
  const handleShowPassword2 = () => {
    setShowPassword2(!showPassword2);
  };

  return (
    <div className="container mx-auto p-4 w-[85%] max-w-[600px] m-4">
      <h2
        className={`text-xl md:text-3xl font-semibold mb-6 ${
          mode == "dark" && "text-gray-300"
        }`}
      >
        Change Password
      </h2>
      <form
        onSubmit={handleSubmit}
        className={`px-4 py-8 rounded-lg ${
          mode == "dark" ? "bg-gray-900" : "bg-slate-200"
        }`}
      >
        <div className="mb-4">
          <label className={`block  mb-2 ${mode == "dark" && "text-gray-100"}`}>
            New Password
          </label>
          <div className="flex items-center ">
            <input
              type={showPassword1 ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className={`w-full p-2 border border-gray-300 rounded ${
                mode == "dark" && "bg-gray-700 text-gray-200"
              }`}
              required
            ></input>
            <span
              onClick={handleShowPassword1}
              className={`p-2 text-xl cursor-pointer ${
                mode == "dark" && "text-gray-200"
              }`}
            >
              {showPassword1 ? <IoEye /> : <IoEyeOffSharp />}
            </span>
          </div>
        </div>
        <div className="mb-4">
          <label className={`block  mb-2 ${mode == "dark" && "text-gray-100"}`}>Confirm Password</label>
          <div className="flex items-center ">
            <input
              type={showPassword2 ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`w-full p-2 border border-gray-300 rounded ${
                mode == "dark" && "bg-gray-700 text-gray-200"
              }`}
              required
            ></input>
            <span
              onClick={handleShowPassword2}
              className={`p-2 text-xl cursor-pointer ${
                mode == "dark" && "text-gray-200"
              }`}
            >
              {showPassword2 ? <IoEye /> : <IoEyeOffSharp />}
            </span>
          </div>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-lg w-full mt-5 select-none"
          disabled={isLoading}
        >
          Change Password
        </button>
        {isLoading && (
          <div className="mt-4 text-slate-500">Waiting for response...</div>
        )}
        {error && <div className="mt-4 text-red-500">{error}</div>}
      </form>
    </div>
  );
};

export default ForgotPWPage;
