import React, { useEffect, useState } from "react";
import "./cart.css";
// import { json } from "react-router-dom";

function Cart(prop) {
  const [quantity, setQuantity] = useState({});
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const storedCart = localStorage.getItem("cart");
  const gst = Math.round(totalPrice * 0.05);
  const finalTotal = totalPrice + gst;

  useEffect(() => {
    if (storedCart) {
      setCart(JSON.parse(storedCart));
      setTotalPrice(totalPrice + cart.price);
    }
  }, [cart]);

  useEffect(() => {
    const newTotalPrice = cart.reduce((total, item) => {
      const itemQuantity = quantity[item.id] || 1;
      return total + item.price * 80 * itemQuantity;
    }, 0);
    setTotalPrice(Math.round(newTotalPrice));
  }, [cart, quantity]);

  const handleIncrease = (itemID) => {
    setQuantity((prevQty) => ({
      ...prevQty,
      [itemID]: (prevQty[itemID] || 0) + 1,
    }));
  };

  const handleDecrease = (itemID) => {
    setQuantity((prevQty) => {
      if (prevQty[itemID] > 1) {
        return { ...prevQty, [itemID]: prevQty[itemID] - 1 };
      } else {
        return prevQty;
      }
    });
  };

  const handleRemove = (index) => {
    const updatedCart = cart.filter((item) => item.id !== index);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return (
    <div className="cart-container">
      <h2>My Cart</h2>

      <div className="cart-div">
        <div className="mobile-totalprice-div">
          <div className="mobile-calculation-div">
            <h2>Total Summary</h2>
            <div className="mobile-calculation-grouping">
              Sub Total : <span>Rs. {totalPrice} </span>{" "}
            </div>
            <div className="mobile-calculation-grouping">
              GST (5%) : <span>Rs. {gst}</span>
            </div>
            <div className="mobile-calculation-grouping">
              Total Price : <span>Rs. {finalTotal}</span>
            </div>
          </div>
          <button onClick={() => alert("Thank you for Shopping")}>
            Place Order
          </button>
        </div>
        <div className="totalprice-div">
          <div className="calculation-div">
            <h2>Total Summary</h2>
            <div className="calculation-grouping">
              Sub Total : <span>Rs. {totalPrice} </span>{" "}
            </div>
            <div className="calculation-grouping">
              GST (5%) : <span>Rs. {gst}</span>
            </div>
            <div className="calculation-grouping">
              Total Price : <span>Rs. {finalTotal}</span>
            </div>
            <button onClick={() => alert("Thank you for Shopping")}>
              Place Order
            </button>
          </div>
        </div>
        <div className="items-div">
          {cart.length !== 0 ? (
            cart.map((item, index) => (
              <div key={item.id} className="cart-item">
                <div>{index + 1}.</div>
                <div className="cartItem-img">
                  <img src={item.image} alt="item.img"></img>
                </div>
                <div className="item-title">{item.title}</div>
                <div className="pq-div">
                  <div className="item-price">
                    Rs.{Math.round(item.price * 80)}
                  </div>
                  <div className="qty-div">
                    <button
                      className="decrease"
                      onClick={() => {
                        handleDecrease(item.id);
                      }}
                    >
                      -
                    </button>
                    <p>{quantity[item.id] || 1}</p>
                    <button
                      className="increase"
                      onClick={() => {
                        handleIncrease(item.id);
                      }}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="mobile-div">
                  <div className="mobile-qty-div">
                    <button
                      className="decrease"
                      onClick={() => {
                        handleDecrease(item.id);
                      }}
                    >
                      -
                    </button>
                    <p>{quantity[item.id] || 1}</p>
                    <button
                      className="increase"
                      onClick={() => {
                        handleIncrease(item.id);
                      }}
                    >
                      +
                    </button>
                  </div>
                  <button
                    className="mobile-remove-button"
                    onClick={() => {
                      handleRemove(item.id);
                    }}
                  >
                    Remove
                  </button>
                </div>
                <button
                  className="remove-button"
                  onClick={() => {
                    handleRemove(item.id);
                  }}
                >
                  Remove
                </button>
              </div>
            ))
          ) : (
            <div className="emptyCart-div">
              Cart is Empty !! Please add products
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Cart;
