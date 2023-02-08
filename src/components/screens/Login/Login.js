import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { login } from "../../features/auth/authSlice";
import classes from "./Login.module.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    pass: "",
  });

  const dispatch = useDispatch();

  const { user, isLoading, isSuccess, message } = (state) => state.auth;

  const { email, pass } = formData;

  const inputHandler = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onLogin = (e) => {
    e.preventDefault();

    const userData = {
      email,
      pass,
    };

    dispatch(login(userData));
  };

  return (
    <section className={`main ${classes.card}`}>
      <h3 className={classes.heading}>Login</h3>
      <div>
        <form className={classes.form} onSubmit={onLogin}>
          <input
            id="email"
            name="email"
            value={email}
            type="email"
            className={classes.input}
            placeholder="Email"
            onChange={inputHandler}
          ></input>
          <input
            id="pass"
            name="pass"
            value={pass}
            type="password"
            className={classes.input}
            placeholder="Password"
            onChange={inputHandler}
          ></input>

          <button className="btn__primary">Login</button>
        </form>
      </div>
    </section>
  );
};

export default Login;
