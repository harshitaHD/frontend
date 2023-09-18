import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./NavBar";

const Cart = () => {
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

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity > 0) {
      const updatedCart = cart.map((item) => {
        if (item.id === id) {
          return { ...item, quantity: newQuantity };
        }
        return item;
      });

      setCart(updatedCart);
      saveCartToLocalStorage(updatedCart);
    } else {
      // Remove the item from the cart if quantity is 0
      const updatedCart = cart.filter((item) => item.id !== id);
      setCart(updatedCart);
      saveCartToLocalStorage(updatedCart);
    }
  };

  useEffect(() => {
    let totalPrice = 0;
    cart.forEach((item) => {
      const itemQuantity = parseFloat(item.quantity);
      const itemPrice = parseFloat(item.price);

      //if itemQuantity and itemPrice are valid numbers
      if (!isNaN(itemQuantity) && !isNaN(itemPrice)) {
        totalPrice += itemQuantity * itemPrice;
      } else {
        //missing or invalid data (e.g., log an error)
        console.error(`Invalid data for item: ${JSON.stringify(item)}`);
      }
    });
    totalPrice = parseFloat(totalPrice.toFixed(2));

    setPrice(totalPrice);
    saveCartToLocalStorage(cart);
  }, [cart]);

  return (
    <div className="container-fluid">
      <Navbar />
      <article>
        <div className="d-flex justify-content-center mt-4">
          <div className="total">
            <h3 style={{ fontWeight: "bold", color: "green" }}>
              <span>Total Payable Amount ₹{price}</span>
            </h3>
          </div>
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
                  <div className="quantity-controls">
                    <button
                      type="button"
                      className="btn btn-danger"
                      style={{ fontWeight: "bold" }}
                      onClick={() =>
                        handleQuantityChange(item.id, item.quantity - 1)
                      }
                    >
                      -
                    </button>
                    <span className="quantity">{item.quantity}</span>
                    <button
                      type="button"
                      className="btn btn-info"
                      style={{ fontWeight: "bold" }}
                      onClick={() =>
                        handleQuantityChange(item.id, item.quantity + 1)
                      }
                    >
                      +
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
