import express from "express";
import { addAddress, getLatestAddress } from "../Controllers/address.js";
import { isAthenticated } from "../Middlewares/auth.js";

const router = express.Router();

//add aaddress
router.post("/add", isAthenticated, addAddress);
//getting latest user's address
router.get("/latest", isAthenticated, getLatestAddress);

export default router;
