import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import colors from "colors";
import morgan from "morgan";
import dotenv from "dotenv";
import connectDB from "./config/connectDB";

//env config
dotenv.config();

// MongoDB connection
connectDB();

// rest object
const app = express();

// middlewares
app.use(express.json());
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// ROUTES
import userRoutes from "./routes/userRoutes";
app.use("/api/v1/user", userRoutes);

// Port
const PORT = process.env.PORT || 8080;

//listen
app.listen(PORT, () => {
  console.log(
    `Sever running on ${process.env.DEV_MODE} port ${PORT}`.bgBlue.white
  );
});
