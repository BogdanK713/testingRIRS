import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import dbRoutes from "./src/dbRoutes.js";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();


const app = express();
const PORT = 3000;

const corsOptions = {
  origin: ["https://testing-rirs.vercel.app"], // Allow your Vercel frontend URL
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true, // Allow credentials if you use cookies or auth headers
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // Handle preflight requests

app.use(bodyParser.json());

// Routes
app.use("/db", dbRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
