import React from "react";
import { FaTrash } from "react-icons/fa";
import classes from "./SingleMovie.module.css";

const SingleMovie = ({ movie }) => {
  console.log(movie);
  return (
    <React.Fragment>
      <div className={classes.movieDiv}>
        <h4>{movie.original_title}</h4>
        <i>
          <FaTrash />
        </i>
      </div>
    </React.Fragment>
  );
};

export default SingleMovie;
