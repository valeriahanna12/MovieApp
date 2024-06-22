import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Joi from "joi";
import { Helmet } from "react-helmet";

export default function Login({ saveUserData }) {
  let navigate = useNavigate();
  const [errorList, setErrorList] = useState([]);
  const [error, setError] = useState("");
  const [isLouding, setIsLouding] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  function getUserData(eventInfo) {
    let myUser = { ...user };
    myUser[eventInfo.target.name] = eventInfo.target.value;
    setUser(myUser);
    console.log(myUser);
  }

  async function sendLoginDataToApi() {
    let { data } = await axios.post(
      `https://ecommerce.routemisr.com/api/v1/auth/signin`,
      user
    );
    if (data.message === "success") {
      setIsLouding(false);
      localStorage.setItem("userToken", data.token);
      saveUserData();
      navigate("/");
    } else {
      setIsLouding(false);
      setError(data.message);
    }
  }

  function submitLoginForm(eventInfo) {
    setIsLouding(true);
    eventInfo.preventDefault();
    let validation = validateLogin();
    if (validation.error) {
      setIsLouding(false);
      setErrorList(validation.error.details);
    } else {
      sendLoginDataToApi();
    }
  }

  function validateLogin() {
    let scheme = Joi.object({
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
        .required(),
      password: Joi.string().pattern(/^[A-Z][a-z]{3,6}/),
    });
    return scheme.validate(user, { abortEarly: false });
  }

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content="login-page" />
        <title>Login Page</title>
      </Helmet>
      {errorList.map((err, index) => {
        if (err.context.label === "password") {
          return (
            <div key={index} className="alert alert-danger my-2">
              Password Invalid
            </div>
          );
        } else {
          return (
            <div key={index} className="alert alert-danger my-2">
              {err.message}
            </div>
          );
        }
      })}
      {error.length > 0 ? (
        <div className="alert alert-danger my-2">{error}</div>
      ) : (
        ""
      )}

      <form onSubmit={submitLoginForm}>
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

        <button className="btn btn-primary mt-3">
          {isLouding === true ? (
            <i className="fas fa-spinner fa-spin"></i>
          ) : (
            "Login"
          )}
        </button>
      </form>
    </>
  );
}
