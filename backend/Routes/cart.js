import express from "express";
import {
  addToCart,
  clearCart,
  decreaseQty,
  getUserCart,
  removeFromCart,
} from "../Controllers/cart.js";
import { isAthenticated } from "../Middlewares/auth.js";

const router = express.Router();

//add to cart
router.post("/add", isAthenticated, addToCart);
//get user cart
router.get("/:id", isAthenticated, getUserCart);
//remove one product from cart
router.delete("/remove/:productId", isAthenticated, removeFromCart);
//clear all from cart
router.delete("/clear/:userId", isAthenticated, clearCart);
//decrease quantity
router.post("/decrease/:productId", isAthenticated, decreaseQty);

export default router;
