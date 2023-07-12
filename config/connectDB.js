import mongoose from "mongoose";
import colors from "colors";

const connectDB = () => {
  // @Connect to database
  mongoose
    .connect(process.env.MONGO_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    .then(() => {
      console.log(`Connected To Databse`.bgGreen.white);
    })
    .catch((err) => {
      console.log(`Database Error`.bgRed.white);
    });
};

export default connectDB;
