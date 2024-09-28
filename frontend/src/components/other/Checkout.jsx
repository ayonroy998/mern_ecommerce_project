import React, { useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { useContext } from "react";
import Tableproduct from "./Tableproduct";

const Checkout = () => {
  const { cart, userAddress } = useContext(AppContext);

  console.log("checkout add", userAddress);

  return (
    <>
      <div className="container" style={{ marginTop: "100px" }}>
        <h2 className="text-center">Order Summery</h2>

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
        <button className="btn my-5 btn-lg">Procced to pay</button>
      </div>
    </>
  );
};

export default Checkout;
