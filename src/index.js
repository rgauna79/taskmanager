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

    // const currentDirectory = process.cwd();
    // console.log(`Current directory: ${currentDirectory}`);

    // const clientPath = path.resolve('client');
    // fs.readdir(clientPath, (err, files) => {
    //   if (err) {
    //     console.error("Error reading client directory:", err);
    //   } else {
    //     console.log("Files and directories in 'client':", files);
    //   }
    // });

    // const srcPath = path.resolve('src');
    // fs.readdir(srcPath, (err, files) => {
    //   if (err) {
    //     console.error("Error reading src directory:", err);
    //   } else {
    //     console.log("Files and directories in 'src':", files);
    //   }
    // });

    // const servingPath = path.resolve('client', 'dist');
    // console.log(`Serving files from: ${servingPath}`);
  } catch (error) {
    console.log(error);
  }
}

main();
