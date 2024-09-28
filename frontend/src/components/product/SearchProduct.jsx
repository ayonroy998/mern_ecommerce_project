import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { Link, useParams } from "react-router-dom";
import { FaCartShopping } from "react-icons/fa6";

const SearchProduct = () => {
  const { products, addToCart } = useContext(AppContext);
  const [searchProducts, setSearchProducts] = useState([]);

  const { term } = useParams();

  useEffect(() => {
    console.log("Products:", products);

    if (products?.length) {
      const filteredProducts = products.filter((product) =>
        product?.title?.toLowerCase().includes(term?.toLowerCase())
      );
      console.log("Filtered Products:", filteredProducts);
      setSearchProducts(filteredProducts);
    }
  }, [term, products]);

  return (
    <div className="container text-center mt-4">
      <h3>Recommended for you</h3>
      <div className="row row-cols-lg-4 row-cols-md-2 row-cols-sm-1">
        {searchProducts.length > 0 ? (
          searchProducts.map((product) => (
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
                    alt={product.title}
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

export default SearchProduct;
