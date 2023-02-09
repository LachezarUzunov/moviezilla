import React from "react";
import classes from "./Loader.module.css";
import spinner from "../../../assets/Eclipse-1s-200px.gif";

const Loader = () => {
  return (
    <div className={classes.center}>
      <img width={180} src={spinner} alt="Loading..." />
    </div>
  );
};

export default Loader;
