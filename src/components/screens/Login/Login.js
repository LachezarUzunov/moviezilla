import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login, reset } from "../../features/auth/authSlice";
import { getMyWatchlist } from "../../features/watchlist/watchlistSlice";
import Loader from "../layout/Loader";
import classes from "./Login.module.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    pass: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const { email, pass } = formData;

  const inputHandler = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    // Redirect when login is successful
    if (isSuccess && user) {
      navigate("/");
    }

    dispatch(reset());
  }, [isError, isSuccess, user, message, dispatch, navigate]);

  const onLogin = (e) => {
    e.preventDefault();

    const userData = {
      email,
      pass,
    };

    dispatch(login(userData));
  };

  if (isLoading) return <Loader />;

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
