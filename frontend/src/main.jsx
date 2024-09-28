import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { PostListContextProvider } from "./context/PostContext.jsx";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import { ThemeContextProvider } from "./context/ThemeContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeContextProvider>
      <AuthContextProvider>
        <PostListContextProvider>
          <App />
        </PostListContextProvider>
      </AuthContextProvider>
    </ThemeContextProvider>
  </React.StrictMode>
);
