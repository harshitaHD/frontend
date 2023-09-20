import React from "react";
import Home from "./components/Home";
import Cart from "./components/Cart";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import { useEffect } from "react";

const App = () => {
  useEffect(() => {
    localStorage.setItem("numItem", 0);
  }, []);
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/cart" element={<Cart />} />
          <Route exact path="/login" element={<LoginPage />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
