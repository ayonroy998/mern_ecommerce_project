import jwt from "jsonwebtoken";
import { User } from "../Models/user.js";

export const isAthenticated = async (req, res, next) => {
  const token = req.header("Auth");

  if (!token) {
    return res.status(401).json({
      message: "No token, authorization denied!! please login first!!",
      success: false,
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.REACT_APP_MY_TOKEN);
    const id = decoded.id;
    let user = await User.findById(id);
    if (!user) {
      return res.status(401).json({
        message: "User not found.",
        success: false,
      });
    }
    req.user = user;
    next();
  } catch (err) {
    return res
      .status(401)
      .json({ message: "Invalid or expired token", success: false });
  }
};
