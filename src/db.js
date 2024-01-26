import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const URI =
  process.env.MONGO_URI ||
  "mongodb+srv://rgauna:Rjg.12779@cluster0.5iwtzcp.mongodb.net/mern?retryWrites=true&w=majority";

export const connectDB = async () => {
  try {
    await mongoose.connect(URI);
    console.log(">>> MongoDB is connected");
  } catch (error) {
    console.log(error);
  }
};
