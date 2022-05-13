const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoute = require("./routes/auth")
require('dotenv').config();
const app = express();

// Database Connection
const connect = async () => {
    try {
      await mongoose.connect("mongodb://localhost:27017/HOSTEL_HUB");
      console.log("database connected.");
    } catch (error) {
      throw error;
    }
};
mongoose.connection.on("disconnected", () => {
    console.log("database disconnected!");
});

//middlewares
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoute);


app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";
    return res.status(errorStatus).json({
      success: false,
      status: errorStatus,
      message: errorMessage,
      stack: err.stack,
    });
});
  
  
  
  
  // Run Server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
connect();
console.log("Server is running on ", PORT);
});