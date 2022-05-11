import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

const app = express();
dotenv.config();

// Database Connection
const connect = async () => {
  try {
    await mongoose.connect(process.env.DATABASE);
    console.log("database connected.");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("database disconnected!");
});




// Run Server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  connect();
  console.log("Server is running on ", PORT);
});