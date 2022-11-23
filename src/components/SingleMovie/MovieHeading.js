import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import classes from "./MovieHeading.module.css";

const MovieHeading = ({ movie }) => {
  const [titleEditMode, setTitleEditMode] = useState(false);
  const handleEditClick = () => {
    setTitleEditMode(true);
  };
  return (
    <div>
      {!titleEditMode ? (
        <div className={classes.movie__title} key={movie.title}>
          <h2>{movie.title}</h2>
          <i>
            <FaEdit className="iconBtn__second" onClick={handleEditClick} />
          </i>
        </div>
      ) : (
        <div>
          <input className="genInput" placeholder={movie.title}></input>
          <button className="btn__primary">Check again</button>
        </div>
      )}
    </div>
  );
};

export default MovieHeading;
