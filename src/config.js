// "http://localhost:5173";
//https://jnqtjk-5173.csb.app/
import dotenv from "dotenv";
dotenv.config();

export const TOKEN_SECRET = process.env.TOKEN_SECRET || "some secret key";
export const FRONTEND_URL =
process.env.FRONTEND_URL|| "https://jnqtjk-5173.csb.app";
