import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useForgotPassword = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const changePasswordViaEmail = async (email, newPassword, confirmPassword) => {
    if (newPassword !== confirmPassword) {
      setError("Password and Confirm password must be the same");
      return;
    }
    if (!newPassword || !confirmPassword) {
      setError("All fields must be filled");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_BASE_URL}/api/user/forgot-password`,
        { email, newPassword },
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.status == 200) {
        navigate("/login");
      } else {
        setError(response?.data?.error);
      }
    } catch (error) {
      setError(error.message);
    } finally {        
      setIsLoading(false);
    }
  };

  return { changePasswordViaEmail, error, isLoading };
};

export default useForgotPassword;
