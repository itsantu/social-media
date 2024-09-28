import React from "react";
import { IoLogOutOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useLogout } from "../../hooks/useLogout";
import { useThemeContext } from "../../hooks/useThemeContext";

function Settings({ setOpenSettings }) {
  const { logout } = useLogout();
  const { dispatch, mode } = useThemeContext();

  const settingsItems = [
    { name: "Change Password", path: "./changepassword" },
    { name: "Delete Account", path: "./deleteuser" },
  ];

  const handleThemeChange = (event) => {
    const theme = event.target.value.toUpperCase(); // Get the selected value (System Default, Light, Dark)
    dispatch({
      type: theme,
      payload: window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light",
    });
    setOpenSettings(false);
  };

  return (
    <div className={`absolute w-2/3 md:w-1/2 p-4 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/3 rounded-2xl z-10 shadow-2xl shadow-slate-600 ${mode == "dark" ? "bg-gray-800" : "bg-gray-200"}`}>
      <div className={`flex items-center justify-between mb-8 ${mode == "dark" && "text-gray-200"}`}>
        <h2 className="text-xl md:text-2xl font-semibold">Settings</h2>
        <button
          onClick={() => setOpenSettings(false)}
          className="text-lg border-2 border-gray-700 rounded-md px-1 py-0 md:px-3 md:py-1"
        >
          X
        </button>
      </div>
      <div className="px-5 md:px-10 text-center">
        <select
          className="text-center w-full mb-2 text-sm md:text-md cursor-pointer px-3 py-2 bg-slate-300 hover:bg-slate-400 rounded-md duration-200"
          onChange={handleThemeChange} // Handle theme change on selection
          value={
            mode === "default" ? "default" : mode === "light" ? "light" : "dark"
          } // Controlled by React
        >
          <option value="default" className="text-sm">
            System Default
          </option>
          <option value="light" className="text-sm">
            Light
          </option>
          <option value="dark" className="text-sm">
            Dark
          </option>
        </select>
        <ul>
          {settingsItems &&
            settingsItems.map((item, index) => (
              <Link key={index} to={item.path} className="w-full">
                <li className={`py-2 px-3 border border-gray-500 mb-2 rounded-md text-sm md:text-md hover:bg-gray-500 hover:text-white duration-200 ${mode == "dark" && "text-gray-200"}`}>
                  {item.name}
                </li>
              </Link>
            ))}
        </ul>
        <button
          onClick={() => logout()}
          className="flex w-full items-center justify-center gap-2 text-sm md:text-md cursor-pointer px-3 py-2 bg-slate-300 hover:bg-slate-400 rounded-md duration-200"
        >
          Logout <IoLogOutOutline className="text-gray-950" />
        </button>
      </div>
    </div>
  );
}

export default Settings;
