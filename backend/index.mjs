import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import dbRoutes from "./src/dbRoutes.js";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// CORS configuration
const corsOptions = {
  origin: "*", // Allow all for now
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // Handle preflight requests

app.use(bodyParser.json());

// Health check route
app.get("/", (req, res) => {
  res.status(200).send("Server is running!");
});

// API Routes
app.use("/db", dbRoutes);

// Catch-all for 404 errors
app.use((req, res) => {
  res.status(404).json({ error: "Not Found" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
