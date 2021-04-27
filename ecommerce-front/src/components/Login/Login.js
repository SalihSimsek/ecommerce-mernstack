import React, { useState } from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import LoginForm from "../LoginForm/LoginForm";
const Login = () => {
  const [change, setChange] = useState(true);

  const changeStatus = (e) => {
    if (!e.target.classList.contains("choosen")) {
      // change ? history.push("/login/store") : history.push("/login/client");
      setChange(!change);
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
        <LoginForm form={change} />
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
