import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { Link } from "react-router-dom";
import { FaGreaterThan, FaLessThan } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import TopSellProduct from "./TopSellProduct";

const ShowProduct = () => {
  const { products, filterdata = [], addToCart } = useContext(AppContext);

  const [currentSlide, setCurrentSlide] = useState(0);

  const sliderImages = [
    "https://rukminim1.flixcart.com/fk-p-flap/1600/270/image/2152c9d0afe3352d.jpg?q=20",
    "https://rukminim1.flixcart.com/fk-p-flap/1600/270/image/614c92ccb25152fe.jpg?q=20",
    "https://rukminim1.flixcart.com/fk-p-flap/1600/270/image/50ba00cc44d3fa70.jpg?q=20",
    "https://rukminim1.flixcart.com/fk-p-flap/1600/270/image/3c93e011a12d4fea.jpg?q=20",
    "https://rukminim1.flixcart.com/fk-p-flap/1600/270/image/fb212593cc44b077.jpg?q=20",
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) =>
      prev === sliderImages.length - 1 ? 0 : prev + 1
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? sliderImages.length - 1 : prev - 1
    );
  };

  const normalProducts =
    filterdata?.filter((product) => !product.isTopSelling) || [];

  return (
    <>
      {/* Image Slider */}
      <div
        className="slider"
        style={{
          display: "flex",
          width: "100%",
          marginTop: "132px",
          position: "relative",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* Previous Button */}
        <button
          className="btn-container-left fs-6"
          style={{
            padding: "25px 10px",
            backgroundColor: "white",
            border: "none",
            height: "100px",
            borderRadius: "5px",
            position: "absolute",
            left: "10px",
            zIndex: "1",
          }}
          onClick={prevSlide}
        >
          <FaLessThan className="prev" />
        </button>

        {/* Slider Images */}
        <div
          className="slider_image"
          style={{ display: "flex", width: "100%" }}
        >
          <img
            style={{
              width: "100%",
              padding: "0px 10px",
              transition: "0.5s ease",
            }}
            src={sliderImages[currentSlide]}
            alt="slider"
          />
        </div>

        {/* Next Button */}
        <button
          className="btn-container-right fs-6"
          style={{
            padding: "25px 10px",
            backgroundColor: "white",
            border: "none",
            height: "100px",
            borderRadius: "5px",
            position: "absolute",
            right: "10px",
            zIndex: "1",
          }}
          onClick={nextSlide}
        >
          <FaGreaterThan className="next" />
        </button>
      </div>

      <TopSellProduct />

      <h3
        style={{
          marginLeft: "35px",
          fontFamily: "sans-serif",
          marginTop: "50px",
          fontWeight: "bold",
        }}
      >
        Explore & Keep shopping
      </h3>

      <div
        className="row row-cols-lg-5 row-cols-md-3 row-cols-sm-1 w-100 d-flex flex-wrap align-items-start justify-content-evenly p-1"
        style={{ marginTop: "80px", marginBottom: "100px", marginLeft: "20px" }}
      >
        {normalProducts.length > 0 ? (
          normalProducts.map((product) => (
            <div key={product._id} className="container">
              <div className="card text-center">
                <Link
                  to={`/product/${product._id}`}
                  className="image d-flex justify-content-center align-items-center p-1"
                >
                  <img
                    src={product.image}
                    className="card-img-top w-100 p-2"
                    style={{ borderRadius: "10px", height: "170px" }}
                    alt="Product"
                  />
                </Link>
                <div className="card-body p-0 mt-2">
                  <p className="card-title fw-bold fs-6">{product.title}</p>
                  <span className="card-text fw-bold p-0 px-3 fs-7">
                    &#8377; {product.price.toLocaleString("en-IN")}
                  </span>
                  <button
                    className="btn"
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
                </div>
              </div>
            </div>
          ))
        ) : (
          <p style={{ width: "100%" }} className="text-align-center">
            No products available
          </p>
        )}
      </div>
    </>
  );
};

export default ShowProduct;
