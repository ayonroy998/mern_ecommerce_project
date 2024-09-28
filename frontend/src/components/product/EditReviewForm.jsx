// EditReviewForm.js
import React, { useState } from "react";

const EditReviewForm = ({ review, onUpdate, onCancel }) => {
  const [rating, setRating] = useState(review.rating);
  const [comment, setComment] = useState(review.comment);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(review._id, { rating, comment });
  };

  return (
    <form onSubmit={handleSubmit} className=" card edit-review-form position-absolute text-center d-flex" style={{height:"200px",gap:"1px"}}>
      <h4>Edit Review</h4>
      <div>
        <label>Rating:</label>
        <input
          type="number"
          min="1"
          max="5"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Comment:</label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        ></textarea>
      </div>
      <button type="submit">Update Review</button>
      <button type="button" onClick={onCancel}>Cancel</button>
    </form>
  );
};

export default EditReviewForm;
