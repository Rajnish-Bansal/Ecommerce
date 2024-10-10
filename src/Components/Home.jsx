import axios from "axios";
import React, { useEffect, useState } from "react";
import "./home.css";
import { Link } from "react-router-dom";

function Home(prop) {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  const handleCart = (item) => {
    if (prop.isloggedIn) {
      if (!cart.map((cartItem) => cartItem.id).includes(item.id)) {
        setCart([...cart, item]);
        localStorage.setItem("cart", JSON.stringify([...cart, item]));
        alert(`${item.title} is added to your Cart`);
      } else {
        alert("Item is already added in your cart");
      }
    } else {
      alert("Please login");
    }
  };

  const productDetails = (item) => {
    prop.setProductDetails(item);
  };

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Provide default value to `prop.search`
  const searchQuery = prop.search ? prop.search.toLowerCase() : "";

  // Filter products based on the search query
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery)
  );

  return (
    <div className="home-container">
      <h2>Home</h2>
      <div className="product-list">
        {filteredProducts.map((product, index) => (
          <div className="product-item" key={index}>
            <Link
              to={`/product/${product.id}`}
              onClick={() => productDetails(product)}
              className="product-title"
            >
              {product.title}
            </Link>
            <Link
              to={`/product/${product.id}`}
              onClick={() => productDetails(product)}
              className="image-div"
            >
              <img
                src={product.image}
                className="product-image"
                alt="Img"
              ></img>
            </Link>

            <div className="product-footer">
              <div className="product-price">
                Rs. {Math.round(product.price * 80)}/-
              </div>
              <button
                className="a2c-button"
                onClick={() => handleCart(product)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="mobile-products-list">
        {/* <div>djkadna</div> */}
        {filteredProducts.map((product, index) => (
          <div className="mobile-product-item" key={index}>
            <Link
              to={`/product/${product.id}`}
              onClick={() => productDetails(product)}
              className="mobile-product-title"
            >
              {product.title}
            </Link>
            <Link
              to={`/product/${product.id}`}
              onClick={() => productDetails(product)}
              className="mobile-image-div"
            >
              <img
                src={product.image}
                className="mobile-product-image"
                alt="Img"
              ></img>
            </Link>
            <div className="mobile-product-footer">
              <div className="mobile-product-price">
                Rs. {Math.round(product.price * 80)}/-
              </div>
              <button
                className="a2c-button"
                onClick={() => handleCart(product)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
