import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import projectRoutes from "./routes/projectRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import teamRoutes from "./routes/teamRoutes.js";

dotenv.config();

const app = express();

// ✅ Configure CORS to allow your frontend domain(s)
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow Vercel preview URLs and production
      const allowedOrigins = [
        /\.vercel\.app$/,  // Any Vercel domain
        "http://localhost:5173"
      ];
      
      if (!origin || allowedOrigins.some(pattern => 
        pattern instanceof RegExp ? pattern.test(origin) : pattern === origin
      )) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
    credentials: true
  })
);

// ✅ Middleware
app.use(express.json());

// ✅ API Routes
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/team", teamRoutes);

// ✅ Root Test Route
app.get("/", (req, res) => {
  res.send("VZNX Workspace API is running successfully 🚀");
});

// ✅ Connect MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err.message));

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
