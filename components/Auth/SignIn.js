// components/Login.js
import { useState } from "react";
import axios from "axios";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

export default function Login() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleSendOtp = async () => {
    if (!phoneNumber) {
      alert("Please enter a phone number.");
      return;
    }
    try {
      const res = await axios.post("http://localhost:4000/api/send-otp", {
        phoneNumber,
      });
      if (res.data.success) {
        setOtpSent(true);
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const res = await axios.post("http://localhost:4000/api/verify-otp", {
        phoneNumber,
        otp,
      });
      if (res.data.success) {
        setIsLoggedIn(true);
      } else {
        console.error("Backend returned error:", res.data.message);
        alert("Invalid OTP");
      }
    } catch (error) {
      console.error("Axios error:", error.message);
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
      }
      alert("Verification failed. Please try again.");
    }
  };

  const handleGoogleLoginSuccess = async (credentialResponse) => {
    const token = credentialResponse.credential;
    try {
      const res = await axios.post("http://localhost:4000/api/google-auth", {
        token,
      });
      if (res.data.success) {
        setIsLoggedIn(true);
        console.log("User info:", res.data.user);
      } else {
        alert("Google authentication failed.");
      }
    } catch (error) {
      console.error("Google login error:", error);
      alert("Google login failed.");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <GoogleOAuthProvider clientId="475816624295-iqvumfal9cn66aoch50na62lp2tjsmfp.apps.googleusercontent.com">
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Login with OTP or Google
          </h2>

          {!isLoggedIn ? (
            <>
              <input
                type="text"
                placeholder="Enter Mobile Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full p-2 mb-4 border rounded"
              />
              {otpSent && (
                <input
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full p-2 mb-4 border rounded"
                />
              )}
              <button
                onClick={otpSent ? handleVerifyOtp : handleSendOtp}
                className="w-full bg-red-500 text-white p-2 rounded mt-4"
              >
                {otpSent ? "Verify OTP" : "Send OTP"}
              </button>

              <div className="my-4 text-center text-gray-500">OR</div>

              <GoogleLogin
                onSuccess={handleGoogleLoginSuccess}
                onError={() => console.error("Google Login Failed")}
                className="w-full"
              />
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="w-full bg-gray-700 text-white p-2 rounded mt-4"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}
