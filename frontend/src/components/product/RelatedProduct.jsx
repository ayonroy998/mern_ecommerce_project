import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { Link } from "react-router-dom";
import { FaCartShopping } from "react-icons/fa6";

const RelatedProduct = ({ category }) => {
  const [relatedProducts, setRelatedProducts] = useState([]);
  const { products, addToCart } = useContext(AppContext);

  useEffect(() => {
    console.log("Products:", products);
    console.log("Category:", category);

    if (products?.length) {
      const filteredProducts = products.filter(
        (product) => product.category == category
      );
      console.log("Filtered Products:", filteredProducts);
      setRelatedProducts(filteredProducts);
    }
  }, [category, products]);

  return (
    <div className="container text-center my-5">
      <h3>Recommended for you</h3>
      <div className="row row-cols-lg-4 row-cols-md-2 row-cols-sm-1">
        {relatedProducts.length > 0 ? (
          relatedProducts.map((product) => (
            <div
              key={product.id}
              className="container my-5 d-flex justify-content-center align-items-center"
            >
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
          <p>No related products found.</p>
        )}
      </div>
    </div>
  );
};

export default RelatedProduct;
