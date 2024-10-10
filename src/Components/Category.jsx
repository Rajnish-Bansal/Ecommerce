import axios from "axios";
import React, { useEffect, useState } from "react";
import "./category.css";
import { Link } from "react-router-dom";

function Category(prop) {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const categories = prop.category;
  const categorizedProduct = products.filter(
    (product) => product.category === categories
  );

  // Provide default value to `prop.search`
  const searchQuery = prop.search ? prop.search.toLowerCase() : "";

  // Filter products based on the search query
  const filteredProducts = categorizedProduct.filter((product) =>
    product.title.toLowerCase().includes(searchQuery)
  );

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
      .get(`https://fakestoreapi.com/products`)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="category-container">
      <h2>
        {categories === "men's clothing"
          ? "Men"
          : categories === "women's clothing"
          ? "Women"
          : categories === "jewelery"
          ? "Jewellery"
          : categories === "electronics"
          ? "Electronics"
          : ""}
      </h2>

      <div className="category-product-list">
        {filteredProducts.map((product, index) => (
          <div className="category-product-item" key={index}>
            <Link
              to={`/product/${product.id}`}
              onClick={() => productDetails(product)}
              className="category-product-title"
            >
              {product.title}
            </Link>
            <Link
              to={`/product/${product.id}`}
              onClick={() => productDetails(product)}
              className="category-image-div"
            >
              <img
                src={product.image}
                className="category-product-image"
                alt="Img"
              ></img>
            </Link>

            <div className="category-product-footer">
              <div className="category-product-price">
                Rs. {Math.round(product.price * 80)}/-
              </div>
              <button className="" onClick={() => handleCart(product)}>
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="mobile-category-product-list">
        {filteredProducts.map((product, index) => (
          <div className="mobile-category-product-item" key={index}>
            <Link
              to={`/product/${product.id}`}
              onClick={() => productDetails(product)}
              className="mobile-category-product-title"
            >
              {product.title}
            </Link>
            <Link
              to={`/product/${product.id}`}
              onClick={() => productDetails(product)}
              className="mobile-category-image-div"
            >
              <img
                src={product.image}
                className="mobile-category-product-image"
                alt="Img"
              ></img>
            </Link>

            <div className="mobile-category-product-footer">
              <div className="mobile-category-product-price">
                Rs. {Math.round(product.price * 80)}/-
              </div>
              <button className="" onClick={() => handleCart(product)}>
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Category;
