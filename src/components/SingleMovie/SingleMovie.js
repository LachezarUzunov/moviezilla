import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import classes from "./SingleMovie.module.css";
import Actors from "./Actors";
import Director from "./Director";

const SingleMovie = ({ movie }) => {
  const [actors, setActors] = useState([]);
  const [directors, setDirectors] = useState([]);

  useEffect(() => {
    const getActorsAndDirector = async () => {
      try {
        const response = await fetch(
          ` https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=cd725d1c5efc50ead2110487dcd7be9e&language=en-US`
        );

        if (response.status === 200) {
          const castAndCrew = await response.json();
          console.log(castAndCrew.cast);
          setActors(castAndCrew.cast);
          castAndCrew.crew.forEach((crew) => {
            if (crew.job === "Director") {
              setDirectors((prevState) => [...prevState, crew]);
            }
          });
        }
      } catch (error) {
        console.log(error);
      }
    };

    getActorsAndDirector();
  }, []);

  // console.log(directors);
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
          <div>
            {directors.length > 1 ? <h3>Directors:</h3> : <h3>Director:</h3>}
            {directors.length > 0
              ? directors.map((director) => (
                  <Director director={director} key={director.id} />
                ))
              : null}
          </div>
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
        <h3>Cast</h3>
        {actors.length > 0
          ? actors.map((actor) => <Actors actor={actor} key={actor.id} />)
          : null}
      </div>
    </React.Fragment>
  );
};

export default SingleMovie;
