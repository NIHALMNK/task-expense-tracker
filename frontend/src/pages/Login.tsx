import { useState } from "react";
import { AxiosError } from "axios";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

interface ErrorResponse {
  message: string;
}

const Login = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post("/auth/request-otp", { email });
      navigate("/verify-otp", { state: { email } });
    } catch (error) {
      const err = error as AxiosError<ErrorResponse>;
      alert(err.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Sending OTP..." : "Send OTP"}
        </button>
      </form>
    </div>
  );
};

export default Login;
