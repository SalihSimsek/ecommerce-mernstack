import { PersonOutline, Search, ShoppingCart } from "@material-ui/icons";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
const Header = () => {
  const [show, setShow] = useState(false);
  const item = JSON.parse(localStorage.getItem("token"));
  const [username, setUsername] = useState("");
  useEffect(() => {
    if (item.account === "store") {
      setUsername(item.storeName);
    } else {
      const username = item.email.split("@");
      setUsername(username[0]);
    }
  }, [item]);
  return (
    <div className="header">
      <div className="header_container">
        <div className="header_containerLogo">
          <h1>
            <Link to="/">nakaulos</Link>
          </h1>
        </div>
        <div className="header_containerSearch">
          <select className="category_select">
            <option value="" disabled selected>
              Categories
            </option>
            <option value="Tech">Tech</option>
            <option value="Home">Home</option>
          </select>
          <div className="search_container">
            <input type="text" className="search_containerInput" />
            <Search className="search_containerIcon" />
          </div>
        </div>
        <div className="header_containerIcons">
          <div
            onMouseEnter={() => setShow(true)}
            onMouseLeave={() => setShow(false)}
            className="button_container"
          >
            <PersonOutline className="icon_user" />
            <div
              className={`${show ? "show_card" : ""} login_register_cardArrow`}
            ></div>
            <div
              className={`${show ? "show_card" : ""} login_register_cardDiv`}
            ></div>
            <div className={`${show ? "show_card" : ""} login_register_card`}>
              {item ? (
                <div className="items">
                  <p>
                    <Link to="/">Account</Link>
                  </p>
                  {item.account === "store" ? (
                    <p>
                      <Link to="/">Add Product</Link>
                    </p>
                  ) : (
                    ""
                  )}
                  <p>
                    <Link to="/">Orders</Link>
                  </p>
                  <p>
                    <Link to="/">Logout</Link>
                  </p>
                </div>
              ) : (
                <div className="items">
                  <p>
                    <Link to="/">Login</Link>
                  </p>
                  <p>
                    <Link to="/">Register</Link>
                  </p>
                </div>
              )}
            </div>
            <div className="login_text">
              {item ? (
                <div>
                  <h2>{username}</h2>
                </div>
              ) : (
                <div>
                  <h2>Login</h2>
                  <h3>or register</h3>
                </div>
              )}
            </div>
          </div>
          <div className="button_containerCart">
            <ShoppingCart className="icon_cart" />
            <h2 className="count">2</h2>
            <h2>My Cart</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
