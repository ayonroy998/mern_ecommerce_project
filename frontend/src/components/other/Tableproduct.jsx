import React from "react";
import { AppContext } from "../../context/AppContext";
import { useState, useContext, useEffect } from "react";
import { FaPlusCircle } from "react-icons/fa";
import { FaCircleMinus } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";

const Tableproduct = ({ cart }) => {
  const { decreaseQty, addToCart, removeFromCart } = useContext(AppContext);
  const [qty, setQty] = useState(0);
  const [price, setPrice] = useState(0);

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
      <table className="table  table-bordered border-primary">
        <thead>
          <tr className="text-center">
            <th scope="col">Product Img</th>
            <th scope="col">Title</th>
            <th scope="col">Price</th>
            <th scope="col">Qty</th>
            <th scope="col">Qty++</th>
            <th scope="col">Qty--</th>
            <th scope="col">Remove</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {cart?.items?.map((item) => (
            <tr key={item._id}>
              <th scope="row" className="text-center">
                <img src={item.image} width="40px" height="40px" />
              </th>
              <td>{item.title}</td>
              <td>{item.price}</td>
              <td>{item.qty}</td>
              <td>
                <FaPlusCircle
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
                />
              </td>
              <td>
                <FaCircleMinus
                  onClick={() => decreaseQty(item?.productId, 1)}
                />
              </td>
              <td>
                <MdDelete
                  onClick={() => {
                    if (
                      confirm("are you sure to want delete item from cart!!")
                    ) {
                      removeFromCart(item?.productId);
                    }
                  }}
                />
              </td>
            </tr>
          ))}

          <tr>
            <th scope="row"></th>
            <td>
              <button>
                <b>Total</b>
              </button>
            </td>
            <td>
              <button>
                <b>{price}</b>
              </button>
            </td>
            <td>
              <button>
                <b>{qty}</b>
              </button>
            </td>
            <td>{}</td>
            <td>{}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default Tableproduct;
