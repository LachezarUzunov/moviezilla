import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import classes from "./SingleMovie.module.css";
import Actors from "./Actors";
import Director from "./Director";
import Genres from "./Genres";

const SingleMovie = ({
  movie,
  removeFromList,
  index,
  initialTitle,
  movies,
}) => {
  const [actors, setActors] = useState([]);
  const [directors, setDirectors] = useState([]);
  const [genres, setGenres] = useState([]);
  const [duration, setDuration] = useState();
  const [trailer, setTrailer] = useState();

  useEffect(() => {
    const getActorsAndDirector = async () => {
      try {
        const response = await fetch(
          ` https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=cd725d1c5efc50ead2110487dcd7be9e&language=en-US`
        );

        if (response.status === 200) {
          const castAndCrew = await response.json();
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

  useEffect(() => {
    const getGenreAndDuration = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movie.id}?api_key=cd725d1c5efc50ead2110487dcd7be9e&language=en-US`
        );

        if (response.status === 200) {
          const results = await response.json();
          setGenres(results.genres);
          setDuration(results.runtime);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getGenreAndDuration();
  }, []);

  useEffect(() => {
    const getTrailer = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=cd725d1c5efc50ead2110487dcd7be9e&language=en-US`
        );

        if (response.status === 200) {
          const results = await response.json();

          if (results.results.length > 1) {
            const video = results.results.slice(0, 1);
            setTrailer(video[0]);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    getTrailer();
  }, []);

  const removeFilmFromList = () => {
    removeFromList(movie.id, index, initialTitle, movies);
  };

  return (
    <section className={classes.movies__results}>
      <div className={classes.movie__div}>
        <div className={classes.movie__heading}>
          <h3>
            Original Title: <p>{movie.title}</p>
          </h3>

          <i children={classes.trash__btn}>
            <FaTrash className="iconBtn" onClick={removeFilmFromList} />
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
          <h3>Plot:</h3>
          <p>{movie.overview}</p>
        </div>
        <div>
          <h3>Release Date</h3>
          <p>{movie.released}</p>
        </div>
        <div>
          <h3>Duration: {duration} mins.</h3>
        </div>
        <div>
          <h3>Rating: {movie.rating}</h3>
        </div>
        <h3>Genres</h3>
        {genres.length > 0
          ? genres.map((genre) => <Genres genre={genre.name} key={genre.id} />)
          : null}
        <h3>Cast</h3>
        {actors.length > 0
          ? actors
              .slice(0, 10)
              .map((actor) => <Actors actor={actor} key={actor.id} />)
          : null}
        <div>
          {trailer ? (
            <div>
              <h3>Trailer</h3>
              <div className={classes.trailer}>
                <iframe
                  width="420"
                  height="315"
                  title={movie.original_title}
                  src={`https://www.youtube.com/embed/${trailer.key}`}
                ></iframe>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default SingleMovie;
