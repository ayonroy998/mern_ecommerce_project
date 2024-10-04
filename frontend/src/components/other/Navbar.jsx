import React, { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import { FaUserCircle } from "react-icons/fa";
import { RiAdminFill } from "react-icons/ri";
import { FaShoppingCart } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import { FaSun, FaMoon } from "react-icons/fa";

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isTogglerExpanded, setIsTogglerExpanded] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const {
    setFilterData,
    products,
    priceRange,
    setPriceRange,
    logoutUser,
    isAuthenti,
    cart,
    user,
  } = useContext(AppContext);

  const filterByCategoryPrice = (category) => {
    const tolerance = 0.01;
    const filteredProducts = products.filter((product) => {
      const inCategory = category
        ? product.category.toLowerCase() === category.toLowerCase()
        : true;
      const inPriceRange =
        product.price >= priceRange[0] &&
        product.price <= priceRange[1] + tolerance;
      return inCategory && inPriceRange;
    });
    setFilterData(filteredProducts);
  };

  const handlePriceChange = (e) => {
    const value = Number(e.target.value);
    setPriceRange([100, value]);
    filterByCategoryPrice("");
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    navigate(`/product/search/${searchTerm}`);
    setSearchTerm("");
  };

  const handleTogglerClick = () => {
    setIsTogglerExpanded(!isTogglerExpanded);
  };

  const toggleListening = () => {
    setIsListening((prev) => !prev);
  };

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode;
      // Add or remove dark mode class to the body
      if (newMode) {
        document.body.classList.add("dark-mode");
        document.body.classList.remove("light-mode");
      } else {
        document.body.classList.add("light-mode");
        document.body.classList.remove("dark-mode");
      }
      return newMode;
    });
  };

  /*useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.add("light-mode");
    }
    return () => {
      document.body.classList.remove("dark-mode", "light-mode");
    };
  }, [isDarkMode]);*/

  return (
    <>
      <nav
        className={"navbar w-100 navbar-expand-md fixed-top"}
        style={{ height: "7vh" }}
      >
        <div
          className="container-fluid small-device-nav w-100 d-flex align-items-center justify-content-between p-2"
          style={{
            backgroundColor: "#e8e4e3",
            marginTop: "19px",
            boxShadow:
              "inset 2px 2px 2px 0px rgba(255, 255, 255, 0.5), 7px 7px 20px 0px rgba(0, 0, 0, 0.1), 4px 4px 5px 0px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div>
            <NavLink to="/" className="text-black text-decoration-none">
              <h2 className="logo">
                R<i className="icon fa-brands fa-pied-piper"></i>Y
              </h2>
            </NavLink>
          </div>

          <div className="search-btn mt-1 d-flex justify-content-center align-items-center w-50 mx-auto">
            <form
              className="search-btns d-flex ms-auto"
              onSubmit={submitHandler}
            >
              <div
                className="search-container d-flex justify-content-center align-items-center rounded-pill py-3 px-3 w-100 mb-2 "
                style={{
                  height: "40px",
                  background: "#1a1e1d",
                  cursor: "pointer",
                  transition: "0.8s",
                }}
              >
                <input
                  type="search"
                  onChange={(e) => setSearchTerm(e.target.value)}
                  name="search"
                  placeholder="Search..."
                  className="search-input bg-transparent text-white border-0 fw-bold"
                  style={{
                    fontSize: "15px",
                    transition: "0.8s",
                    outline: "none",
                  }}
                />
                <a href="#" className="search-btn">
                  <i className="fas fa-search" style={{ color: "red" }}></i>
                </a>
              </div>
            </form>
          </div>

          <div className="d-flex align-items-center">
            <button
              className={`toggle-switch ${isDarkMode ? "active" : ""}`}
              onClick={toggleDarkMode}
              style={{
                border: "none",
                background: "transparent",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
              }}
            >
              <FaSun
                style={{
                  color: isDarkMode ? "gray" : "yellow",
                  marginRight: "5px",
                }}
              />
              <div
                className={`toggle ${isDarkMode ? "dark" : "light"}`}
                style={{
                  width: "40px",
                  height: "20px",
                  borderRadius: "20px",
                  position: "relative",
                  transition: "background 0.3s",
                }}
              >
                <div
                  className={`toggle-circle ${isDarkMode ? "active" : ""}`}
                  style={{
                    width: "18px",
                    height: "18px",
                    background: "white",
                    borderRadius: "50%",
                    position: "absolute",
                    top: "1px",
                    left: isDarkMode ? "20px" : "1px",
                    transition: "left 0.3s",
                  }}
                ></div>
              </div>
              <FaMoon
                style={{
                  color: isDarkMode ? "blue" : "gray",
                  marginLeft: "5px",
                }}
              />
            </button>
          </div>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded={isTogglerExpanded ? "true" : "false"}
            aria-label="Toggle navigation"
            onClick={handleTogglerClick}
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className={`collapse navbar-collapse ${
              isTogglerExpanded ? "show" : ""
            }`}
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav ms-auto">
              {!isAuthenti && (
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/Signup">
                      <button
                        className="custom-btn signup"
                        style={{ color: "white", display: "none" }}
                      >
                        Signup
                      </button>
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/Login">
                      <button
                        className="custom-btn signup"
                        style={{ color: "white" }}
                      >
                        Login
                      </button>
                    </NavLink>
                  </li>
                </>
              )}
              {isAuthenti && user && (
                <>
                  <div className="nav-items">
                    <li className="nav-item">
                      <NavLink className="nav-link mx-3" to="/Cart">
                        <button
                          type="button"
                          className=" position-relative my-1 border-0"
                          style={{
                            backgroundColor: "#e8e4e3",
                          }}
                        >
                          <i className="icon2">
                            <FaShoppingCart
                              className="small-screen"
                              style={{ fontSize: "28px" }}
                            />
                          </i>
                          {cart?.items?.length > 0 && (
                            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger px-2 mt-1">
                              {cart?.items?.length}
                            </span>
                          )}
                        </button>
                      </NavLink>
                    </li>
                  </div>

                  <div className="nav-items">
                    <li className="nav-item my-1">
                      <NavLink className="nav-link mx-3" to="/Profile">
                        <FaUserCircle
                          className="small-screen"
                          style={{ fontSize: "30px", marginTop: "8px" }}
                        />
                      </NavLink>
                    </li>
                  </div>

                  <div className="nav-items">
                    {user?.email === "ayonroy998@gmail.com" && (
                      <li className="nav-item my-1">
                        <NavLink className="nav-link mx-3" to="/admin">
                          <RiAdminFill
                            className="small-screen"
                            style={{ fontSize: "30px", marginTop: "9px" }}
                          />
                        </NavLink>
                      </li>
                    )}
                  </div>

                  <div className="nav-items">
                    <li className="nav-item">
                      <button
                        className="custom-btn signup my-3"
                        onClick={() => {
                          logoutUser();
                          navigate("/");
                        }}
                      >
                        <NavLink
                          className="nav-link mx-3"
                          style={{ color: "white" }}
                          to="/Logout"
                        >
                          Logout
                        </NavLink>
                      </button>
                    </li>
                  </div>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>

      {location.pathname === "/" && (
        <div
          className="sub_navbar d-flex w-100 align-items-center justify-content-evenly bg-light p-2 fixed-top"
          style={{ height: "8vh", marginTop: "70px" }}
        >
          <div className="category d-flex flex-row align-items-center">
            <div className="items">
              <button
                className="border-0 ms-3 bg-light"
                value=""
                style={{
                  fontFamily: "monospace",
                }}
                onClick={() => setFilterData(products)}
              >
                All
              </button>
            </div>

            <div className="items" style={{ marginLeft: "20px" }}>
              <button
                className="border-0 ms-3 bg-light"
                value="laptop"
                onClick={() => filterByCategoryPrice("laptop")}
              >
                <img
                  src="https://m.media-amazon.com/images/I/71vm-E3y70L._SL1500_.jpg"
                  alt="laptop"
                  style={{ height: "40px", width: "50px", borderRadius: "50%" }}
                />
              </button>
            </div>

            <div className="items" style={{ marginLeft: "20px" }}>
              <button
                className="border-0 ms-3 bg-light"
                value="smartwatch"
                onClick={() => filterByCategoryPrice("smartwatch")}
              >
                <img
                  src="https://m.media-amazon.com/images/I/71n+Hxx+wvL._SL1500_.jpg"
                  alt="smartwatch"
                  style={{ height: "40px", width: "50px", borderRadius: "50%" }}
                />
              </button>
            </div>

            <div className="items" style={{ marginLeft: "20px" }}>
              <button
                className="border-0 ms-3 bg-light"
                value="mobile"
                onClick={() => filterByCategoryPrice("mobile")}
              >
                <img
                  src="https://m.media-amazon.com/images/I/61Io5-ojWUL._SL1500_.jpg"
                  alt="mobile"
                  style={{ height: "40px", width: "50px", borderRadius: "50%" }}
                />
              </button>
            </div>

            <div className="items" style={{ marginLeft: "20px" }}>
              <button
                className="border-0 ms-3 bg-light"
                value="headphone"
                onClick={() => filterByCategoryPrice("headphone")}
              >
                <img
                  src="https://m.media-amazon.com/images/I/61aRIZ0f0AL._SL1500_.jpg"
                  alt="headphone"
                  style={{ height: "40px", width: "50px", borderRadius: "50%" }}
                />
              </button>
            </div>

            <div className="items" style={{ marginLeft: "20px" }}>
              <button
                className="border-0 ms-3 bg-light"
                value="camera"
                onClick={() => filterByCategoryPrice("camera")}
              >
                <img
                  src="https://m.media-amazon.com/images/I/916GGqnsG+L._SL1500_.jpg"
                  alt="camera"
                  style={{ height: "40px", width: "50px", borderRadius: "40%" }}
                />
              </button>
            </div>

            <div className="items" style={{ marginLeft: "20px" }}>
              <button
                className="border-0 ms-3 bg-light"
                value="hometheatre"
                onClick={() => filterByCategoryPrice("hometheatre")}
              >
                <img
                  src="https://m.media-amazon.com/images/I/71eRAMvY25L._SL1500_.jpg"
                  alt="hometheatre"
                  style={{ height: "40px", width: "50px", borderRadius: "50%" }}
                />
              </button>
            </div>

            <div className="items" style={{ marginLeft: "20px" }}>
              <button
                className="border-0 ms-3 bg-light"
                value="tv"
                onClick={() => filterByCategoryPrice("tv")}
              >
                <img
                  src="https://m.media-amazon.com/images/I/71XEUF8pHdL._SL1500_.jpg"
                  alt="tv"
                  style={{ height: "40px", width: "50px", borderRadius: "50%" }}
                />
              </button>
            </div>
          </div>

          <div className="items" style={{ marginLeft: "20px" }}>
            <button
              className="border-0 ms-3 bg-light"
              value="ac"
              onClick={() => filterByCategoryPrice("ac")}
            >
              <img
                src="https://m.media-amazon.com/images/I/51xptnIyWxL._SL1500_.jpg"
                alt="ac"
                style={{ height: "50px", width: "50px", borderRadius: "50%" }}
              />
            </button>
          </div>

          <div className="items" style={{ marginLeft: "20px" }}>
            <button
              className="border-0 ms-3 bg-light"
              value="fridge"
              onClick={() => filterByCategoryPrice("fridge")}
            >
              <img
                src="https://m.media-amazon.com/images/I/51te7wlvafL._SL1500_.jpg"
                alt="fridge"
                style={{ height: "50px", width: "50px", borderRadius: "50%" }}
              />
            </button>
          </div>

          <div className="items" style={{ marginLeft: "20px" }}>
            <button
              className="border-0 ms-3 bg-light"
              value="washingmachine"
              onClick={() => filterByCategoryPrice("washingmachine")}
            >
              <img
                src="https://m.media-amazon.com/images/I/71aR5jWnTNL._SL1500_.jpg"
                alt="washingmachine"
                style={{ height: "50px", width: "50px", borderRadius: "50%" }}
              />
            </button>
          </div>

          <div className="items" style={{ marginLeft: "20px" }}>
            <button
              className="border-0 ms-3 bg-light"
              value="cooler"
              onClick={() => filterByCategoryPrice("cooler")}
            >
              <img
                src="https://m.media-amazon.com/images/I/61HAYmEQYHL._SL1500_.jpg"
                alt="cooler"
                style={{ height: "50px", width: "50px", borderRadius: "50%" }}
              />
            </button>
          </div>

          <div
            className="price-slider p-2"
            style={{ position: "relative", zIndex: 1 }}
          >
            <div
              className="price-slider-button fw-bold p-2"
              onClick={toggleDropdown}
              style={{
                cursor: "pointer",
                backgroundColor: "#f8f9fa",
                border: "1px solid #ccc",
                color:"black"
              }}
            >
              Price: Up to ₹{priceRange[1].toLocaleString("en-IN")}{" "}
              <IoMdArrowDropdown className="fs-5 mb-1" />
            </div>

            {isDropdownOpen && (
              <div
                className="price-slider-dropdown price-slider-dropdown-sm p-2 bg-light"
                style={{
                  position: "absolute",
                  top: "100%",
                  left: 0,
                  zIndex: 9999,
                  border: "1px solid #ccc",
                  width: "93%",
                  marginLeft: "8px",
                  maxWidth: "400px",
                  boxSizing: "border-box",
                }}
              >
                <input
                  type="range"
                  name="minPrice"
                  min="100"
                  max="100000"
                  step="50"
                  value={priceRange[1]}
                  onChange={handlePriceChange}
                  style={{ width: "100%"}}
                />
                <div>₹{priceRange[1].toLocaleString("en-IN")}</div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
export default Navbar;
