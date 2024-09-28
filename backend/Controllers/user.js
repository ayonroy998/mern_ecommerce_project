import { User } from "../Models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//signup
export const signup = async (req, res) => {
  const { userName, email, password } = req.body;
  try {
    if (!(userName && email && password)) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }

    let existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ message: "User already exists", success: false });
    }

    const hashpass = await bcrypt.hash(password, 10);
    existingUser = await User.create({ userName, email, password: hashpass });

    return res.json({ message: "User registered successfully", success: true });
  } catch (err) {
    return res.json({ message: err.message, success: false });
  }
};

//login
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.json({
        message: "User not found Please signup!!",
        success: false,
      });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.json({ message: "Invalid password", success: false });
    }

    const token = jwt.sign({ id: user._id }, process.env.REACT_APP_MY_TOKEN, {
      expiresIn: process.env.REACT_APP_MY_TOKEN_EXPIRE,
    });
    return res.json({
      message: `Login successful! welcome ${user.userName}`,
      token,
      success: true,
    });
  } catch (err) {
    return res.json({ message: err.message, success: false });
  }
};

//get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.json({ message: err.message, success: false });
  }
};

//update new user
export const updateUsers = async (req, res) => {
  const { id } = req.params;
  const updatedUser = req.body;

  try {
    const user = await User.findByIdAndUpdate(id, updatedUser, { new: true });
    res.json(user);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

//delete product by id (delete)
export const deleteUserById = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    res.json(user);
    if (!user) {
      return res.status(404).json({ message: "Invalid Id" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "sorry!! not to delete product by id" });
  }
};

//get profile
export const getProfile = async (req, res) => {
  res.json({ user: req.user });
};
