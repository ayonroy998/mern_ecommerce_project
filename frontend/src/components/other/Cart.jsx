import React, { useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { MdOutlineDelete } from "react-icons/md";

const Cart = () => {
  const { cart, decreaseQty, addToCart, removeFromCart, removeAllFromCart } =
    useContext(AppContext);
  const [qty, setQty] = useState(0);
  const [price, setPrice] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    let qty = 0;
    let price = 0;
    cart?.items?.map((item) => {
      qty += item.qty;
      price += item.price;
    });
    setQty(qty);
    setPrice(price);
  }, [cart]);

  return (
    <>
      <div>
        {cart?.items?.length == 0 ? (
          <>
            <div
              className="text-center cart-shopping"
              style={{ marginTop: "100px" }}
            >
              <button
                className="btn  mx-3"
                style={{ marginTop: "120px" }}
                onClick={() => navigate("/")}
              >
                Continue Shopping.....
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="text-center" style={{ marginTop: "100px" }}>
              <button className="btn  mx-3">Total Qty :-{qty}</button>
              <button className="btn  mx-3">Total Price :-{price}</button>
            </div>
          </>
        )}

        {cart?.items?.map((item) => (
          <div
            key={item._id}
            className="container p-3 bg-dark text-white"
            style={{ marginTop: "100px" }}
          >
            <div className="d-flex justify-content-around align-items-center text-center">
              <div className="rouded">
                <img
                  src={item.image}
                  style={{
                    width: "100px",
                    height: "100px",
                  }}
                  alt="item image loading"
                />
              </div>
              <div className="ms-3">
                <h3 className="fs-5">{item.title}</h3>
                <h4 className="fs-6">MRP: &#8377;{item.price}</h4>
                <h4 className="fs-6">Qty: {item.qty}</h4>
              </div>
              <div className="ms-6">
                <button
                  className="btn mx-4"
                  onClick={() => decreaseQty(item?.productId, 1)}
                >
                  Qty--
                </button>
                <button
                  className="btn mx-4"
                  onClick={() =>
                    addToCart(
                      item?.productId,
                      item.title,
                      item.description,
                      item.price / item.qty,
                      1,
                      item.image,
                      item.category
                    )
                  }
                >
                  Qty++
                </button>
                <button
                  className="bg-danger text-center text-white rounded border-0 p-1 fw-bold"
                  style={{
                    fontSize: "12px",
                    height: "30px",
                  }}
                  onClick={() => {
                    if (
                      confirm("are you sure to want delete item from cart!!")
                    ) {
                      removeFromCart(item?.productId);
                    }
                  }}
                >
                  <MdOutlineDelete /> <b>Remove</b>
                </button>
              </div>
            </div>
          </div>
        ))}

        {cart?.items?.length > 0 && (
          <div className="container text-center my-3">
            <button className="btn mx-3" onClick={() => navigate("/Address")}>
              Checkout
            </button>
            <button
              className="mx-3 bg-danger text-white text-center rounded border-0 p-1 fw-bold"
              style={{ fontSize: "12px", height: "30px" }}
              onClick={() => {
                if (confirm("are you sure to want clear all from cart!!")) {
                  removeAllFromCart();
                }
              }}
            >
              Clear cart
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
