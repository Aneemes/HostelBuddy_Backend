const express = require("express");
const path = require("path");

const app = express();
const cookieParser = require("cookie-parser");
const errorMiddleware = require("./middleware/errror");

// const __dirname = path.resolve();

app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

app.use(express.json());
app.use(cookieParser());

//Route imports

const user = require("./routes/userRoute");


const morgan = require("morgan");
app.use(morgan("dev"));


app.use("/api/v1", user);



//Middleware for errors
app.use(errorMiddleware);

module.exports = app;
