import React from "react";
import classes from "./MovieExcerpt.module.css";
import { Link } from "react-router-dom";

const MovieExcerpt = ({ film }) => {
  const POSTER_URL = "https://image.tmdb.org/t/p/original";

  return (
    <article className={classes.film__excerpt}>
      <div className={classes.film__title}>
        <h3>{film.title}</h3>
      </div>
      <div>
        <img
          className={classes.film__poster}
          src={`${POSTER_URL}${film.poster}`}
          alt="poster"
        />
        <h3>Rating: {film.rating}</h3>
        {/* <h3>Relesed: {film.released}</h3> */}
        <Link className="btn__primary" to={`/movie/${film.id}`}>
          View More
        </Link>
      </div>
    </article>
  );
};

export default MovieExcerpt;
