import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

const URI = process.env.MONGO_URI;



export const connectDB = async () => {
  try {
    //Connect to a local mongodb database
    //await mongoose.connect("mongodb://localhost/tododb");

    //Connect to a mongodb Atlas
    await mongoose.connect(URI);
    console.log(">>> DB is connected");
  } catch (error) {
    console.log(error);
  }
};
