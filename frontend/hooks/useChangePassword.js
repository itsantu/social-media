import { useState } from "react";

export const useChangePassword = () => {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isloading, setIsloading] = useState(null);

  const changePassword = async (email, currentPassword, newPassword, confirmPassword) => {
    if (newPassword != confirmPassword) {
        setError("Password and Confirm password must be same")
        return;
    }
    if (!currentPassword  || !newPassword || !confirmPassword) {
        setError("All fields must be filled")
        return;
    }

    setIsloading(true);
    setError(null);

    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/user/change-password`, {
      method: "PATCH",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ email, currentPassword, newPassword }),
    });

    const json = await response.json();

    if (!response.ok) {
      setIsloading(false);
      setError(json.error);
    }
    if (response.ok) {
      setSuccess(json.success)
      setIsloading(false);
    }
  };

  return { changePassword, isloading, error, success }
};
