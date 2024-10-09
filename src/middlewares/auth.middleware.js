import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";
// import User from "../models/user.models.js";

const publicRoutes = ["/tasks"];

export const auth = async (req, res, next) => {
  try {
    let { token } = req.cookies;

    const authHeader = req.headers.authorization;
    console.log(
      "token status: ",
      !token,
      " authHeader content: ",
      authHeader.startsWith("Bearer ")
    );
    if (!token) {
      if (authHeader.startsWith("Bearer ")) {
        token = authHeader.split(" ")[1];
      }
    }
    console.log(token);

    if (publicRoutes.includes(req.path)) {
      console.log("checking token in task route");
      if (!token) {
        return res
          .status(401)
          .json({ message: "No token, authorization denied" });
      }
    }

    jwt.verify(token, TOKEN_SECRET, async (err, user) => {
      if (err) {
        console.error("JWT Verification Error:", err);
        return res.status(401).json({ message: "Invalid token" });
      }

      // if (req.method === "GET" && req.path === "/auth/verify") {
      //   const userFound = await User.findById(user.id);
      //   if (!userFound) {
      //     return res.status(401).json({ message: "User not found" });
      //   }
      //   return res.json({
      //     id: userFound._id,
      //     username: userFound.username,
      //     email: userFound.email,
      //   });
      // }

      req.user = user;
      next();
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
