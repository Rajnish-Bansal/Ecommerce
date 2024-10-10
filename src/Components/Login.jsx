import React, { useEffect, useState } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";

function Login(prop) {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInStatus = localStorage.getItem("login");
    if (loggedInStatus) {
      prop.setIsLoggedIn(JSON.parse(loggedInStatus));
    }
  }, []);

  const handleLogin = () => {
    if (username === "admin" && password === "admin") {
      prop.setIsLoggedIn(true);
      localStorage.setItem("login", JSON.stringify(true));
      alert("Logged in successfully!");
      navigate("/");
    } else {
      alert("Invalid Credentials");
    }
  };

  const handleLogout = () => {
    prop.setIsLoggedIn(false);
    localStorage.setItem("login", JSON.stringify(false));
    alert("Logged out sucessfully");
  };

  return (
    <div className="login-container">
      <h2>{prop.isloggedIn ? "Welcome!" : "Login"}</h2>
      {!prop.isloggedIn ? (
        <div className="login-div">
          <p>
            Username{" "}
            <input onChange={(e) => setUsername(e.target.value)} placeholder="username" ></input>
          </p>
          <p>
            Password{" "}
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="*****"
            ></input>
          </p>
          <button onClick={handleLogin}>Login</button>
        </div>
      ) : (
        <div className="logout-div">
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
}

export default Login;
