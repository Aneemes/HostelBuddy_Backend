const express = require('express');
require("dotenv").config();
const mongoose = require('mongoose');


const app = express()

// Database Connection
mongoose
  .connect("mongodb://localhost:27017/hostelbuddy", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() =>
    console.log(
      "==============Mongodb Database Connected Successfully=============="
    )
  )
  .catch((err) => console.log("Database Not Connected !!!"));

// Run Server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log("Server is running on ", PORT);
});