import React, { useState, useEffect } from "react";
import Navbar from "./NavBar";
import Cart from "./Cart";
import Product from "./Product";
import "bootstrap/dist/css/bootstrap.min.css";

const Home = () => {
  const [show, setShow] = useState(true);
  const [cart, setCart] = useState([]);
  const [warning, setWarning] = useState(false);

  const handleClick = (item) => {
    let isPresent = false;
    cart.forEach((product) => {
      if (item.id === product.id) isPresent = true;
    });
    if (isPresent) {
      setWarning(true);
      setTimeout(() => {
        setWarning(false);
      }, 2000);
      return;
    }
    setCart([...cart, item]);
  };

  const handleChange = (item, d) => {
    let ind = -1;
    cart.forEach((data, index) => {
      if (data.id === item.id) ind = index;
    });
    const tempArr = cart;
    tempArr[ind].amount += d;

    if (tempArr[ind].amount === 0) tempArr[ind].amount = 1;
    setCart([...tempArr]);
  };

  return (
    <div>
      <div className="container-fluid">
        <Navbar />
        {show ? (
          <Product handleClick={handleClick} />
        ) : (
          <Cart handleChange={handleChange} />
        )}
        {warning && (
          <div class="alert alert-secondary" role="alert">
            Item is already added in your cart.
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
