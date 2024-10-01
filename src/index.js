import app from "./app.js";
import { connectDB } from "./db.js";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";
dotenv.config();

const PORT = process.env.PORT;
async function main() {
  try {
    connectDB();
    app.listen(PORT);
    console.log("Server listening on port", PORT);
  } catch (error) {
    console.log(error);
  }
}

main();
