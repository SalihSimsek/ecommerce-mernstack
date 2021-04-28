import React, { useState } from "react";
import { Link } from "react-router-dom";
import RegisterForm from "../RegisterForm/RegisterForm";
import "./Register.css";
const Register = () => {
  const [change, setChange] = useState(true);


  const changeStatus = (e) => {
    if (!e.target.classList.contains("choosen")) {
      // change ? history.push("/login/store") : history.push("/login/client");
      setChange(!change);
    }
  };


  return (
    <div className="register">
      <div className="ecom_logo">
        <h1><Link to="/">nakaulos</Link></h1>
      </div>
      <div className="form_container form_container_extend">
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
        <RegisterForm form={change} />
        <div className="register_card_copyright">
          <p>
            <span>&copy;</span> 2021 - salihfsimsek.com
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
