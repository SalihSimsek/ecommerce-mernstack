import React, { useState } from "react";
import "./Login.css";
import axios from "../../axios";
import { Link } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [change, setChange] = useState(true);
  const [errorStatus, setErrorStatus] = useState(false);

  const changeStatus = (e) => {
    if (!e.target.classList.contains("choosen")) {
      // change ? history.push("/login/store") : history.push("/login/client");
      setEmail("");
      setPassword("");
      setErrorStatus(false);
      setChange(!change);
    }
  };

  const changeEmail = (e) => {
    setEmail(e.target.value);
  };

  const changePassord = (e) => {
    setPassword(e.target.value);
  };

  const userLogin = (e) => {
    e.preventDefault();
    if (email !== "" && password !== "") {
      axios
        .post("user/login", { email: email, password: password })
        .then((result) => {
          localStorage.setItem("token", JSON.stringify(result.data));
          setEmail("");
          setPassword("");
          setErrorStatus(false);
        })
        .catch((err) => {
          setErrorStatus(true);
        });
    } else {
      setErrorStatus(true);
    }
  };

  const storeLogin = (e) => {
    e.preventDefault();
    if (email !== "" && password !== "") {
      axios
        .post("store/login", { email: email, password: password })
        .then((result) => {
          localStorage.setItem("token", JSON.stringify(result.data));
          setEmail("");
          setPassword("");
          setErrorStatus(false);
        })
        .catch((err) => {
          setErrorStatus(true);
        });
    } else {
      setErrorStatus(true);
    }
  };

  return (
    <div className="login">
      <div className="ecom_logo">
        <h1>nakaulos</h1>
      </div>
      <div className="form_container">
        <div className="account_option_buttons">
          <div
            onClick={changeStatus}
            className={`${change ? "choosen" : ""} user_login_button`}
          >
            Client
          </div>
          <div
            onClick={changeStatus}
            className={`${change ? "" : "choosen"} store_login_button`}
          >
            Store
          </div>
        </div>
        {change ? (
          <div className="login_form_container">
            <form className="login_form_containerForm">
              <input
                onChange={changeEmail}
                value={email}
                type="text"
                className={`${errorStatus ? "error" : ""} input`}
                placeholder="Client Email"
              />
              <input
                onChange={changePassord}
                value={password}
                type="password"
                className={`${errorStatus ? "error" : ""} input`}
                placeholder="Password"
              />
              <button onClick={userLogin} className="login_button">
                Login
              </button>
            </form>
          </div>
        ) : (
          <div className="login_form_container">
            <form className="login_form_containerForm">
              <input
                onChange={changeEmail}
                value={email}
                type="text"
                className={`${errorStatus ? "error" : ""} input`}
                placeholder="Store Email"
              />
              <input
                onChange={changePassord}
                value={password}
                type="password"
                className={`${errorStatus ? "error" : ""} input`}
                placeholder="Password"
              />
              <button onClick={storeLogin} className="login_button">
                Login
              </button>
            </form>
          </div>
        )}

        <div className="forgot_register_area">
          <div className="forgot_password">Forgot Password</div>
          <div className="create_account">
            <Link to="/register">Create an account</Link>
          </div>
        </div>
        <div className="card_copyright">
          <p>
            <span>&copy;</span> 2021 - salihfsimsek.com
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
