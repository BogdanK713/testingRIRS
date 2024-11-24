import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import dbRoutes from "./src/dbRoutes.js";
import cors from "cors";

const app = express();
const PORT = 3000;

// CORS Configuration
const corsOptions = {
  origin: "http://localhost:5173", // Allow requests from frontend
  credentials: true,              // Allow credentials (cookies, headers, etc.)
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Parse JSON requests
app.use(bodyParser.json());

// API Routes
app.use("/db", dbRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
