import React from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import classes from "./SingleMovie.module.css";

const SingleMovie = ({ movie }) => {
  console.log(movie);
  return (
    <React.Fragment>
      <div className={classes.movie__div}>
        <div className={classes.movie__heading}>
          <h4>Original Title: {movie.original_title}</h4>

          <i>
            <FaTrash />
          </i>
        </div>
        <div>
          <h4>Overview:</h4>
          <p>{movie.overview}</p>
        </div>
        <div>
          <p>
            <strong>Release Date: </strong>
            {movie.release_date}
          </p>
          <p>
            <strong>Rating: </strong>
            {movie.vote_average}
          </p>
        </div>
      </div>
    </React.Fragment>
  );
};

export default SingleMovie;
