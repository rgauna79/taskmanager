import User from "../models/user.models.js";
import bcrypt from "bcryptjs";
import { createAccessToken } from "../libs/jwt.js";
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";

const isProduction = process.env.NODE_ENV === "production";

export const register = async (req, res) => {
  try {
    const { email, password, username } = req.body;

    const userFound = await User.findOne({ email });

    if (userFound)
      return res.status(400).json({
        message: ["The email is already in use"],
      });

    // Hashing Password
    const passwordHash = await bcrypt.hash(password, 10);

    // Creating a new user
    const newUser = new User({
      username,
      email,
      password: passwordHash,
    });

    // Saving the user in database
    const userSaved = await newUser.save();

    //create acces token
    const token = await createAccessToken({ id: userSaved._id });

    // Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "lax" : "none",
    });

    res.json({
      id: userSaved._id,
      username: userSaved.username,
      email: userSaved.email,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userFound = await User.findOne({ email });

    if (!userFound)
      return res.status(400).json({
        message: ["User not found"],
      });

    const isMatch = await bcrypt.compare(password, userFound.password);

    if (!isMatch)
      return res.status(400).json({
        message: ["Incorrect password"],
      });

    const token = await createAccessToken({
      id: userFound._id,
      username: userFound.username,
    });
    // Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "lax" : "none",
    });

    res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      token: token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const logout = (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    secure: isProduction,
    sameSite: "none",
    expires: new Date(0),
  });
  return res.sendStatus(200);
};

// export const profile = async (req, res) => {
//   const userFound = await User.findById(req.user.id);

//   if (!userFound) return res.status(400).json({ message: "User Not found" });

//   return res.json({
//     id: userFound._id,
//     username: userFound.username,
//     email: userFound.email,
//     createdAt: userFound.createdAt,
//     updatedAt: userFound.updatedAt,
//   });
// };

export const verifyToken = async (req, res) => {
  try {
    const { token } = req.cookies;
    if (!token) return res.status(401).json({ message: "Token not provided" });

    jwt.verify(token, TOKEN_SECRET, async (error, user) => {
      if (error) {
        console.error("JWT Verification Error:", error);
        return res.status(401).json({ message: "Invalid token" });
      }

      const userFound = await User.findById(user.id);
      if (!userFound)
        return res.status(401).json({ message: "User not found" });

      return res.json({
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
      });
    });
  } catch (error) {
    res.status(500).json({ message: "Server error while verifying token" });
  }
};
