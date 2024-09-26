import axios from "axios";
import { useState } from "react";

const useSendOtp = () => {
  const [OTP, setOTP] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otpError, setOtpError] = useState(null);

  const sendOtp = async ( email, typeOfRequest, requiredFile) => {
    setLoading(true);
    setOtpError(false); // Reset any previous errors
    try {
      const response = await axios.post(
        "https://social-media-fxfa.onrender.com/api/user/get-otp",
        { email, typeOfRequest, requiredFile },
        { headers: { "Content-Type": "application/json" } }
      );
  
      if (response.status === 201) {
        setOtpSent(true); // OTP successfully sent
      } else if (response.status === 302) {
        setOtpError("Email already in use."); // Handle specific status
      } else {
        setOtpError("Something went wrong. Please try again."); // Handle unexpected statuses
      }
    } catch (error) {
      setOtpError(error.response?.data?.error || "Failed to send OTP.");
    } finally {
      setLoading(false); // Reset loading state regardless of success or error
    }
  };
  

  return { sendOtp, otpError, loading, OTP, setOTP, otpSent };
};

export default useSendOtp;
