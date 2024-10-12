import { Link } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import { FaUserCircle } from "react-icons/fa";
import { useThemeContext } from "../../hooks/useThemeContext";

const Navbar = () => {
  const { user } = useAuthContext();
  const { mode } = useThemeContext();

  return (
    <header className={`sticky top-0 shadow-md z-20 ${mode == 'dark' ? "bg-slate-800" : "bg-white"}`}>
      <div className="container">
        <Link to="/">
          <h1 className={`font-bold text-3xl  md:text-4xl text-slate-800 ${mode == 'dark' && "text-white"}`}>
            Hello World
          </h1>
        </Link>
        <nav className="flex items-center gap-2">
          {user ? (
            <div className="flex items-center py-2 gap-2">
              <Link
                to="/upload"
                className="bg-green-500 py-2 px-3 rounded-md hover:bg-green-700 hover:text-white duration-200 text-md md:text-lg md:ml-4"
              >
                Add Post
              </Link>
              <Link to="/about">
                <FaUserCircle className={`text-4xl ml-1 mr-1 ${mode == 'dark' ? "text-slate-100" : "text-cyan-950"}`} />
              </Link>
            </div>
          ) : (
            <div className="py-5">
              <Link
                to="/login"
                className="bg-slate-200  mr-4 py-2 px-3 text-sm md:py-3  md:px-5 rounded-md hover:bg-slate-400 hover:text-white duration-200"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className={`border-cyan-700 border-2 py-2 px-3 text-sm md:py-3  md:px-5 rounded-md hover:bg-cyan-700 hover:text-white duration-200 ${mode == 'dark' && "text-gray-100"}`}
              >
                SignUp
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
