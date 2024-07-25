import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext} from '../hooks/useAuthContext'

// pages and components
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import PostForm from "./components/PostForm";
import EditForm from "./components/EditForm";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  const {user} = useAuthContext()

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={user ? <Home /> : <Navigate to="/login"/> }/>
          <Route path="/upload" element={user ? <PostForm /> : <Navigate to="/login"/>}/>
          <Route path="/update" element={user ? <EditForm /> : <Navigate to="/login"/>} />
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/"/>}/>
          <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/"/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
