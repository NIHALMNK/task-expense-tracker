import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import VerifyOtp from "./pages/VerifyOtp";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Tasks from "./pages/Tasks";
import Expenses from "./pages/Expenses";


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tasks"
          element={
            <ProtectedRoute>
              <Tasks />
            </ProtectedRoute>
          }
        />
        <Route
  path="/expenses"
  element={
    <ProtectedRoute>
      <Expenses />
    </ProtectedRoute>
  }
/>


      </Routes>
    </BrowserRouter>
  );
};

export default App;
