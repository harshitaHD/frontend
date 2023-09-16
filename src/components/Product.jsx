import React from "react";
import list from "./data";
import Cards from "./Cards";
// import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";

const Product = ({ handleClick }) => {
  return (
    <section
      className="m-3"
      style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
    >
      {list.map((item) => (
        <Cards item={item} key={item.id} handleClick={handleClick} />
      ))}
    </section>
  );
};

export default Product;
