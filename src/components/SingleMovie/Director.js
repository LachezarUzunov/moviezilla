import React from "react";
import classes from "./Director.module.css";

const Director = ({ director }) => {
  return (
    <div>
      <h3>Name:</h3>
      <h4>{director.original_name}</h4>
    </div>
  );
};

export default Director;