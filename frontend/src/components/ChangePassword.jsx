import React, { useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { IoEye, IoEyeOffSharp } from "react-icons/io5";
import { useChangePassword } from "../../hooks/useChangePassword";
import { useThemeContext } from "../../hooks/useThemeContext";

const ChangePassword = () => {
  const { user } = useAuthContext();
  const { mode } = useThemeContext()
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const { changePassword, isloading, error, success } = useChangePassword();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await changePassword(
      user.email,
      currentPassword,
      newPassword,
      confirmPassword
    );
  };

  const handleShowPassword1 = () => {
    setShowPassword1(!showPassword1);
  };
  const handleShowPassword2 = () => {
    setShowPassword2(!showPassword2);
  };

  return (
    <div className={`container mx-auto p-4 w-[85%] max-w-[600px] m-4 ${mode == 'dark' && "bg-gray-800"}`}>
      <h2 className={`text-xl md:text-3xl font-semibold mb-6 ${mode == 'dark' && "text-gray-400"}`}>
        Change Password
      </h2>
      <form
        onSubmit={handleSubmit}
        className={`px-4 py-8 rounded-lg ${mode == 'dark' ? "bg-gray-900" : "bg-slate-200"}`}
      >
        <div className="mb-4">
          <label className={`block mb-2 ${mode == 'dark' ? "text-white" : "text-gray-700"}`}>Current Password</label>
          <input
            type="text"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className={`w-full p-2 border border-gray-300 rounded ${mode == 'dark' && "bg-gray-700 text-gray-200"}`}
            required
          />
        </div>
        <div className="mb-4">
          <label className={`block mb-2 ${mode == 'dark' ? "text-white" : "text-gray-700"}`}>New Password</label>
          <div className="flex items-center space-x-2">
            <input
              type={showPassword1 ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className={`w-full p-2 border border-gray-300 rounded ${mode == 'dark' && "bg-gray-700 text-gray-200"}`}
              required
            />
            <span onClick={handleShowPassword1} className={`p-2 text-xl cursor-pointer ${mode == "dark" && "text-gray-200"}`}>
              {showPassword1 ? <IoEye /> : <IoEyeOffSharp />}
            </span>
          </div>
        </div>
        <div className="mb-4">
          <label className={`block  mb-2 ${mode == 'dark' ? "text-white" : "text-gray-700"}`}>Confirm Password</label>
          <div className="flex items-center space-x-2">
            <input
              type={showPassword2 ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`w-full p-2 border border-gray-300 rounded ${mode == 'dark' && "bg-gray-700 text-gray-200"}`}
              required
            />
            <span onClick={handleShowPassword2} className={`p-2 text-xl cursor-pointer ${mode == "dark" && "text-gray-200"}`}>
              {showPassword2 ? <IoEye /> : <IoEyeOffSharp />}
            </span>
          </div>
        </div>
        <button
          type="submit"
          className={`${!isloading ? "bg-blue-500 text-white hover:bg-blue-700" : "bg-blue-800 text-gray-300"} p-2 rounded-lg w-full mt-5 select-none`}
          disabled={isloading}
        >
          {!isloading ? "Change Password" : "Please wait..."}
        </button>
        {isloading && (
          <div className="mt-4 text-slate-400">Don't go Back or close the page</div>
        )}
        {error && <div className="mt-4 text-red-500">{error}</div>}
        {success && <div className="mt-4 text-green-600">{success}</div>}
      </form>
    </div>
  );
};

export default ChangePassword;
