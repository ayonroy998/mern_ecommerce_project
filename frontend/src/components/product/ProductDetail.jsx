import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { useParams } from "react-router-dom";
import axios from "axios";
import RelatedProduct from "./RelatedProduct";
import ReviewForm from "./ReviewForm";
import { CiDeliveryTruck } from "react-icons/ci";
import { TbReplace } from "react-icons/tb";
import { MdVerifiedUser } from "react-icons/md";
import { FaStar } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { FaArrowAltCircleUp } from "react-icons/fa";
import { FaArrowAltCircleDown } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { MdElectricBolt } from "react-icons/md";
import { MdOutlineModeEdit } from "react-icons/md";
import ReactImageMagnify from "react-image-magnify";
import EditReviewForm from "./EditReviewForm";

const ProductDetail = () => {
  const { id } = useParams();
  const url = import.meta.env.VITE_API_URL;

  const [product, setProduct] = useState();
  const [selectedImage, setSelectedImage] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const { addToCart, user } = useContext(AppContext);
  const [token, setToken] = useState([]);
  const [isAuthenti, setIsAuthenti] = useState(false);
  const [editingReviewId, setEditingReviewId] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await axios.get(`${url}/product/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      setProduct(response.data);
      setSelectedImage(response.data?.image);
    };
    fetchProduct();
  }, [id]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
      setIsAuthenti(true);
    }
  });

  const fetchReviews = async () => {
    const response = await axios.get(`${url}/review/get/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    setReviews(response.data.reviews);
  };

  useEffect(() => {
    fetchReviews();
  }, [id]);

  const handleReviewSubmit = () => {
    fetchReviews();
  };

  const deleteReview = async (reviewId) => {
    try {
      await axios.delete(`${url}/review/delete/${reviewId}`, {
        headers: {
          "Content-Type": "application/json",
          Auth: token,
        },
        withCredentials: true,
      });
      setReviews((prevReviews) =>
        prevReviews.filter((review) => review._id !== reviewId)
      );
    } catch (error) {
      console.error("Failed to delete review:", error);
    }
  };

  const handleReviewUpdate = async (reviewId, updatedData) => {
    try {
      await axios.put(`${url}/review/edit/${reviewId}`, updatedData, {
        headers: {
          "Content-Type": "application/json",
          Auth: token,
        },
        withCredentials: true,
      });
      fetchReviews();
      setEditingReviewId(null);
    } catch (error) {
      console.error("Failed to update review:", error);
    }
  };
  const currentUserId = user?._id;
  console.log("Current User ID:", currentUserId);

  const displayedReviews = showAllReviews ? reviews : reviews.slice(0, 2);
  {
    displayedReviews.length > 0 ? (
      displayedReviews.map((review) => {
        console.log("Review User ID:", review.user); //
      })
    ) : (
      <p>No reviews yet.</p>
    );
  }

  const handleBuyNow = async () => {
    try {
      const response = await axios.post(
        `${url}/payment/checkout`,
        {
          amount: product.price,
          cartItems: [{ productId: product._id, qty: 1 }],
          userShipping: user?.shippingAddress,
          userId: user._id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      // Redirect the user to the PayPal approval page
      const approvalLink = response.data.links.find(
        (link) => link.rel === "approve"
      );
      if (approvalLink) {
        window.location.href = approvalLink.href;
      }
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  return (
    <>
      <div className="containers text-center product-details-container d-flex align-items-center justify-content-around w-100 p-3">
        {/* Column of images */}
        <div
          className="sideimages"
          style={{ marginTop: "120px", marginLeft: "400px" }}
        >
          <div className="side_img">
            <img
              src={product?.image[0]}
              onClick={() => setSelectedImage(product?.image[0])}
              className="mb-2 border-0"
              style={{
                marginLeft: "-50px",
                height: "100px",
                width: "100px",
                cursor: "pointer",
              }}
              alt="Product 1"
            />
          </div>

          <div className="side_img">
            <img
              src={product?.image[1]}
              onClick={() => setSelectedImage(product?.image[1])}
              className="mb-2 border-0"
              style={{
                marginLeft: "-50px",
                height: "100px",
                width: "100px",
                cursor: "pointer",
              }}
              alt="Product 2"
            />
          </div>
          <div className="side_img">
            <img
              src={product?.image[2]}
              onClick={() => setSelectedImage(product?.image[2])}
              className="mb-2 border-0"
              style={{
                marginLeft: "-50px",
                height: "100px",
                width: "100px",
                cursor: "pointer",
              }}
              alt="Product 3"
            />
          </div>
          <div className="side_img">
            <img
              src={product?.image[3]}
              onClick={() => setSelectedImage(product?.image[3])}
              className="mb-2 border-0"
              style={{
                marginLeft: "-50px",
                height: "100px",
                width: "100px",
                cursor: "pointer",
              }}
              alt="Product 4"
            />
          </div>
        </div>

        {/* Selected image display */}

        <div
          className="left"
          style={{ width: "270px", height: "250px", marginLeft: "100px" }}
        >
          <ReactImageMagnify
            {...{
              smallImage: {
                alt: "Selected Product",
                isFluidWidth: true,
                src: selectedImage || product?.image[0],
              },
              largeImage: {
                src: selectedImage || product?.image[0],
                width: 500,
                height: 900,
              },
              className: "selected-image",
            }}
          />
        </div>

        {/* Product details */}
        <div
          className="right product-details p-2"
          style={{ gap: "1px", marginLeft: "150px", maxWidth: "300px" }}
        >
          <h4>{product?.title}</h4>
          <p style={{ fontWeight: "630" }} className="fs-7">
            MRP: &#8377;{product?.price}
          </p>
          <p>{product?.description}</p>
          <div className="d-flex mx-5">
            <div className="mx-2">
              <CiDeliveryTruck
                style={{
                  borderRadius: "50%",
                  backgroundColor: "#d4d4d8",
                }}
              />
              <p style={{ fontSize: "11px" }}>
                <b>free delivery</b>
              </p>
            </div>
            <div className="mx-2">
              <TbReplace
                style={{
                  borderRadius: "50%",
                  backgroundColor: "#d4d4d8",
                }}
              />
              <p style={{ fontSize: "11px" }}>
                <b>7 days replacement</b>
              </p>
            </div>
            <div className="mx-2">
              <MdVerifiedUser
                style={{
                  borderRadius: "50%",
                  backgroundColor: "#d4d4d8",
                }}
              />
              <p style={{ fontSize: "11px" }}>
                <b>2 years warranty</b>
              </p>
            </div>
          </div>
          <div className="my-4">
            <button
              className="btn mx-3"
              onClick={() =>
                addToCart(
                  product._id,
                  product.title,
                  product.description,
                  product.price,
                  1,
                  product.image,
                  product.category
                )
              }
            >
              <FaCartShopping /> ADD TO CART
            </button>
            <button className="btnss" onClick={handleBuyNow}>
              <MdElectricBolt /> BUY NOW
            </button>
          </div>
        </div>
      </div>

      <ReviewForm onReviewSubmit={handleReviewSubmit} />

      <div
        className="product_review d-flex flex-column"
        style={{
          marginLeft: "100px",
        }}
      >
        <h4 style={{ textDecoration: "underline" }}>Reviews</h4>
        {displayedReviews.length > 0 ? (
          displayedReviews.map((review) => (
            <div
              className="card text-center my-3 d-flex"
              key={review._id}
              style={{
                width: "240px",
                height: "80px",
              }}
            >
              <div
                className="review-container d-flex justify-content-between align-items-center"
                style={{
                  marginBottom: "10px",
                }}
              >
                {/* Review and Rating Section */}
                <div
                  className="review-content d-flex flex-column text-align-center"
                  style={{
                    flex: "1",
                  }}
                >
                  <div>
                    {Array.from({ length: review.rating }, (_, index) => (
                      <FaStar key={index} color="#ffc107" size={20} />
                    ))}
                  </div>
                  <p style={{ margin: "5px 0" }}>{review.comment}</p>
                </div>

                <div
                  className="review-actions d-flex flex-column "
                  style={{
                    alignItems: "flex-end",
                    marginLeft: "20px",
                  }}
                >
                  {/* Delete Button */}

                  {review.user._id === currentUserId && (
                    <>
                      <button
                        className="border-0 bg-transparent mb-1"
                        onClick={() => deleteReview(review._id)}
                        style={{ cursor: "pointer" }}
                      >
                        <FaTrash color="black" size={16} />
                      </button>

                      <button
                        className="border-0 bg-transparent"
                        onClick={() => setEditingReviewId(review._id)}
                        style={{ cursor: "pointer" }}
                      >
                        <MdOutlineModeEdit color="black" size={16} />
                      </button>
                      {editingReviewId === review._id && (
                        <EditReviewForm
                          review={review}
                          onUpdate={handleReviewUpdate}
                          onCancel={() => setEditingReviewId(null)}
                        />
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No reviews yet</p>
        )}
      </div>

      {reviews.length > 2 && (
        <div style={{ marginLeft: "200px" }}>
          <button
            className="bg-transparent border-0 textdecoration-none outline-none fs-6"
            onClick={() => setShowAllReviews(!showAllReviews)}
            style={{
              cursor: "pointer",
            }}
          >
            {showAllReviews ? <FaArrowAltCircleUp /> : <FaArrowAltCircleDown />}
          </button>
        </div>
      )}

      {/* Related products section */}
      <div>
        <RelatedProduct category={product?.category} />
      </div>
    </>
  );
};

export default ProductDetail;
