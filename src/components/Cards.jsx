import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ProductPage from "./ProductPage";

const Cards = ({ item }) => {
  const { id, name, description, price, image } = item;
  const [showProductPage, setShowProductPage] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  const handleImageClick = () => {
    setShowProductPage(true);
  };

  const handleCloseProductPage = () => {
    setShowProductPage(false);
  };

  const updateNavBarCartInfo = () => {
    let cartInfo = document.getElementById('itemCount');
    console.log(localStorage.getItem('numItem'))
    cartInfo.textContent = "Cart (" + localStorage.getItem('numItem') + ")"
  }

  const addToCart = () => {
    const existingCartItems = JSON.parse(localStorage.getItem("cart")) || [];
    const itemExists = existingCartItems.some((cartItem) => cartItem.id === id);

    if (itemExists) {
      const updatedCartItems = existingCartItems.map((cartItem) => {
        if (cartItem.id === id) {
          return { ...cartItem, quantity: cartItem.quantity + 1 };
        }
        return cartItem;
      });

      localStorage.setItem("cart", JSON.stringify(updatedCartItems));
    } else {
      const newItem = { ...item, quantity: 1 };
      const updatedCartItems = [...existingCartItems, newItem];

      localStorage.setItem("cart", JSON.stringify(updatedCartItems));
      localStorage.setItem("numItem", parseInt(localStorage.getItem("numItem")) + 1)
      updateNavBarCartInfo();
    }
    // changing color
    setAddedToCart(true);
    setTimeout(() => {
      setAddedToCart(false);
    }, 2000);
  };

  return (
    <>
      <div
        className="card m-3"
        style={{ minWidth: "20rem", maxWidth: "20rem" }}
      >
        <img
          src={image}
          className="card-img-top"
          alt="..."
          style={{
            width: "19.8rem",
            height: "20rem",
            objectFit: "cover",
            margin: "auto",
          }}
          onClick={handleImageClick}
        />
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <p className="card-text">{description}</p>
          <p
            className="card-text"
            style={{ fontWeight: "bold", color: "green", fontSize: "18px" }}
          >
            Price - ₹{price}/-
          </p>
          <button
            type="button"
            className={`btn ${addedToCart ? "btn-success" : "btn-danger"}`}
            onClick={addToCart}
            disabled={addedToCart}
          >
            {addedToCart ? "Added to Cart" : "Add to Cart"}
          </button>
        </div>
        {showProductPage && (
          <ProductPage product={item} handleClose={handleCloseProductPage} />
        )}
      </div>
    </>
  );
};

export default Cards;
