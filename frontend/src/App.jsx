import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// pages and components
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import PostForm from "./components/PostForm";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element=<Home /> />
          <Route path="/upload" element=<PostForm /> />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
