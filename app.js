import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoute from "./routes/auth.js";

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

//middlewares
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