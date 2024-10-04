import React, { useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { useContext } from "react";

const Cart = () => {
  const { cart, user } = useContext(AppContext);
  const [qty, setQty] = useState(0);
  const [price, setPrice] = useState(0);

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

  return (
    <div className="track-order-sm" style={{ marginTop: "170px" }}>
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
                <td className="bg-dark text-white text-center">{item.title}</td>
                <td className="bg-dark text-white text-center">{item.qty}</td>
                <td className="bg-dark text-white text-center">
                  &#8377;{item.price}
                </td>
                <td className="bg-dark text-white text-center">
                  {item.status || "Pending"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Cart;
