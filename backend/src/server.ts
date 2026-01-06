import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db"
import authRoutes from "./routes/auth.routes";
import protectedRoutes from "./routes/protected.routes";
import taskRoutes from "./routes/task.routes";
import expenseRoutes from "./routes/expense.routes";
import { errorHandler } from "./middleware/error.middleware";


dotenv.config();
connectDB();

const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/protected", protectedRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/expenses", expenseRoutes);

app.use(errorHandler);

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true
  })
);

// Test route
app.get("/health", (_req, res) => {
  res.json({ status: "OK" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
