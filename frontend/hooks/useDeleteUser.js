import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useDeleteUser = () => {
  const [error, setError] = useState(null);
  const [isloading, setIsloading] = useState(null);
  const { dispatch } = useAuthContext();

  const deleteUser = async (email, password) => {
    if (!password) {
      setError("Password field must be filled");
    }

    setIsloading(true);
    setError(null);

    const response = await fetch("https://social-media-fxfa.onrender.com/api/user/delete-user", {
      method: "DELETE",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const json = await response.json();

    if (!response.ok) {
      setIsloading(false);
      setError(json.error);
    }
    if (response.ok) {
      setIsloading(false);
      dispatch({ type: "LOGOUT" });
    }
  };

  return { deleteUser, isloading, error };
};
