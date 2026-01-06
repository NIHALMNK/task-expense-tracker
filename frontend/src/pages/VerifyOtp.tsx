import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../services/api";
import { AxiosError } from "axios";

interface LocationState {
  email: string;
}
interface ErrorResponse {
  message: string;
}

const VerifyOtp = () => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const location = useLocation();
  const state = location.state as LocationState | null;

  const email = state?.email;

  if (!email) {
    navigate("/login");
    return null;
  }

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await api.post("/auth/verify-otp", { email, otp });
      navigate("/dashboard");
    } catch (error) {
      const err = error as AxiosError<ErrorResponse>;
      alert(err.response?.data?.message || "Invalid OTP");
    }
  };

  return (
    <div>
      <h2>Verify OTP</h2>
      <form onSubmit={handleVerify}>
        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          required
          onChange={(e) => setOtp(e.target.value)}
        />
        <button type="submit">Verify</button>
      </form>
    </div>
  );
};

export default VerifyOtp;
