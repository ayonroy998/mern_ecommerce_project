import React, { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { Link } from "react-router-dom";
import { FaArrowAltCircleUp } from "react-icons/fa";

const TopSellProduct = () => {
  const { filterdata, addToCart } = useContext(AppContext);
  const [visibleProductsCount, setVisibleProductsCount] = useState(5);

  const exProducts = [
    {
      _id: "66e9930096c19a3a6d1f6d66",
      title: "Apple iPhone 15",
      description: "Apple iPhone 15 (256 GB) - Green",
      qty: 1,
      price: 79990,
      image: [
        "https://m.media-amazon.com/images/I/71nvkHnPpZL._SL1500_.jpg",
        "https://m.media-amazon.com/images/I/517rnHvIKCL._SL1500_.jpg",
        "https://m.media-amazon.com/images/I/712CBkmhLhL._SL1500_.jpg",
        "https://m.media-amazon.com/images/I/61YNAYpY2cL._SL1500_.jpg",
      ],
      category: "mobile",
      isTopSelling: true,
    },
    {
      _id: "66ea469462ff516c8122d332",
      title: "boAt Lite SmartWatch",
      description:
        "boAt Wave Lite Smart Watch w/ 1.69 (4.2 cm) HD Display, Sleek Metal Bo…",
      qty: 1,
      price: 990,
      image: [
        "https://m.media-amazon.com/images/I/61DZclqQ4RL._SL1500_.jpg",
        "https://m.media-amazon.com/images/I/71k8YMYtoQL._SL1500_.jpg",
        "https://m.media-amazon.com/images/I/71VMbpdRc2L._SL1500_.jpg",
        "https://m.media-amazon.com/images/I/61rAPNT98qL._SL1500_.jpg",
      ],
      category: "smartwatch",
      isTopSelling: true,
    },
    {
      _id: "66ea512962ff516c8122d3ac",
      title: "Oneplus Bullets Z2",
      description:
        "Oneplus Bullets Z2 Bluetooth Wireless in Ear Earphones with Mic, Bombastic Bass - 12.4 mm Drivers, 10 Mins Charge - 20 Hrs Music, 30 Hrs Battery Life, IP55...",
      qty: 1,
      price: 1799,
      image: [
        "https://m.media-amazon.com/images/I/51UhwaQXCpL._SL1500_.jpg",
        "https://m.media-amazon.com/images/I/51LkC94UraL._SL1500_.jpg",
        "https://m.media-amazon.com/images/I/51tdhnb9hBL._SL1500_.jpg",
        "https://m.media-amazon.com/images/I/61VyK3V84ML._SL1500_.jpg",
      ],
      category: "headphone",
      isTopSelling: true,
    },
    {
      _id: "66ea5e4662ff516c8122d3fb",
      title: "iQOO Z9 Lite 5G",
      description:
        "iQOO Z9 Lite 5G (Mocha Brown, 6GB RAM, 128GB Storage) | Dimensity 6300…",
      price: 11499,
      qty: 1,
      image: [
        "https://m.media-amazon.com/images/I/619VJYWIbXL._SL1200_.jpg",
        "https://m.media-amazon.com/images/I/71580M7qLKL._SL1200_.jpg",
        "https://m.media-amazon.com/images/I/617qNscwA-L._SL1200_.jpg",
        "https://m.media-amazon.com/images/I/71k3f4L1bhL._SL1200_.jpg",
      ],
      category: "mobile",
      isTopSelling: true,
    },
    {
      _id: "66ea691a62ff516c8122d43f",
      title: "Haier 175L Refrigerator",
      description:
        "Haier 175 L, 2 Star, Direct-Cool Single Door Refrigerator (HED-182RS-N…",
      price: 11790,
      qty: 1,
      image: [
        "https://m.media-amazon.com/images/I/51n6UQCp5LL._SL1500_.jpg",
        "https://m.media-amazon.com/images/I/71XbX8UiGLL._SL1500_.jpg",
        "https://m.media-amazon.com/images/I/71-CmcJgE9L._SL1500_.jpg",
        "https://m.media-amazon.com/images/I/71IEo2aSCtL._SL1500_.jpg",
      ],
      category: "fridge",
      isTopSelling: true,
    },
    {
      _id: "66ea6e7362ff516c8122d461",
      title: "Apple iPhone 14 Plus",
      description: "Apple iPhone 14 Plus (128 GB) - Midnight",
      price: 64999,
      qty: 1,
      image: [
        "https://m.media-amazon.com/images/I/61B0+qQriPL._SL1500_.jpg",
        "https://m.media-amazon.com/images/I/51tfF8TGyAL._SL1500_.jpg",
        "https://m.media-amazon.com/images/I/81pgJQgd4wL._SL1500_.jpg",
        "https://m.media-amazon.com/images/I/61Zs7cUrPAL._SL1500_.jpg",
      ],
      category: "mobile",
      isTopSelling: true,
    },
    {
      _id: "66ea6e7362ff516c8122d461",
      title: "Apple iPhone 14 Plus",
      description: "Apple iPhone 14 Plus (128 GB) - Midnight",
      price: 64999,
      qty: 1,
      image: [
        "https://m.media-amazon.com/images/I/61B0+qQriPL._SL1500_.jpg",
        "https://m.media-amazon.com/images/I/51tfF8TGyAL._SL1500_.jpg",
        "https://m.media-amazon.com/images/I/81pgJQgd4wL._SL1500_.jpg",
        "https://m.media-amazon.com/images/I/61Zs7cUrPAL._SL1500_.jpg",
      ],
      category: "mobile",
      isTopSelling: true,
    },
    {
      _id: "66ea6e7362ff516c8122d461",
      title: "Apple iPhone 14 Plus",
      description: "Apple iPhone 14 Plus (128 GB) - Midnight",
      price: 64999,
      qty: 1,
      image: [
        "https://m.media-amazon.com/images/I/61B0+qQriPL._SL1500_.jpg",
        "https://m.media-amazon.com/images/I/51tfF8TGyAL._SL1500_.jpg",
        "https://m.media-amazon.com/images/I/81pgJQgd4wL._SL1500_.jpg",
        "https://m.media-amazon.com/images/I/61Zs7cUrPAL._SL1500_.jpg",
      ],
      category: "mobile",
      isTopSelling: true,
    },
    {
      _id: "66ea6e7362ff516c8122d461",
      title: "Apple iPhone 14 Plus",
      description: "Apple iPhone 14 Plus (128 GB) - Midnight",
      price: 64999,
      qty: 1,
      image: [
        "https://m.media-amazon.com/images/I/61B0+qQriPL._SL1500_.jpg",
        "https://m.media-amazon.com/images/I/51tfF8TGyAL._SL1500_.jpg",
        "https://m.media-amazon.com/images/I/81pgJQgd4wL._SL1500_.jpg",
        "https://m.media-amazon.com/images/I/61Zs7cUrPAL._SL1500_.jpg",
      ],
      category: "mobile",
      isTopSelling: true,
    },
    {
      _id: "66ea6e7362ff516c8122d461",
      title: "Apple iPhone 14 Plus",
      description: "Apple iPhone 14 Plus (128 GB) - Midnight",
      price: 64999,
      qty: 1,
      image: [
        "https://m.media-amazon.com/images/I/61B0+qQriPL._SL1500_.jpg",
        "https://m.media-amazon.com/images/I/51tfF8TGyAL._SL1500_.jpg",
        "https://m.media-amazon.com/images/I/81pgJQgd4wL._SL1500_.jpg",
        "https://m.media-amazon.com/images/I/61Zs7cUrPAL._SL1500_.jpg",
      ],
      category: "mobile",
      isTopSelling: true,
    },
  ];

  const topSellingProducts = [
    ...exProducts,
    ...filterdata.filter((product) => product.isTopSelling),
  ];

  const productsToDisplay = topSellingProducts.slice(0, visibleProductsCount);

  const showMoreProducts = () => {
    setVisibleProductsCount((prevCount) => prevCount + 6);
  };

  const showFewerProducts = () => {
    setVisibleProductsCount((prevCount) => Math.max(prevCount - 6, 5));
  };

  return (
    <>
      <div
        className="tp-sell-sm"
        style={{
          width: "1515px",
          marginTop: "60px",
          height: "auto",
          marginLeft: "10px",
        }}
      >
        <h3
          className="top_heading tp-heading-sm"
          style={{
            marginLeft: "35px",
            fontFamily: "sans-serif",
            marginTop: "20px",
            fontWeight: "bold",
          }}
        >
          Top Selling Products
        </h3>
        <div className="top_product tp-product-sm">
          <div className="row row-cols-lg-5 row-cols-md-2 row-cols-sm-1">
            {productsToDisplay.map((product) => (
              <div key={product._id} className="top-sell-container">
                <div
                  className="card text-center tp-card-sm"
                  style={{ marginLeft: "20px",height:"170px" }}
                >
                  <Link
                    to={`/product/${product._id}`}
                    className="image d-flex justify-content-center align-items-center "
                  >
                    <img
                      src={product.image[0]}
                      className="card-img-top w-100 p-2 tp-img-sm"
                      style={{ borderRadius: "10px", height: "170px" }}
                      alt="Product"
                    />
                  </Link>
                  <div
                    className="card-body p-0 tp-body-sm"
                     style={{color:"white"}}
                  >
                    <p className="card-title fw-bold fs-6">{product.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="d-flex justify-content-center mt-3">
            {visibleProductsCount < topSellingProducts.length && (
              <button
                className="btn btn-primary mb-2 mr-2 tp-btn-sm"
                onClick={showMoreProducts}
              >
                See More
              </button>
            )}
            {visibleProductsCount > 5 && (
              <button
                className="bg-transparent border-0 textdecoration-none outline-none fs-6"
                onClick={showFewerProducts}
                style={{
                  cursor: "pointer",
                }}
              >
                <FaArrowAltCircleUp />
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default TopSellProduct;
