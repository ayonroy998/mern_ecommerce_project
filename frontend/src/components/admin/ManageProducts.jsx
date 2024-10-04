import React, { useState, useEffect } from "react";
import axios from "axios";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdEdit } from "react-icons/md";

const url = import.meta.env.VITE_API_URL;
const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [newProductData, setNewProductData] = useState({
    title: "",
    description: "",
    price: 0,
    qty: 0,
    image: [],
    category: "",
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${url}/product/all`, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Handle deleting a product
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${url}/product/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      const updatedProducts = products.filter((product) => product._id !== id);
      setProducts(updatedProducts);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setNewProductData(product);
  };

  const handleSave = async () => {
    try {
      let response;
      if (editingProduct) {
        response = await axios.put(
          `${url}/product/${editingProduct._id}`,
          newProductData,
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        const updatedProducts = products.map((product) =>
          product._id === editingProduct._id ? response.data : product
        );
        setProducts(updatedProducts);
      } else {
        response = await axios.post(`${url}/product/add`, newProductData, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
        setProducts([...products, response.data.product]);
      }
      setEditingProduct(null);
      setNewProductData({
        title: "",
        description: "",
        price: 0,
        qty: 0,
        image: [],
        category: "",
      });
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProductData({ ...newProductData, [name]: value });
  };

  return (
    <div className="manage-for-sm">
      <h2>Manage Products</h2>
      <table className="table table-bordered border-primary my-5 container">
        <thead className="text-center">
          <tr>
            <th className="bg-dark text-white">Title</th>
            <th className="bg-dark text-white">Description</th>
            <th className="bg-dark text-white">Price</th>
            <th className="bg-dark text-white">Quantity</th>
            <th className="bg-dark text-white">Image</th>
            <th className="bg-dark text-white">Category</th>
            <th className="bg-dark text-white">Actions</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {products.map((product) => (
            <tr key={product._id}>
              <td className="bg-dark text-white">{product.title}</td>
              <td className="bg-dark text-white">{product.description}</td>
              <td className="bg-dark text-white"> &#8377;{product.price}</td>
              <td className="bg-dark text-white">{product.qty}</td>
              <td className="bg-dark text-white">
                {product.image.map((imgUrl, index) => (
                  <img
                    className="mr-1"
                    key={index}
                    src={imgUrl}
                    alt={product.title}
                    style={{ width: "50px" }}
                  />
                ))}
              </td>
              <td className="bg-dark text-white">{product.category}</td>
              <td className="bg-dark text-white">
                <button
                  onClick={() => handleEdit(product)}
                  className="btn rounded text-white border-0  mb-2 fw-bold p-1"
                >
                  <MdEdit
                    color="text-white"
                    style={{ height: "15px", width: "35px" }}
                  />
                </button>
                <button
                  className="bg-danger rounded text-white border-0 fw-bold p-1"
                  onClick={() => handleDelete(product._id)}
                  style={{
                    fontSize: "13px",
                    height: "25px",
                    width: "50px",
                  }}
                >
                  <RiDeleteBin6Line className="text-white mb-1" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div
        className="container edit-user-form my-5 rounded bg-dark pt-2 pb-4 px-2 pl-4 text-white"
        style={{
          width: "400px",
          height: "475px",
        }}
      >
        <h4 className="text-center">
          {editingProduct ? "Edit Product" : "Add Product"}
        </h4>
        <form onSubmit={(e) => e.preventDefault()} className="my-3">
          <div className="form-group">
            <label>
              <b>Title</b>
            </label>
            <input
              type="text"
              name="title"
              value={newProductData.title}
              onChange={handleInputChange}
              className="form-control "
            />
          </div>
          <div className="form-group">
            <label>
              <b>Description</b>
            </label>
            <input
              type="text"
              name="description"
              value={newProductData.description}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>
              <b>Price</b>
            </label>
            <input
              type="number"
              name="price"
              value={newProductData.price}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>
              <b>Quantity</b>
            </label>
            <input
              type="number"
              name="qty"
              value={newProductData.qty}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>
              <b>Image URLs (comma-separated)</b>
            </label>
            <input
              type="text"
              name="image"
              value={newProductData.image.join(", ")}
              onChange={(e) =>
                setNewProductData({
                  ...newProductData,
                  image: e.target.value.split(",").map((url) => url.trim()),
                })
              }
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label>
              <b>Category</b>
            </label>
            <input
              type="text"
              name="category"
              value={newProductData.category}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>
          <button onClick={handleSave} className="btn my-3 mx-3">
            {editingProduct ? "Save Changes" : "Add Product"}
          </button>
          {editingProduct && (
            <button
              onClick={() => {
                setEditingProduct(null);
                setNewProductData({
                  title: "",
                  description: "",
                  price: 0,
                  qty: 0,
                  image: [],
                  category: "",
                });
              }}
              className="btn"
            >
              Cancel
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default ManageProducts;
