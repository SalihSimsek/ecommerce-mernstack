import { PersonOutline, Search, ShoppingCart } from "@material-ui/icons";
import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "../../axios";
import "./Header.css";
const Header = () => {
  const history = useHistory();
  const [show, setShow] = useState(false);
  const item = JSON.parse(localStorage.getItem("token"));
  const [username, setUsername] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchParameter, setSearchParameter] = useState("");

  useEffect(() => {
    if (item) {
      if (item.account === "store") {
        setUsername(item.storeName);
      } else {
        const username = item.email.split("@");
        setUsername(username[0]);
      }
    }
    const getCategories = async () => {
      const result = await axios.get("category/categories");
      setCategories(result.data);
      return result.data;
    };
    getCategories();
  }, [item, categories]);

  const searchProduct = (e) => {
    e.preventDefault()
    // history.push(`/search/${selectedCategory}?search=${searchParameter}`)
    if (selectedCategory === '' || selectedCategory === 'none') {
      history.push(`/search?search=${searchParameter}`)
    }
    else {
      history.push(`/search/${selectedCategory}?search=${searchParameter}`)
    }
  }
  if (window.location.pathname === '/login' || window.location.pathname === '/register') return null;
  return (
    <div className="header">
      <div className="header_container">
        <div className="header_containerLogo">
          <h1>
            <Link to="/">nakaulos</Link>
          </h1>
        </div>
        <form className="header_containerSearch" onSubmit={searchProduct}>
          <select
            className="category_select"
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option disabled selected value="none">
              Categories
            </option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.categoryName}
              </option>
            ))}
          </select>
          <div className="search_container">
            <input
              type="text"
              className="search_containerInput"
              onChange={(e) => setSearchParameter(e.target.value)}
            />
            <Search className="search_containerIcon" />
          </div>
        </form>
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
                  <p
                    onClick={() => {
                      localStorage.removeItem("token");
                      history.push("/login");
                    }}
                  >
                    Logout
                  </p>
                </div>
              ) : (
                <div className="items">
                  <p>
                    <Link to="/login">Login</Link>
                  </p>
                  <p>
                    <Link to="/register">Register</Link>
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
