import express from "express";
import {
  addReview,
  deleteReview,
  editReview,
  getReviews,
} from "../Controllers/review.js";

import { isAthenticated } from "../Middlewares/auth.js";

const router = express.Router();

// add a review
router.post("/add/:id", isAthenticated, addReview);
//get review
router.get("/get/:id", getReviews);
//edit review
router.put("/edit/:reviewId", isAthenticated, editReview);
//delete review
router.delete("/delete/:reviewId", isAthenticated, deleteReview);

export default router;
