import React, { useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { useContext } from "react";
import axios from "axios";
import Tableproduct from "./Tableproduct";
import { Link } from "react-router-dom";

const url = import.meta.env.VITE_API_URL;

const Checkout = () => {
  const { cart, userAddress, user, token } = useContext(AppContext);
  const [qty, setQty] = useState(0);
  const [price, setPrice] = useState(0);
  console.log("user token",token);

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

  const handlePayment = async () => {
    console.log("Preparing to handle payment...");
    console.log("Cart contents:", cart);

    if (!cart || !Array.isArray(cart.items)) {
      console.error("Cart is not defined or items is not an array");
      return;
    }

    try {
      const orderResponse = await axios.post(
        `${url}/payment/checkout`,
        {
          amount: price,
          items: cart.items,
          userShipping: userAddress,
          userId: user._id,
          userName: user.userName,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Auth: `Bearer ${token}`,
          },
        }
      );
      console.log("Order Response:", orderResponse.data);

      const approvalLink = orderResponse.data.links.find(
        (link) => link.rel === "approve"
      );

      if (approvalLink) {
        // Redirect the user to the PayPal approval URL
        window.location.href = approvalLink.href;
      } else {
        console.error("Approval URL not found");
      }
    } catch (error) {
      console.error("Error during payment:", error);
    }
  };

  return (
    <>
      <div className="container con-for-sm" style={{ marginTop: "100px" }}>
        <h2 className="text-center">Order Summary</h2>

        <table className="table table-bordered border-primary">
          <thead>
            <tr>
              <th scope="col" className="text-center">
                Product Details
              </th>
              <th scope="col" className="text-center">
                Shipping Address
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <Tableproduct cart={cart} />
              </td>
              <td>
                <ul>
                  <li>
                    <b>Name:</b> {userAddress?.fullName}
                  </li>
                  <li>
                    <b>Country:</b> {userAddress?.country}
                  </li>
                  <li>
                    <b>State:</b> {userAddress?.state}
                  </li>
                  <li>
                    <b>City:</b> {userAddress?.city}
                  </li>
                  <li>
                    <b>Phone No:</b> {userAddress?.phoneNo}
                  </li>
                  <li>
                    <b>Pin No:</b> {userAddress?.pincode}
                  </li>
                  <li>
                    <b>Address:</b> {userAddress?.address}
                  </li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="container text-center">
        <button className="btn my-4 btn-lg" onClick={handlePayment}>
          Proceed to Pay
        </button>
      </div>

      <div className="container text-center">
        <Link to={"/trackorder"}>
          <button className="btn my-2 btn-lg">Track your order :)</button>
        </Link>
      </div>
    </>
  );
};

export default Checkout;
