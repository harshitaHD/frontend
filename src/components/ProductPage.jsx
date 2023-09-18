import React from "react";
import "../App.css";
// import "bootstrap/dist/css/bootstrap.min.css";

const ProductPage = ({ product, handleClose }) => {
  const { name, description, price, image, usage } = product;

  return (
    <div className="product-page">
      <div className="product-details">
        <img className="img-fluid" src={image} alt="Product" />
        <div className="details">
          <h2>{name}</h2>
          <p>{description}</p>
          <p>Price: {price} Rs</p>
          <p>{usage}</p>
        </div>
        <button
          type="button"
          className="btn btn-secondary"
          data-bs-dismiss="modal"
          onClick={handleClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ProductPage;
