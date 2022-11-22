import React from "react";
import classes from "./Actors.module.css";

const Cast = ({ actor }) => {
  return (
    <div>
      <h3>Name:</h3>
      <h4>{actor.original_name}</h4>
    </div>
  );
};

export default Cast;
