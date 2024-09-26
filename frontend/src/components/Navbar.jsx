import { Link } from "react-router-dom";
import { useLogout } from "../../hooks/useLogout";
import { useAuthContext } from "../../hooks/useAuthContext";
import { CgProfile } from "react-icons/cg";
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
    const {user} = useAuthContext()
    const {logout} = useLogout()
  
    const handleLogOut = () => {
      logout()
    };
  
    return (
      <header className="sticky top-0 bg-white shadow-md z-10">
        <div className="container">
          <Link to="/">
            <h1 className="font-bold text-2xl  md:text-4xl text-slate-800">Hello World</h1>
          </Link>
          <nav className="flex items-center gap-2">
            {user ? (
              <div className="flex items-center py-2 gap-2">
                <Link
                    to="/upload"
                    className="bg-green-400 py-2 px-3 rounded-md hover:bg-green-500 hover:text-white duration-200 text-sm md:text-lg md:ml-4"
                  >
                    Add Post
                  </Link>
              <Link to="/about">
                {/* <span className="hover:bg-slate-900 hover:text-white duration-200 border-slate-900 rounded-md p-2  border-2 flex justify-center items-center gap-2 text-md md:text-xl md:mb-0"> */}
                  {/* <CgProfile className="text-3xl"/> */}
                  <FaUserCircle className="text-3xl md:text-4xl md:ml-2 text-cyan-950"/>
                  {/* {user.uname}
                </span> */}
                </Link>
                {/* <div className="md:ml-auto flex items-center gap-3">
                  <Link
                    to="/upload"
                    className="bg-green-400 p-3 rounded-md hover:bg-green-500 hover:text-white duration-200 text-sm md:text-lg md:ml-4"
                  >
                    Add Post
                  </Link>
                  <button
                    onClick={handleLogOut}
                    className="bg-gray-200 p-3 rounded-md text-sm md:text-lg hover:bg-slate-600 hover:text-white duration-200"
                  >
                    Log Out
                  </button>
                </div> */}
              </div>
              
            ) : (
              <div className="py-5">
                <Link to="/login" className="bg-slate-200  mr-4 py-2 px-3 text-sm md:py-3  md:px-5 rounded-md hover:bg-slate-400 hover:text-white duration-200">Login</Link>
                <Link to="/signup" className="border-cyan-700 border-2 py-2 px-3 text-sm md:py-3  md:px-5 rounded-md hover:bg-cyan-700 hover:text-white duration-200" >SignUp</Link>
              </div>
            )}
          </nav>
        </div>
      </header>
    );
  };
  
  export default Navbar;