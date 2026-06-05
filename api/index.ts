import express from "express";
import { connectDB } from "../backend/config/db";
import userRoutes from "../backend/routes/userRoutes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// DB connection
connectDB().catch(console.error);

// Routes
app.use("/api", userRoutes);

app.get("/api/health", (req, res) => {
  res.json({
    status: "healthy",
    service: "HealthMate Backend",
  });
});

export default app;
