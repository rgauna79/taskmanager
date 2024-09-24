import app from "./app.js";
import { connectDB } from "./db.js";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT;

async function main() {
  try {
    connectDB();
    app.listen(PORT);
    console.log("Server listening on port", PORT);
    console.log(`Current directory: ${process.cwd()}`); 
    console.log(`Serving files from: ${path.resolve('src', 'client', 'dist')}`); 
  
  } catch (error) {
    console.log(error);
  }
}

main();
