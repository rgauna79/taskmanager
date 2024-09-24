import app from "./app.js";
import { connectDB } from "./db.js";
import dotenv from "dotenv";
import path from "path";
import fs from 'fs';
dotenv.config();

const PORT = process.env.PORT;

async function main() {
  try {
    connectDB();
    app.listen(PORT);
    console.log("Server listening on port", PORT);

    const currentDirectory = process.cwd();
    console.log(`Current directory: ${currentDirectory}`);

    fs.readdir(currentDirectory, (err, items) => {
      if (err) {
        console.error("Error reading current directory:", err);
      } else {
        items.forEach(item => {
          fs.stat(path.join(currentDirectory, item), (err, stats) => {
            if (err) {
              console.error(`Error getting stats for ${item}:`, err);
            } else {
              if (stats.isDirectory()) {
                console.log(`[DIR] ${item}`);
              } else {
                console.log(`[FILE] ${item}`);
              }
            }
          });
        });
      }
    });

    const servingPath = path.resolve('src', 'client', 'dist');
    console.log(`Serving files from: ${servingPath}`);
  } catch (error) {
    console.log(error);
  }
}

main();
