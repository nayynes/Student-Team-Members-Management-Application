const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const memberRoutes = require("./routes/memberRoutes");

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// serve uploaded images
app.use("/uploads", express.static("uploads"));

// connect DB
mongoose.connect("mongodb://127.0.0.1:27017/teamDB")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// routes
app.use("/api", memberRoutes);

// start server
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});