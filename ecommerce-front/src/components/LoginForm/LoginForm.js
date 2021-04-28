import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import axios from '../../axios'
import './LoginForm.css'
const LoginForm = ({ form }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorStatus, setErrorStatus] = useState(false);

    const history = useHistory()

    useEffect(() => {
        setErrorStatus(false)
    }, [form])

    const userLogin = () => {
        if (email !== "" && password !== "") {
            axios
                .post("user/login", { email: email, password: password })
                .then((result) => {
                    result.data.account = 'user'
                    localStorage.setItem("token", JSON.stringify(result.data));
                    setEmail("");
                    setPassword("");
                    setErrorStatus(false);
                    history.push('/')
                })
                .catch((err) => {
                    setErrorStatus(true);
                });
        } else {
            setErrorStatus(true);
        }
    };

    const storeLogin = () => {
        if (email !== "" && password !== "") {
            axios
                .post("store/login", { email: email, password: password })
                .then((result) => {
                    result.data.account = 'store'
                    localStorage.setItem("token", JSON.stringify(result.data));
                    setEmail("");
                    setPassword("");
                    setErrorStatus(false);
                    history.push('/')
                })
                .catch((err) => {
                    setErrorStatus(true);
                });
        } else {
            setErrorStatus(true);
        }
    };

    const login = (e) => {
        e.preventDefault()
        form ? userLogin() : storeLogin();
    }

    return (
        <div className="login_form_container">
            <form className="login_form_containerForm">
                <input
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    type="text"
                    className={`${errorStatus ? "error" : ""} input`}
                    placeholder={form ? 'Client Email' : 'Store Email'}
                />
                <input
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    type="password"
                    className={`${errorStatus ? "error" : ""} input`}
                    placeholder={form ? 'Client Password' : 'Store Password'}
                />
                <button onClick={login} className="login_button">
                    Login
              </button>
            </form>
        </div>
    )
}

export default LoginForm
