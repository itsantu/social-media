import { useState } from "react";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { useDeleteUser } from "../../../hooks/useDeleteUser";
import { useThemeContext } from "../../../hooks/useThemeContext";
import { IoEye, IoEyeOffSharp } from "react-icons/io5";

const DeleteUser = () => {
  const { user } = useAuthContext();
  const { mode } = useThemeContext();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { deleteUser, isloading, error } = useDeleteUser();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await deleteUser(user.email, password);
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={`container mx-auto p-4 w-[85%] max-w-[600px] m-4 `}>
      <h2
        className={`text-xl md:text-3xl font-semibold mb-6 ${
          mode == "dark" && "text-gray-300"
        }`}
      >
        Delete Account
      </h2>
      <form
        onSubmit={handleSubmit}
        className={`px-4 py-8 rounded-lg ${
          mode == "dark" ? "bg-gray-900" : "bg-slate-200"
        }`}
      >
        <div
          className={`w-full flex justify-center mb-5 rounded-md ${
            mode == "dark" && "bg-gray-800"
          }`}
        >
          <img
            className="w-[300px]  rounded-md"
            src="https://dslntlv9vhjr4.cloudfront.net/posts_images/U0SO0ZpXLDzkW.jpg"
            alt=""
          />
        </div>
        <div className="mb-4">
          <label className={`block  mb-2 ${mode == "dark" && "text-gray-100"}`}>
            Enter Password
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

        <button
          type="submit"
          className="bg-red-500 hover:bg-red-700 text-white p-2 rounded-lg w-full mt-5 select-none duration-150"
          disabled={isloading}
        >
          Delete Account
        </button>
        {isloading && (
          <div className="mt-4 text-slate-500">Waiting for response...</div>
        )}
        {error && <div className="mt-4 text-red-500">{error}</div>}
      </form>
    </div>
  );
};

export default DeleteUser;
