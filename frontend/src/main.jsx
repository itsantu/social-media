import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { PostListContextProvider } from "./context/PostContext.jsx";
import { AuthContextProvider } from "./context/AuthContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <PostListContextProvider>
        <App />
      </PostListContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
