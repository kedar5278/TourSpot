const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Check if .env is loaded
console.log("==================================");
console.log("Server Starting...");
console.log("PORT:", process.env.PORT);
console.log("RAZORPAY_KEY_ID:", process.env.RAZORPAY_KEY_ID);
console.log("==================================");

// Test Route
app.get("/", (req, res) => {
  res.send("Express Server Running...");
});

// API to verify keys
app.get("/api/test", (req, res) => {
  res.json({
    success: true,
    message: "Environment Loaded Successfully",
    razorpayKey: process.env.RAZORPAY_KEY_ID,
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});