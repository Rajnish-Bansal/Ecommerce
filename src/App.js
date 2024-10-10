import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import "./App.css";
import Home from "./Components/Home";
import Cart from "./Components/Cart";
import { useEffect, useState } from "react";
import ProductDetails from "./Components/ProductDetails";
import Category from "./Components/Category";
import Login from "./Components/Login";
import Contact from "./Components/Contact";

function App() {
  const [productDetails, setProductDetails] = useState([]);
  const [category, setCategory] = useState();
  const [isloggedIn, setIsLoggedIn] = useState(false);
  const [totalPrice, setTotalPrice] = useState();
  const [search, setSearch] = useState();

  useEffect(() => {
    const loggedInStatus = JSON.parse(localStorage.getItem("login"));
    if (loggedInStatus) {
      setIsLoggedIn(loggedInStatus);
    }
  }, []);

  const navigate = useNavigate();

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setCategory(selectedCategory);
    navigate(`/${selectedCategory}`);
  };

  return (
    <div className="main-container">
      <header className="mobile-header">
        <div className="mobile-header1">
          <select value={category} onChange={handleCategoryChange}>
            <option value="/" disabled>
              Category
            </option>
            <option value="men's clothing">Men</option>
            <option value="women's clothing">Women</option>
            <option value="jewelery">Jewellery</option>
            <option value="electronics">Electronics</option>
          </select>
        </div>
        <input
          type="search"
          className="mobile-search-bar"
          placeholder="Search"
          onChange={(e) => setSearch(e.target.value)}
          // value={search}
        ></input>
        <Link to="/login" className="mobile-header-items">
          {!isloggedIn ? "Login" : "Profile"}
        </Link>
      </header>
      <header className="header">
        <div className="header1">
          <Link to="/" className="header-items">
            Home
          </Link>
          <Link
            to="/men"
            className="header-items"
            onClick={() => setCategory(`men's clothing`)}
          >
            Men
          </Link>
          <Link
            to="/women"
            className="header-items"
            onClick={() => setCategory(`women's clothing`)}
          >
            Women
          </Link>
          <Link
            to="/jewellery"
            className="header-items"
            onClick={() => setCategory("jewelery")}
          >
            Jewellery
          </Link>
          <Link
            to="/electronics"
            className="header-items"
            onClick={() => setCategory("electronics")}
          >
            Electronics
          </Link>
        </div>
        <input
          type="search"
          className="search-bar"
          placeholder="Search"
          onChange={(e) => setSearch(e.target.value)}
          // value={search}
        ></input>
        <div className="header2">
          <Link to="/contact" className="header-items">
            Contact Us
          </Link>
          <Link
            to={isloggedIn ? "/cart" : "/login"}
            onClick={(e) => {
              if (!isloggedIn) {
                alert("Please Login");
              }
            }}
            className="header-items"
          >
            Cart
          </Link>
          <Link to="/login" className="header-items">
            {!isloggedIn ? "Login" : "Welcome User"}
          </Link>
        </div>
      </header>
      <div className="component-container">
        <Routes>
          <Route
            path="/"
            element={
              <Home
                productDetails={productDetails}
                setProductDetails={setProductDetails}
                isloggedIn={isloggedIn}
                search={search}
              />
            }
          ></Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route
            path="/product/:id"
            element={
              <ProductDetails
                productDetails={productDetails}
                setProductDetails={setProductDetails}
                setTotalPrice={setTotalPrice}
                totalPrice={totalPrice}
              />
            }
          ></Route>
          <Route
            path="/:category"
            element={
              <Category
                category={category}
                setCategory={setCategory}
                productDetails={productDetails}
                setProductDetails={setProductDetails}
                isloggedIn={isloggedIn}
                search={search}
              />
            }
          ></Route>
          <Route path="/contact" element={<Contact />}></Route>
          <Route
            path="/login"
            element={
              <Login isloggedIn={isloggedIn} setIsLoggedIn={setIsLoggedIn} />
            }
          ></Route>
        </Routes>
      </div>
      <div className="mobile-component-container">
        <Routes>
          <Route
            path="/"
            element={
              <Home
                productDetails={productDetails}
                setProductDetails={setProductDetails}
                isloggedIn={isloggedIn}
                search={search}
              />
            }
          ></Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route
            path="/product/:id"
            element={
              <ProductDetails
                productDetails={productDetails}
                setProductDetails={setProductDetails}
                setTotalPrice={setTotalPrice}
                totalPrice={totalPrice}
              />
            }
          ></Route>
          <Route
            path="/:category"
            element={
              <Category
                category={category}
                setCategory={setCategory}
                productDetails={productDetails}
                setProductDetails={setProductDetails}
                isloggedIn={isloggedIn}
                search={search}
              />
            }
          ></Route>
          <Route path="/contact" element={<Contact />}></Route>
          <Route
            path="/login"
            element={
              <Login isloggedIn={isloggedIn} setIsLoggedIn={setIsLoggedIn} />
            }
          ></Route>
        </Routes>
      </div>
      <footer className="mobile-footer">
        <Link to="/" className="mobile-footer-items">
          Home
        </Link>
        <Link to="/contact" className="mobile-footer-items">
          Contact Us
        </Link>
        <Link
          to={isloggedIn ? "/cart" : "/login"}
          onClick={(e) => {
            if (!isloggedIn) {
              alert("Please Login");
            }
          }}
          className="mobile-footer-items"
        >
          Cart
        </Link>
      </footer>
    </div>
  );
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;
