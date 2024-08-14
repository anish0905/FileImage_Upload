const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
require("dotenv").config();
const fileRoutes = require("./uploads/routes/fileRoutes");

const app = express();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Serve static files from the "uploads" directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Use routes
app.use("/api", fileRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the Express.js API!");
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
