import React from "react";
import ShowProduct from "./components/product/ShowProduct";
import Signup from "./components/user/Signup";
import Login from "./components/user/Login";
import Cart from "./components/other/Cart";
import Footer from "./components/other/Footer";
import Header from "./components/other/Header";
import Profile from "./components/user/Profile";
import Logout from "./components/user/Logout";
import Address from "./components/user/Address";
import Checkout from "./components/other/Checkout";
import ProductDetail from "./components/product/ProductDetail";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SearchProduct from "./components/product/SearchProduct";
import AdminDashboard from "./components/admin/AdminDashboard";
import ManageProducts from "./components/admin/ManageProducts";
import ManageUsers from "./components/admin/ManageUsers";
import { ToastContainer, toast } from "react-toastify";
import ContactUs from "./components/other/ContactUs";
import "react-toastify/dist/ReactToastify.css";
import ManageOrders from "./components/admin/ManageOrders";
import TrackOrder from "./components/other/TrackOrder";

const App = () => {
  return (
    <Router>
      <Header />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<ShowProduct />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/Address" element={<Address />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Logout" element={<Logout />} />
        <Route path="/Checkout" element={<Checkout />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/product/search/:term" element={<SearchProduct />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/products" element={<ManageProducts />} />
        <Route path="/admin/users" element={<ManageUsers />} />
        <Route path="/admin/orders" element={<ManageOrders />} />
        <Route path="/trackorder" element={<TrackOrder />} />
        <Route path="/contact" element={<ContactUs />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
