import { Link } from "react-router-dom";
import { useLogout } from "../../hooks/useLogout";
import { useAuthContext } from "../../hooks/useAuthContext";

const Navbar = () => {
    const {user} = useAuthContext()
    const {logout} = useLogout()
  
    const handleLogOut = () => {
      logout()
    };
  
    return (
      <header>
        <div className="container">
          <Link to="/">
            <h1 className="font-bold text-xl text-slate-800">Hello World</h1>
          </Link>
          <nav className="flex gap-2">
            {user ? (
              <div>
                <span>{user.uname}</span>
                <Link to="/upload" className="bg-green-400 mx-3 p-3 rounded-md hover:bg-green-500 hover:text-white duration-200">Add Post</Link>
                <button onClick={handleLogOut} className="bg-gray-200 p-3 rounded-md hover:bg-slate-600 hover:text-white duration-200">Log Out</button>
              </div>
            ) : (
              <div>
                <Link to="/login" className="bg-cyan-400 mr-4 py-3 px-5 rounded-md hover:bg-green-600 hover:text-white duration-200">Login</Link>
                <Link to="/signup" className="border-cyan-700 border-2 py-3 px-5 rounded-md hover:bg-cyan-700 hover:text-white duration-200" >SignUp</Link>
              </div>
            )}
          </nav>
        </div>
      </header>
    );
  };
  
  export default Navbar;