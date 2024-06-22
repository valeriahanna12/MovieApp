import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Joi from "joi";
import { Helmet } from "react-helmet";

export default function Register() {
    let navigate = useNavigate();
    const [errorList, setErrorList] = useState([]);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        rePassword: "",
        phone: "",
    });

    function getUserData(eventInfo) {
        let myUser = { ...user };
        myUser[eventInfo.target.name] = eventInfo.target.value;
        setUser(myUser);
    }

    async function sendRegisterDataToApi() {
        try {
            const { data } = await axios.post(
                `https://ecommerce.routemisr.com/api/v1/auth/signup`,
                user
            );
            if (data.message === "success") {
                setIsLoading(false);
                navigate("/Login");
            } else {
                setIsLoading(false);
                setError(data.message);
            }
        } catch (error) {
            setIsLoading(false);
            setError("An error occurred. Please try again later.");
        }
    }

    function submitRegisterForm(eventInfo) {
        setIsLoading(true);
        eventInfo.preventDefault();
        let validation = validateRegister();
        if (validation.error) {
            setIsLoading(false);
            setErrorList(validation.error.details);
        } else {
            sendRegisterDataToApi();
        }
    }

    function validateRegister() {
        let schema = Joi.object({
            name: Joi.string()
                .min(3)
                .max(12)
                .pattern(/^[A-Z]/)
                .required(),
            email: Joi.string()
                .email({
                    minDomainSegments: 2,
                    tlds: { allow: ["com", "net"] },
                })
                .required(),
            password: Joi.string().pattern(/^[A-Z][a-z]{3,6}/),
            rePassword: Joi.ref("password"),
            phone: Joi.string().pattern(/^01[0-2]{1}[0-9]{8}$/),
        });
        return schema.validate(user, { abortEarly: false });
    }

    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <meta name="description" content="login-page" />
                <title>Register Page</title>
            </Helmet>
            {errorList.map((err, index) => (
                <div key={index} className="alert alert-danger my-2">
                    {
                        err.context && err.context.label === "name"
                            ? "Name should start with a capital letter"
                            : err.context && err.context.label === "email"
                            ? "Email Invalid"
                            : err.context && err.context.label === "password"
                            ? "Password Invalid"
                            : err.context && err.context.label === "rePassword"
                            ? "Passwords do not match"
                            : err.context && err.context.label === "phone"
                            ? "Phone number invalid"
                            : err.message // Show the error message if none of the specified cases match
                    }
                </div>
            ))}

            {error && <div className="alert alert-danger my-2">{error}</div>}

            <form onSubmit={submitRegisterForm}>
                <label htmlFor="name">Name : </label>
                <input
                    onChange={getUserData}
                    type="text"
                    className="my-input form-control"
                    name="name"
                    id="name"
                />

                <label htmlFor="email">E-mail : </label>
                <input
                    onChange={getUserData}
                    type="email"
                    className="my-input form-control"
                    name="email"
                    id="email"
                />

                <label htmlFor="password">Password : </label>
                <input
                    onChange={getUserData}
                    type="password"
                    className="my-input form-control"
                    name="password"
                    id="password"
                />

                <label htmlFor="rePassword">Confirm Password : </label>
                <input
                    onChange={getUserData}
                    type="password"
                    className="my-input form-control"
                    name="rePassword"
                    id="rePassword"
                />

                <label htmlFor="phone">Phone : </label>
                <input
                    onChange={getUserData}
                    type="text"
                    className="my-input form-control"
                    name="phone"
                    id="phone"
                />

                <button className="btn btn-primary mt-3">
                    {isLoading ? (
                        <i className="fas fa-spinner fa-spin"></i>
                    ) : (
                        "Register"
                    )}
                </button>
            </form>
        </>
    );
}
