import { Review } from "../Models/review.js";
import { Product } from "../Models/product.js";
import mongoose from "mongoose";

export const addReview = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    const { rating, comment } = req.body;
    const user = req.user;

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const review = new Review({
      rating,
      comment,
      product: product._id,
      user,
    });

    product.review.push(review);
    await review.save();
    await product.save();

    res.status(201).json({ message: "Review added successfully", review });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getReviews = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate({
      path: "review",
      populate: {
        path: "user",
        select: "name email",
      },
    });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      message: "Reviews retrieved successfully",
      reviews: product.review,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const editReview = async (req, res) => {
  const { reviewId } = req.params;
  const { rating, comment } = req.body;

  try {
    // Find the review by ID
    const review = await Review.findById(reviewId);

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    // Update the review
    if (!rating || !comment) {
      return res.status(400).json({ message: "Invalid input" });
    }

    // Find and update the review
    const updatedReview = await Review.findByIdAndUpdate(
      reviewId,
      { rating, comment },
      { new: true }
    );

    if (!updatedReview) {
      return res.status(404).json({ message: "Review not found" });
    }

    res.status(200).json(updatedReview);

    const product = await Product.findById(review.product);
    if (product) {
      await product.save();
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const deleteReview = async (req, res) => {
  const { reviewId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(reviewId)) {
    return res.status(400).json({ message: "Invalid review ID format" });
  }

  try {
    const review = await Review.findById(reviewId);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    // Find the associated product
    const product = await Product.findById(review.product);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Update the product’s review array by removing the review
    product.review = product.review.filter(
      (r) => r.toString() !== reviewId.toString()
    );
    await product.save();

    // Proceed to delete the review
    await Review.findByIdAndDelete(reviewId);

    res.json({ message: "Review deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
