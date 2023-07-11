import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import colors from "colors";
import morgan from "morgan";
import dotenv from "dotenv";

//env config
dotenv.config();

// rest object
const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// routes
app.get("/", (req, res) => {
  res.send("<h1>Home Page</h1>");
});

// Port
const PORT = process.env.PORT || 8080;

//listen
app.listen(PORT, () => {
  console.log(
    `Sever running on ${process.env.DEV_MODE} port ${PORT}`.bgBlue.white
  );
});
