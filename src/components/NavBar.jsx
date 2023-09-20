import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  // Initialize the unique item IDs and their count
  const [itemCounts, setItemCounts] = useState({});
  const [numItem, setNumItem] = useState(0)

  // Function to get the cart data from local storage and calculate item counts
  const updateCartSize = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const itemIds = cart.map((item) => item.id);
    // Calculate item counts using reduce and object assignment
    const counts = itemIds.reduce((acc, id) => {
      acc[id] = (acc[id] || 0) + 1;
      return acc;
    }, {});

    setItemCounts(counts);
  };

  // Use useEffect to update the item counts when the component mounts
  useEffect(() => {
    updateCartSize();
    setNumItem(localStorage.getItem('numItem'))
  }, [localStorage.getItem('cart'), localStorage.getItem('numItem')]);

  return (
    <>
      <nav
        className="navbar navbar-expand-lg bg-body-tertiary"
        style={{ maxWidth: "100vw" }}
      >
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
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
                <Link className="nav-link" id="itemCount" to="/cart">
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

