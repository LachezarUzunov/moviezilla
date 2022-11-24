import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import classes from "./MovieHeading.module.css";

const MovieHeading = ({ movie, singleMovieSearch, index }) => {
  const [titleEditMode, setTitleEditMode] = useState(false);
  const [newMovieTitle, setNewMovieTitle] = useState("");

  const handleEditClick = () => {
    setTitleEditMode(true);
  };

  const onSearchSubmit = () => {
    singleMovieSearch(newMovieTitle, index, movie);


  };

  const handleInput = (e) => {
    e.preventDefault();
    setNewMovieTitle(e.target.value);
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
          <input
            className="genInput"
            placeholder={movie.title}
            type="text"
            onChange={handleInput}
            value={newMovieTitle}
          ></input>
          <button className="btn__primary" onClick={onSearchSubmit}>
            Check again
          </button>
        </div>
      )}
    </div>
  );
};

export default MovieHeading;
