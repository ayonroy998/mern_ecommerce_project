import express from "express";
import { checkout } from "../Controllers/Payment.js";

const router = express.Router();

//checkout
router.post("/checkout", checkout);



export default router;