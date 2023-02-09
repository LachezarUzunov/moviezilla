import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { register, reset } from "../../features/auth/authSlice";
import classes from "./Register.module.css";
import { toast } from "react-toastify";
import Loader from "../layout/Loader";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    pass: "",
    repass: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    // Redirect when registration is successful
    if (isSuccess && user) {
      navigate("/");
    }

    dispatch(reset());
  }, [isError, isSuccess, user, message, dispatch, navigate]);

  const { name, email, pass, repass } = formData;

  const inputHandler = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onRegister = (e) => {
    e.preventDefault();

    if (name.length === 0 || email.length === 0) {
      toast.error("Please fill in name and email");
      return;
    }

    if (pass.length < 6) {
      toast.error("Password should be at least 6 characters long");
      return;
    }

    if (pass !== repass) {
      toast.error("Passwords don't match");
      return;
    }

    const userData = {
      name,
      email,
      pass,
    };

    dispatch(register(userData));
  };

  if (isLoading) return <Loader />;

  return (
    <section className={`main ${classes.card}`}>
      <h3 className={classes.heading}>
        Register and become a member of the movie fanatics community
      </h3>
      <div>
        <form className={classes.form} onSubmit={onRegister}>
          <input
            id="name"
            name="name"
            value={name}
            type="text"
            className={classes.input}
            placeholder="Name"
            onChange={inputHandler}
          ></input>
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
          <input
            id="repass"
            name="repass"
            value={repass}
            type="password"
            className={classes.input}
            placeholder="Repeat password"
            onChange={inputHandler}
          ></input>
          <button className="btn__primary">Register</button>
        </form>
      </div>
    </section>
  );
};

export default Register;
