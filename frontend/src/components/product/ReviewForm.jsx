import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ReviewForm = ({ onReviewSubmit }) => {
  const { id } = useParams();
  const url = "https://mern-ecommerce-techproject.onrender.com";

  const [rating, setRating] = useState(1);
  const [hover, setHover] = useState(null);
  const [comment, setComment] = useState("");
  const [message, setMessage] = useState("");
  const [token, setToken] = useState([]);
  const [isAuthenti, setIsAuthenti] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
      setIsAuthenti(true);
    }
  });

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${url}/review/add/${id}`,
        { rating, comment },
        {
          headers: {
            "Content-Type": "application/json",
            Auth: token,
          },
          withCredentials: true,
        }
      );
      toast.success(response.data.message, {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });

      setMessage(response.data.message);
      onReviewSubmit();
      setRating(1);
      setHover(null);
      setComment("");
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to submit review");
    }
  };

  return (
    <div
      className="container product_review justyfy-content-center"
      style={{ marginLeft: "1230px", width: "50%" }}
    >
      <h4>Review & Ratings</h4>
      {message && <p>{message}</p>}
      <form onSubmit={submitHandler}>
        <div className="my-4">
          <div className="mx-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar
                key={star}
                size={22}
                color={star <= (hover || rating) ? "#ffc107" : "#d4d4d8"}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(null)}
                onClick={() => setRating(star)}
                style={{ cursor: "pointer", marginRight: "7px" }}
              />
            ))}
          </div>
        </div>
        <div className="mb-3" style={{ marginLeft: "-7px" }}>
          <div style={{ fontWeight: "600" }}>
            <label>Comment: </label>
          </div>
          <textarea
            className="border-0"
            style={{ width: "220px", height: "60px" }}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="mx-5">
          <button
            className="submit-button position-relative d-block mx-auto py-2 px-3 fs-7 fw-bold overflow-hidden border-0 ms-2"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReviewForm;
