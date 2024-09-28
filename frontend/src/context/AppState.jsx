import React, { useEffect, useState } from "react";
import { AppContext } from "./AppContext";
import axios from "axios";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AppState = ({ children }) => {
  const url = import.meta.env.VITE_API_URL;
  console.log(url);

  const [products, setProducts] = useState([]);
  const [token, setToken] = useState([]);
  const [isAuthenti, setIsAuthenti] = useState(false);
  const [filterdata, setFilterData] = useState([]);
  const [priceRange, setPriceRange] = useState([100, 100000]);
  const [user, setUser] = useState({});
  const [cart, setCart] = useState([]);
  const [reload, setReload] = useState(false);
  const [userAddress, setUserAddress] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await axios.get(`${url}/product/all`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      console.log(response.data);
      setProducts(response.data);
      setFilterData(response.data);
      userProfile();
    };
    fetchProduct();
    getUserCart();
    getUserAddress();
  }, [token, reload]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
      setIsAuthenti(true);
    } else {
      setIsAuthenti(false);
    }
  }, []);

  const signupUser = async (userName, email, password) => {
    const response = await axios.post(
      `${url}/user/signup`,
      { userName, email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    toast.success(response.data.message, {
      position: "top-center",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
    return response.data; // response er value k return kore signup.jsx file a result a store korbo
  };

  //loginuser
  const loginUser = async (email, password) => {
    try {
      const response = await axios.post(
        `${url}/user/login`,
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      toast.success(response.data.message, {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });

      // Successful login
      console.log("user login", response.data);
      setToken(response.data.token);
      setIsAuthenti(true); // User is authenticated
      localStorage.setItem("token", response.data.token);

      return response.data;
    } catch (error) {
      // Failed login
      toast.error("Invalid credentials. Please try again.", {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });

      setIsAuthenti(false); // Ensure user is not authenticated
    }
  };

  //logoutuser
  const logoutUser = async () => {
    setIsAuthenti(false);
    setToken("");
    setUser(null);
    localStorage.removeItem("token");
    toast.success("Logout Successfully", {
      position: "top-center",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  };

  //profile
  const userProfile = async () => {
    const response = await axios.get(`${url}/user/profile`, {
      headers: {
        "Content-Type": "application/json",
        Auth: token,
      },
      withCredentials: true,
    });
    console.log("user profile", response.data);
    setUser(response.data.user);
  };

  //add to cart
  const addToCart = async (
    productId,
    title,
    description,
    price,
    qty,
    image,
    category
  ) => {
    const response = await axios.post(
      `${url}/cart/add`,
      { productId, title, description, price, qty, image, category },
      {
        headers: {
          "Content-Type": "application/json",
          Auth: token,
        },
        withCredentials: true,
      }
    );
    setReload(!reload);
    //console.log("my cart",response);
    toast.success(response.data.message, {
      position: "top-center",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  };

  //decrease qty
  const decreaseQty = async (productId, qty) => {
    const response = await axios.post(
      `${url}/cart/decrease/:productId`,
      { productId, qty },
      {
        headers: {
          "Content-Type": "application/json",
          Auth: token,
        },
        withCredentials: true,
      }
    );
    setReload(!reload);
    toast.success(response.data.message, {
      position: "top-center",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
    //console.log("my cart",response);
  };

  //get user cart
  const getUserCart = async () => {
    const response = await axios.get(`${url}/cart/:id`, {
      headers: {
        "Content-Type": "application/json",
        Auth: token,
      },
      withCredentials: true,
    });
    console.log("user cart", response.data.cart);
    setCart(response.data.cart);
  };

  //remove one product from cart
  const removeFromCart = async (productId) => {
    const response = await axios.delete(`${url}/cart/remove/${productId}`, {
      headers: {
        "Content-Type": "application/json",
        Auth: token,
      },
      withCredentials: true,
    });
    setReload(!reload);
    console.log("remove item from cart", response);
    toast.success(response.data.message, {
      position: "top-center",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  };

  //remove all from cart
  const removeAllFromCart = async () => {
    const response = await axios.delete(`${url}/cart/clear/:userId`, {
      headers: {
        "Content-Type": "application/json",
        Auth: token,
      },
      withCredentials: true,
    });
    setReload(!reload);
    toast.success(response.data.message, {
      position: "top-center",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  };

  //add address
  const addAddress = async (
    fullName,
    address,
    city,
    state,
    country,
    pincode,
    phoneNo
  ) => {
    const response = await axios.post(
      `${url}/address/add`,
      { fullName, address, city, state, country, pincode, phoneNo },
      {
        headers: {
          "Content-Type": "application/json",
          Auth: token,
        },
        withCredentials: true,
      }
    );
    console.log("add address", response.data);
    toast.success(response.data.message, {
      position: "top-center",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
    return response.data;
  };

  //get user address
  const getUserAddress = async () => {
    const response = await axios.get(`${url}/address/latest`, {
      headers: {
        "Content-Type": "application/json",
        Auth: token,
      },
      withCredentials: true,
    });
    console.log("get user address", response.data.newAddress);

    setUserAddress(response.data.newAddress);
    return response.data;
  };

  return (
    <AppContext.Provider
      value={{
        products,
        signupUser,
        loginUser,
        logoutUser,
        user,
        url,
        token,
        isAuthenti,
        setIsAuthenti,
        filterdata,
        setFilterData,
        priceRange,
        setPriceRange,
        addToCart,
        cart,
        decreaseQty,
        removeFromCart,
        removeAllFromCart,
        addAddress,
        userAddress,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppState;
