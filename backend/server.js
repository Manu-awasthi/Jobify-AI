import dotenv from "dotenv";
dotenv.config({ path: "./.env" }); // 👈 IMPORTANT

import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import analyzeRoute from "./routes/analyzeRoute.js";

const app = express();

/* ---------- Middleware ---------- */
app.use(cors({
  origin: "*", // replace with frontend URL later
  methods: ["GET", "POST"]
}));
app.use(express.json({ limit: "1mb" }));

/* ---------- Health Check ---------- */
app.get("/", (req, res) => {
  res.send("🚀 Jobify API is running");
});

/* ---------- Routes ---------- */
app.use("/api/analyze", analyzeRoute);

/* ---------- MongoDB ---------- */
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1);
  });

/* ---------- Server ---------- */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
