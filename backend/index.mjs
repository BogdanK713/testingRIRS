import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import dbRoutes from "./src/dbRoutes.js";
import cors from "cors";

const app = express();
const PORT = 3000;

// Configure CORS
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
  optionsSuccessStatus: 200,
};

// Middleware
app.use(cors(corsOptions)); // Apply CORS
app.options("*", cors(corsOptions)); // Handle preflight requests
app.use(bodyParser.json());

// Routes
app.use("/db", dbRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
