import { createContext, useReducer, useEffect } from "react";

const ThemeContext = createContext();

const themeReducer = (state, action) => {
  switch (action.type) {
    case "DARK":
      return { ...state, mode: "dark" };
    case "LIGHT":
      return { ...state, mode: "light" };
    case "DEFAULT":
      return { ...state, mode: action.payload };
    default:
      return state;
  }
};

const ThemeContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(themeReducer, {
    mode: window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light",
  });

  // Listen to system color scheme changes
  useEffect(() => {
    const matchMedia = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = (e) => {
      const preferredMode = e.matches ? "dark" : "light";
      dispatch({ type: "DEFAULT", payload: preferredMode });
    };

    matchMedia.addEventListener("change", handleChange);

    // Cleanup listener on unmount
    return () => {
      matchMedia.removeEventListener("change", handleChange);
    };
  }, []);

  return (
    <ThemeContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeContext, ThemeContextProvider };
