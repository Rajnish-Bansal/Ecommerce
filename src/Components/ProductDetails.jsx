import React, { useEffect, useState } from "react";
import "./productDetails.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function ProductDetails(prop) {
  const product = prop.productDetails;
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  const handleCart = (item) => {
    if (!cart.map((cartItem) => cartItem.id).includes(item.id)) {
      setCart([...cart, item]);
      localStorage.setItem('cart' , JSON.stringify([...cart, item]));
      alert(`${item.title} is added to your Cart`);
    } else alert("Item is already added in the cart");
  };

  return (
    <div className="productDetails-container">
      <div className="back-button-div">
        <Link to="/">
          <button className="back-button">Back</button>
        </Link>
      </div>
      <div className="productDetails-item">
        <div className="productDetails-img">
          <img src={product.image} alt="Product" />
        </div>
        <div className="productDetails-detail">
          <h1>{product.title}</h1>
          <div className="productDetails-description">
            {product.description}
          </div>
          <div className="productDetails-footer">
            <div className="productDetails-price">
              Rs.{Math.round(product.price * 80)}/-
            </div>
            <button className="" onClick={() => handleCart(product)}>
              Add To Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;

