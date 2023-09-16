import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  // Initialize the size state with 0
  const [size, setSize] = useState(0);
  const [numItem, setNumItem] = useState(localStorage.getItem('numItem'))

  // Function to get the cart data from local storage and calculate the size
  const updateCartSize = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const newSize = cart.reduce((total, item) => total + item.amount, 0);
    setSize(newSize);
  };

  // Use useEffect to update the cart size when the component mounts
  useEffect(() => {
    updateCartSize();
  }, []);

  return (
    <>
      <nav
        className="navbar navbar-expand-lg bg-body-tertiary"
        style={{ maxWidth: "100vw" }}
      >
        <div className="container-fluid">
          <a className="navbar-brand" href="/home">
            <h2>Ink & Quill</h2>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarNav"
          >
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/cart">
                  Cart ({numItem})
                </Link>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/login">
                  Login/Signup
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
