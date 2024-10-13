import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useThemeContext } from "../hooks/useThemeContext";

// pages and components
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home";
import PostForm from "./components/PostForm/PostForm";
import EditForm from "./components/PostForm/EditForm";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import About from "./pages/About";
import ChangePassword from "./components/User/ChangePassword";
import DeleteUser from "./components/User/DeleteUser";
import ForgotPasswordEmail from "./components/User/ForgotPasswordEmail";
import ForgotPWPage from "./components/User/ForgotPWPage";

function App() {
  const { user } = useAuthContext();
  const { mode } = useThemeContext(); 
  
  useEffect(() => {
    if (mode === 'dark') {
      document.body.style.backgroundColor = '#1a202c'; 
    } else {
      document.body.style.backgroundColor = '#f7fafc'; 
    }

    // Optional cleanup to avoid issues when component unmounts
    return () => {
      document.body.style.backgroundColor = '';
    };
  }, [mode]); // Re-run when mode changes

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={user ? <Home /> : <Navigate to="/signup" />}
          />
          <Route
            path="/upload"
            element={user ? <PostForm /> : <Navigate to="/signup" />}
          />
          <Route
            path="/update"
            element={user ? <EditForm /> : <Navigate to="/signup" />}
          />
          <Route
            path="/about"
            element={user ? <About /> : <Navigate to="/signup" />}
          />
          <Route
            path="about/changepassword"
            element={user ? <ChangePassword /> : <Navigate to="/signup" />}
          />
          <Route
            path="about/deleteuser"
            element={user ? <DeleteUser /> : <Navigate to="/signup" />}
          />
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/" />}
          />
          <Route
            path="/login/forgot-password-email"
            element={!user ? <ForgotPasswordEmail /> : <Navigate to="/" />}
          />
          <Route
            path="/login/forgot-password"
            element={!user ? <ForgotPWPage /> : <Navigate to="/" />}
          />
          <Route
            path="/signup"
            element={!user ? <Signup /> : <Navigate to="/" />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
