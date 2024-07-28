import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLogin } from "../../hooks/useLogin";
import { IoEye , IoEyeOffSharp } from "react-icons/io5";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false)
  const { login, isloading, error } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log( email, password);
    await login( email, password);
  };

  
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="container mx-auto w-[90%] p-4 max-w-[600px] m-6">
      <h2 className="text-3xl font-semibold mb-10">Log In</h2>
      <form onSubmit={handleSubmit} className="px-4 py-8 bg-slate-200 rounded-lg">
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Password</label>
          <div className="flex items-center ">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-2 border flex-grow border-gray-300 rounded-md"
              required
            ></input>
            <span onClick={handleShowPassword} className="p-2 text-xl">
              {showPassword ? <IoEye /> : <IoEyeOffSharp />}
            </span>
          </div>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-lg w-full mt-5 select-none"
          disabled={isloading}
        >
          Login
        </button>
        <div className="mt-4 text-sm select-none"><span>Don't have an account ?</span><Link className="text-blue-700 ml-2 hover:underline" to="/signup">Create account</Link></div>
        {isloading && <div className="mt-4 text-slate-500" >Logging in...</div>}
        {error && <div className="mt-4 text-red-500">{error}</div>}
      </form>
    </div>
  );
};

export default Login;
