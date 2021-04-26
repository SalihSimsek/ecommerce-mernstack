import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "../../axios";
import "./Register.css";
const Register = () => {
  const history = useHistory();
  const [change, setChange] = useState(true);
  const [errorStatus, setErrorStatus] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");

  const changeStatus = (e) => {
    if (!e.target.classList.contains("choosen")) {
      // change ? history.push("/login/store") : history.push("/login/client");
      setEmail("");
      setPassword("");
      setLastName("");
      setFirstName("");
      setCPassword("");
      setErrorStatus(false);
      setChange(!change);
    }
  };

  const changeFirstName = (e) => setFirstName(e.target.value);

  const changeLastName = (e) => setLastName(e.target.value);

  const changeEmail = (e) => setEmail(e.target.value);

  const changePassword = (e) => setPassword(e.target.value);

  const changeCPassword = (e) => setCPassword(e.target.value);

  const registerUser = (e) => {
    e.preventDefault();
    axios
      .post("user/register", {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        c_password: cPassword,
      })
      .then((result) => history.push("/login"))
      .catch((err) => console.log(err));
  };

  const registerStore = (e) => {
    e.preventDefault();
    axios
      .post("store/register", {
        storeName: firstName,
        phone: lastName,
        email: email,
        password: password,
        c_password: cPassword,
      })
      .then((result) => history.push("/login"))
      .catch((err) => setErrorStatus(true));
  };

  return (
    <div className="register">
      <div className="ecom_logo">
        <h1>nakaulos</h1>
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
        {change ? (
          <div className="register_form_container">
            <form className="register_form_containerForm">
              <input
                onChange={changeFirstName}
                value={firstName}
                type="text"
                className={`${errorStatus ? "error" : ""} input`}
                placeholder="Client Firstname"
              />
              <input
                onChange={changeLastName}
                value={lastName}
                type="text"
                className={`${errorStatus ? "error" : ""} input`}
                placeholder="Client Lastname"
              />
              <input
                onChange={changeEmail}
                value={email}
                type="text"
                className={`${errorStatus ? "error" : ""} input`}
                placeholder="Client Email"
              />
              <input
                onChange={changePassword}
                value={password}
                type="password"
                className={`${errorStatus ? "error" : ""} input`}
                placeholder="Client Password"
              />
              <input
                onChange={changeCPassword}
                value={cPassword}
                type="password"
                className={`${errorStatus ? "error" : ""} input`}
                placeholder="Client Password Again"
              />
              <button onClick={registerUser} className="register_button">
                Register
              </button>
            </form>
          </div>
        ) : (
          <div className="register_form_container">
            <form className="register_form_containerForm">
              <input
                onChange={changeFirstName}
                value={firstName}
                type="text"
                className={`${errorStatus ? "error" : ""} input`}
                placeholder="Store Name"
              />
              <input
                onChange={changeEmail}
                value={email}
                type="text"
                className={`${errorStatus ? "error" : ""} input`}
                placeholder="Store Email"
              />
              <input
                onChange={changeLastName}
                value={lastName}
                type="text"
                className={`${errorStatus ? "error" : ""} input`}
                placeholder="Phone: 5xxxxxxxxx"
              />
              <input
                onChange={changePassword}
                value={password}
                type="text"
                className={`${errorStatus ? "error" : ""} input`}
                placeholder="Store Password"
              />
              <input
                onChange={changeCPassword}
                value={cPassword}
                type="text"
                className={`${errorStatus ? "error" : ""} input`}
                placeholder="Store Password Again"
              />
              <button onClick={registerStore} className="register_button">
                Register
              </button>
            </form>
          </div>
        )}
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
