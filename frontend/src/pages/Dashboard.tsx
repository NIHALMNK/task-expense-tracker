import api from "../services/api";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const logout = async () => {
    await api.post("/auth/logout");
    navigate("/login");
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <p>You are logged in.</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Dashboard;
