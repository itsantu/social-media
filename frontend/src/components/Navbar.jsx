import { Link } from "react-router-dom";

const Navbar = () => {
    const user = 1
  
    const handleLogOut = () => {};
  
    return (
      <header >
        <div className="container">
          <Link to="/">
            <h1 className="font-bold text-slate-600">Hello World</h1>
          </Link>
          <nav className="flex gap-2">
            {user ? (
              <div>
                <span>{"antumallick@gmail.com"}</span>
                <Link to="/upload" className="bg-green-400 mx-3 p-3 rounded-md hover:bg-green-500 hover:text-white duration-200">Add Post</Link>
                <button onClick={handleLogOut} className="bg-gray-200 p-3 rounded-md hover:bg-slate-600 hover:text-white duration-200">Log Out</button>
              </div>
            ) : (
              <div>
                <a href="#" className="bg-cyan-400 mr-4 py-3 px-5 rounded-md hover:bg-green-600 hover:text-white duration-200">Login</a>
                <a href="#" className="border-cyan-700 border-2 py-3 px-5 rounded-md hover:bg-cyan-700 hover:text-white duration-200" >SignUp</a>
              </div>
            )}
          </nav>
        </div>
      </header>
    );
  };
  
  export default Navbar;