import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import chatRoutes from "./src/routes/chatRoutes.js";
const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/chat", chatRoutes);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
