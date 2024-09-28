import express from "express";
import {
  signup,
  login,
  getAllUsers,
  getProfile,
  updateUsers,
  deleteUserById,
} from "../Controllers/user.js";
import { isAthenticated } from "../Middlewares/auth.js";

const router = express.Router();

//signup user
router.post("/signup", signup);

//login user
router.post("/login", login);

//get all users
router.get("/all", getAllUsers);

//update user
router.put("/:id", updateUsers);

//delete user
router.delete("/delete/:id", deleteUserById);

//get user profile
router.get("/profile", isAthenticated, getProfile);

export default router;
