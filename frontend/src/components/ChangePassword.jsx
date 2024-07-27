import React, { useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { IoEye , IoEyeOffSharp } from "react-icons/io5";
import { useChangePassword } from "../../hooks/useChangePassword";

const ChangePassword = () => {
  const { user } = useAuthContext();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword1, setShowPassword1] = useState(false)
  const [showPassword2, setShowPassword2] = useState(false)
  const { changePassword, isloading, error, success } = useChangePassword();

  const handleSubmit = async (e) => {
    e.preventDefault();


    console.log(user.email, currentPassword, newPassword);
    await changePassword( user.email, currentPassword, newPassword, confirmPassword);
  };

  
  const handleShowPassword1 = () => {
    setShowPassword1(!showPassword1);
  };
  const handleShowPassword2 = () => {
    setShowPassword2(!showPassword2);
  };

  return (
    <div className="container mx-auto p-4 max-w-[600px] m-6">
      <h2 className="text-3xl font-semibold mb-10">Change Password</h2>
      <form onSubmit={handleSubmit} className="px-4 py-8 bg-slate-200 rounded-lg">
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Current Password</label>
          <input
            type="text"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">New Password</label>
          <div className="flex items-center ">
            <input
              type={showPassword1 ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="p-2 border flex-grow border-gray-300 rounded-md"
              required
            ></input>
            <span onClick={handleShowPassword1} className="p-2 text-xl">
              {showPassword1 ? <IoEye /> : <IoEyeOffSharp />}
            </span>
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Confirm Password</label>
          <div className="flex items-center ">
            <input
              type={showPassword2 ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="p-2 border flex-grow border-gray-300 rounded-md"
              required
            ></input>
            <span onClick={handleShowPassword2} className="p-2 text-xl">
              {showPassword2 ? <IoEye /> : <IoEyeOffSharp />}
            </span>
          </div>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-lg w-full mt-5 select-none"
          disabled={isloading}
        >
          Change Password
        </button>
        {isloading && <div className="mt-4 text-slate-500" >Waiting for response...</div>}
        {error && <div className="mt-4 text-red-500">{error}</div>}
        {success && <div className="mt-4 text-green-600">{success}</div>}
      </form>
    </div>
  );
};

export default ChangePassword;
