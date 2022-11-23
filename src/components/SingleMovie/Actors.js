import React from "react";
import classes from "./Actors.module.css";

const Cast = ({ actor }) => {
  return <h4>{actor.original_name}, </h4>;
};

export default Cast;
