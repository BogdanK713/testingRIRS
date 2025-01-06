import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import dbRoutes from "./src/dbRoutes.js";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000; // Ensure we use the PORT Render assigns

// CORS configuration
const corsOptions = {
  origin: ["https://testing-rirs-d4ebz6fml-bogdans-projects-10589c63.vercel.app"], // Allow Vercel frontend
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  optionsSuccessStatus: 200,
};

// Apply CORS middleware
app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // Catch-all for preflight requests

// Middleware
app.use(bodyParser.json());

// Health check route (to confirm server is running)
app.get("/", (req, res) => {
  res.status(200).send("Server is up and running!");
});

// API Routes
app.use("/db", dbRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
