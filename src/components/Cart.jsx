import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./NavBar";

const Cart = ({ handleChange }) => {
  const [cart, setCart] = useState([]);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  const saveCartToLocalStorage = (cartData) => {
    localStorage.setItem("cart", JSON.stringify(cartData));
  };

  const handleRemove = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    saveCartToLocalStorage(updatedCart);
  };

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    cart.forEach((item) => {
      totalPrice += item.amount * item.price;
    });
    return totalPrice;
  };

  useEffect(() => {
    const totalPrice = calculateTotalPrice();
    setPrice(totalPrice);
    saveCartToLocalStorage(cart);
  }, [cart]);


  return (
    <div className="container-fluid">
      <Navbar />
      <article>
        <div className="total">
          <h4>
            <span>Total Rs - {price}</span>
          </h4>
        </div>
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3">
          {cart.map((item) => (
            <div className="col mb-4" key={item.id}>
              <div className="card">
                <img
                  src={item.image}
                  alt={item.name}
                  className="card-img-top"
                  style={{
                    width: "19.8rem",
                    height: "20rem",
                    objectFit: "cover",
                    margin: "auto",
                  }}
                />
                <div className="card-body">
                  <h5 className="card-title">{item.name}</h5>
                  <p className="card-text">Rs. {item.price}</p>
                  <div className="btn-group">
                    <button
                      type="button"
                      className="btn btn-success"
                      onClick={() => handleChange(item, 1)}
                    >
                      +
                    </button>
                    <button className="btn btn-light">{item.amount}</button>
                    <button
                      type="button"
                      className="btn btn-info"
                      onClick={() => handleChange(item, -1)}
                    >
                      -
                    </button>
                  </div>
                  <button
                    type="button"
                    className="btn btn-danger mt-2"
                    onClick={() => handleRemove(item.id)}
                    style={{ display: "flex" }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </article>
    </div>
  );
};

export default Cart;
