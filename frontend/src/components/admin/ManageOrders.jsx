import React, { useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cart, setCart, user } = useContext(AppContext);
  const [qty, setQty] = useState(0);
  const [price, setPrice] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    let qty = 0;
    let price = 0;
    cart?.items?.forEach((item) => {
      qty += item.qty;
      price += item.price;
    });
    setQty(qty);
    setPrice(price);
  }, [cart]);

  const handleStatusChange = (itemId, newStatus) => {
    console.log("Item ID:", itemId, "New Status:", newStatus);
    const updatedCart = {
      ...cart,
      items: cart.items.map((item) =>
        item._id === itemId ? { ...item, status: newStatus } : item
      ),
    };
    setCart(updatedCart);
  };

  return (
    <div className="manage-for-sm">
      {cart?.items?.length === 0 ? (
        <div
          className="text-center cart-shopping"
          style={{ marginTop: "100px" }}
        >
          <button
            className="btn mx-3"
            style={{ marginTop: "120px" }}
            onClick={() => navigate("/")}
          >
            Continue Shopping.....
          </button>
        </div>
      ) : (
        <>
          <div className="text-center" style={{ marginTop: "120px" }}>
            <button className="btn mx-3">Total Qty: {qty}</button>
            <button className="btn mx-3">Total Price: &#8377;{price}</button>
          </div>

          <div className="container mt-5">
            <table className="table table-bordered border-primary">
              <thead>
                <tr className="text-center">
                  <th className="bg-dark text-white">Product Image</th>
                  <th className="bg-dark text-white">User</th>
                  <th className="bg-dark text-white">Title</th>
                  <th className="bg-dark text-white">Qty</th>
                  <th className="bg-dark text-white">Price</th>
                  <th className="bg-dark text-white">Status</th>
                </tr>
              </thead>
              <tbody>
                {cart?.items?.map((item) => (
                  <tr key={item._id}>
                    <td className="bg-dark text-white text-center">
                      <img
                        src={item.image}
                        alt="product"
                        style={{ width: "80px", height: "80px" }}
                      />
                    </td>
                    <td className="bg-dark text-white text-center">
                      {user.userName}
                    </td>
                    <td className="bg-dark text-white text-center">
                      {item.title}
                    </td>
                    <td className="bg-dark text-white text-center">
                      {item.qty}
                    </td>
                    <td className="bg-dark text-white text-center">
                      &#8377;{item.price}
                    </td>
                    <td className="bg-dark text-white text-center">
                      <select
                        value={item.status || "Pending"}
                        onChange={(e) =>
                          handleStatusChange(item._id, e.target.value)
                        }
                      >
                        <option value="Pending">Pending</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
