import React, { useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { IoEye, IoEyeOffSharp } from "react-icons/io5";
import { Link } from "react-router-dom";

const About = () => {
  const { user } = useAuthContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [changePassword, setChangePassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(email, password);
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="container  mx-auto px-10 py-10 rounded-3xl shadow-2xl w-screen md:max-w-[600px] mt-24">
      <h2 className="text-3xl font-semibold mb-5">@{user.uname}</h2>
      <h3 className="font-bold mb-4">Email: </h3>
      <input
        type="text"
        value={user.email}
        disabled="true"
        readOnly="true"
        className=" w-full bg-slate-200 py-2 px-1 rounded-sm"
      />
      <div className="mt-10">
        <Link
          to="./changepassword"
          className="bg-slate-200  mr-4 py-2 px-3 text-sm md:py-3  md:px-5 rounded-md hover:bg-slate-400 font-semibold hover:text-white duration-200"
        >
          Change Password
        </Link>
        <Link
          to="./deleteuser"
          className="bg-red-600  mr-4 py-2 px-3 text-sm md:py-3  md:px-5 rounded-md hover:bg-red-800 font-semibold hover:text-white duration-200"
        >
          Delete Account
        </Link>
      </div>
    </div>
  );
};

export default About;
