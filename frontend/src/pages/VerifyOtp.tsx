import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../services/api";

const VerifyOtp = () => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const email = (location.state as any)?.email;

  if (!email) {
    navigate("/login");
  }

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await api.post("/auth/verify-otp", { email, otp });
      navigate("/dashboard");
    } catch (err: any) {
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
