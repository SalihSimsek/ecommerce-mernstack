import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import axios from '../../axios'

import './RegisterForm.css'


const RegisterForm = ({ form }) => {
    const history = useHistory();
    const [errorStatus, setErrorStatus] = useState(false);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cPassword, setCPassword] = useState("");

    useEffect(() => {
        setErrorStatus(false)
    }, [form])

    const registerUser = () => {
        axios
            .post("user/register", {
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password,
                c_password: cPassword,
            })
            .then((result) => history.push("/login"))
            .catch((err) => setErrorStatus(true));
    };

    const registerStore = () => {
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

    const register = (e) => {
        e.preventDefault()
        form ? registerUser() : registerStore()
    }
    return (
        <div className="register_form_container">
            <form className="register_form_containerForm">
                <input
                    onChange={(e) => setFirstName(e.target.value)}
                    value={firstName}
                    type="text"
                    className={`${errorStatus ? "error" : ""} input`}
                    placeholder={form ? 'Client Firstname' : 'Store Name'}
                />
                <input
                    onChange={(e) => setLastName(e.target.value)}
                    value={lastName}
                    type="text"
                    className={`${errorStatus ? "error" : ""} input`}
                    placeholder={form ? 'Client Lastname' : 'Store Phone: 5xxxxxxxxx'}
                />
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
                <input
                    onChange={(e) => setCPassword(e.target.value)}
                    value={cPassword}
                    type="password"
                    className={`${errorStatus ? "error" : ""} input`}
                    placeholder={form ? 'Client Password Again' : 'Store Password Again'}
                />
                <button onClick={register} className="register_button">
                    Register
              </button>
            </form>
        </div>
    )
}

export default RegisterForm
