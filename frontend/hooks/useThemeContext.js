import { useContext } from "react";
import { ThemeContext } from "../src/context/ThemeContext";

export const useThemeContext = () => {
    const context = useContext(ThemeContext)

    if (!context) {
        throw Error("useAuthContext must be used inside an AuthContextProvider")
    }

    return context;
}