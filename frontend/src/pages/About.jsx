import { useAuthContext } from "../../hooks/useAuthContext";
import { Link } from "react-router-dom";
import { IoLogOutOutline } from "react-icons/io5";
import { useLogout } from "../../hooks/useLogout";
import { useState } from "react";
import { AiOutlineLinkedin } from "react-icons/ai";
import { FaLinkedin, FaInstagram, FaXTwitter  } from "react-icons/fa6";

const About = () => {
  const { user } = useAuthContext();
  const { logout } = useLogout();
  const [openSettings, setOpenSettings] = useState(false);
  const settingsItems = [
    { name: "Change Password", path: "./changepassword" },
    { name: "Delete Account", path: "./deleteuser" },
  ];

  const socialMediaLinks = [
    {href: "https://www.linkedin.com/in/antu-mallick-05140724a/", logo: <FaLinkedin/>},
    {href: "https://www.instagram.com/antu.87_/", logo: <FaInstagram/>},
    {href: "https://x.com/AntuMallick87?t=Jbc6iFx2PWxCRSFhQ3EMnA&s=08", logo: <FaXTwitter/>},
  ]

  return (
    <div className="relative">
      <div className="container  mx-auto px-10 py-10 rounded-3xl shadow-2xl w-screen md:max-w-[600px] mt-24">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-3xl font-semibold ">@{user.uname}</h2>
          <button
            className="bg-slate-200 py-2 px-3 text-sm md:py-3  md:px-5 rounded-md hover:bg-slate-400 font-semibold hover:text-white duration-200"
            onClick={() => setOpenSettings(!openSettings)}
          >
            Settings
          </button>
        </div>
        <h3 className="font-bold mb-4">Email: </h3>
        <input
          type="text"
          value={user.email}
          disabled={true}
          readOnly={true}
          className=" w-full bg-slate-200 py-2 px-1 rounded-sm mb-6"
        />
        <hr className="border-t-2 border-gray-300 my-4 w-full" />
        <div className="flex items-center gap-2">
          <p className="text-cyan-800 text-sm">
            Made with ❤️ by{" "}
            <span className="text-gray-800 font-semibold cursor-pointer">
              <a href="https://github.com/itsantu/" target="_blank">
                Antu.
              </a>
            </span>
          </p>
          {socialMediaLinks && socialMediaLinks.map((item, index) => (
            <a key={index} href={item.href} className="text-lg mr-1">{item.logo}</a>
          ))}
        </div>
      </div>

      {openSettings && (
        <div className="absolute w-2/3 md:w-1/2 p-4 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/3 rounded-2xl z-10 bg-gray-200 shadow-2xl shadow-slate-600">
          <div className="flex items-center justify-between mb-8 ">
            <h2 className="text-xl md:text-2xl font-semibold">Settings</h2>
            <button
              onClick={() => setOpenSettings(false)}
              className="text-lg border-2 border-gray-700 rounded-md px-1 py-0 md:px-3 md:py-1"
            >
              X
            </button>
          </div>
          <div className="px-5 md:px-10 text-center">
            <button className="flex w-full mb-2 items-center justify-center gap-2 text-sm md:text-md cursor-pointer px-3 py-2 bg-slate-300 hover:bg-slate-400 rounded-md duration-200">
              Theme
            </button>
            <ul>
              {settingsItems &&
                settingsItems.map((item, index) => (
                  <Link key={index} to={item.path} className="w-full">
                    <li className="py-2 px-3 border border-gray-500 mb-2 rounded-md text-sm md:text-md hover:bg-gray-500 hover:text-white duration-200">
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
      )}
    </div>
  );
};

export default About;
