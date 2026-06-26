const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

// Database Connection
const connectDB = require("./config/db");

// Routes
const authRoutes = require("./routes/authRoutes");
const testRoutes = require("./routes/testRoutes");
const roomRoutes = require("./routes/roomRoutes");
const studentRoutes = require("./routes/studentRoutes");
const complaintRoutes = require("./routes/complaintRoutes");
const feeRoutes = require("./routes/feeRoutes");
const attendanceRoutes =require("./routes/attendanceRoutes");
const messBillRoutes = require("./routes/messBillRoutes");
const receiptRoutes = require("./routes/receiptRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const qrRoutes = require("./routes/qrRoutes");
const scanRoutes = require("./routes/scanRoutes");
const emailRoutes = require("./routes/emailRoutes");

dotenv.config();

// Connect MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/rooms",roomRoutes);
app.use("/api/test", testRoutes);
app.use("/api/students",studentRoutes);
app.use("/api/complaints",complaintRoutes);
app.use("/api/fees",feeRoutes);
app.use("/api/attendance",attendanceRoutes);
app.use("/api/mess-bills",messBillRoutes);
app.use("/api/receipts",receiptRoutes);
app.use("/api/dashboard",dashboardRoutes);
app.use("/api/qr",qrRoutes);
app.use("/api/scan",scanRoutes);
app.use("/api/email", emailRoutes);


// Test Route
app.get("/", (req, res) => {
  res.send("HostelMate Backend Running...");
});

// Port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});