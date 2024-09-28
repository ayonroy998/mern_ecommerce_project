import React from "react";

const Footer = () => {
  return (
    <>
      <footer
        className="bg-dark text-white w-100 py-4"
        style={{ height: "330px", marginTop: "240px" }}
      >
        <div className="d-flex flex-wrap justify-content-between px-5">
          <div
            className="footer-section flex-fill mb-4"
            style={{ minWidth: "200px" }}
          >
            <h4>About Us</h4>
            <div className="fs-6" style={{ lineHeight: "3px" }}>
              <p>We provide the best products</p>
              <p>to our customers with a wide variety</p>
              <p>of options to choose from.</p>
            </div>
          </div>
          <div className="footer-links">
            <h4 style={{ marginRight: "320px" }}>Quick Links</h4>
            <ul className="link">
              <li>
                <a href="#">Home</a>
              </li>
              <li>
                <a href="#">Products</a>
              </li>
              <li>
                <a href="#">Contact Us</a>
              </li>
              <li>
                <a href="#">FAQs</a>
              </li>
            </ul>
          </div>
          <div className=" footer-contact me-5">
            <h4>Contact Us</h4>
            <p>Email: support@example.com</p>
            <p>Phone: +123 456 7890</p>
          </div>
          <div className="footer-sec-link">
            <h4>Follow Us</h4>
            <div className="social-icons d-flex" style={{ gap: "10px" }}>
              <a href="#">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="footer-bottom text-center mt-4">
          <p>&copy; 2024 Your Company. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
