import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { toast } from "react-toastify";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isloading, setIsloading] = useState(null);
  const { dispatch } = useAuthContext();

  const signup = async (username, email, password, OTP) => {
    setIsloading(true);
    setError(null);

    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/user/signup`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ username, email, password, OTP }),
    });

    const json = await response.json();

    if (!response.ok) {
      setIsloading(false);
      setError(json.error);
    }
    if (response.ok) {
      // save the user to local storage
      localStorage.setItem("user", JSON.stringify(json));

      toast.success("Signed up successfully😀")
      //update the authContext
      dispatch({ type: "LOGIN", payload: json });
      setIsloading(false);
    }
  };
  return { signup, isloading, error };
};
