import { useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useDeleteUser } from "../../hooks/useDeleteUser";
import { IoEye, IoEyeOffSharp } from "react-icons/io5";

const DeleteUser = () => {
  const { user } = useAuthContext();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
    const { deleteUser, isloading, error } = useDeleteUser();

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(user.email, password);
    await deleteUser(user.email, password);
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="container mx-auto p-4 max-w-[600px] m-6">
      <h2 className="text-3xl font-semibold mb-5">Delete Account</h2>
      <form
        onSubmit={handleSubmit}
        className="px-4 py-8 bg-slate-200 rounded-lg"
      >
        <div className="w-full flex justify-center mb-5 rounded-md">
          <img
            className="w-[300px]  rounded-md"
            src="https://dslntlv9vhjr4.cloudfront.net/posts_images/U0SO0ZpXLDzkW.jpg"
            alt=""
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Enter Password</label>
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
