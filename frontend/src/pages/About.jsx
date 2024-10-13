import { useAuthContext } from "../../hooks/useAuthContext";
import { useState } from "react";
import { FaLinkedin, FaInstagram, FaXTwitter } from "react-icons/fa6";
import { useThemeContext } from "../../hooks/useThemeContext";
import Settings from "../components/About/Settings";

const About = () => {
  const { user } = useAuthContext();
  const { mode } = useThemeContext();
  const [openSettings, setOpenSettings] = useState(false);
  const socialMediaLinks = [
    {
      href: "https://www.linkedin.com/in/antu-mallick-05140724a/",
      logo: <FaLinkedin />,
    },
    { href: "https://www.instagram.com/antu.87_/", logo: <FaInstagram /> },
    {
      href: "https://x.com/AntuMallick87?t=Jbc6iFx2PWxCRSFhQ3EMnA&s=08",
      logo: <FaXTwitter />,
    },
  ];

  return (
    <div className="relative">
      <div className={`container  mx-auto px-10 py-10 rounded-3xl shadow-2xl w-screen md:max-w-[600px] mt-24 ${mode == 'dark' && "bg-gray-800"}`}>
        <div className="flex justify-between items-center mb-5">
          <h2 className={`text-3xl font-semibold ${mode == 'dark' && "text-gray-300"}`}>@{user.uname}</h2>
          <button
            className="bg-slate-300 py-2 px-3 text-sm md:py-3  md:px-5 rounded-md hover:bg-slate-400 font-semibold hover:text-white duration-200"
            onClick={() => setOpenSettings(!openSettings)}
          >
            Settings
          </button>
        </div>
        <h3 className={`font-bold mb-4 ${mode == 'dark' && "text-gray-300"}`}>Email: </h3>
        <input
          type="text"
          value={user.email}
          disabled={true}
          readOnly={true}
          className=" w-full bg-slate-400 py-2 px-1 rounded-xl mb-6"
        />
        <hr className="border-t-2 border-gray-300 my-4 w-full" />
        <div className="flex items-center gap-2">
          <p className={`text-cyan-800 text-sm ${mode == "dark" && "text-gray-400"}`}>
            Made with ❤️ by{" "}
            <span className={`text-gray-800 font-semibold cursor-pointer ${mode == "dark" && "text-white"}`}>
              <a href="https://github.com/itsantu/" target="_blank">
                Antu.
              </a>
            </span>
          </p>
          {socialMediaLinks &&
            socialMediaLinks.map((item, index) => (
              <a key={index} href={item.href} className={`text-lg mr-1 ${mode == "dark" && "text-gray-100"}`}>
                {item.logo}
              </a>
            ))}
        </div>
      </div>

      {openSettings && <Settings setOpenSettings={setOpenSettings} />}
    </div>
  );
};

export default About;
