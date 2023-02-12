import React, { useEffect, useState } from "react";
import classes from "./SingleMovieFromList.module.css";
import Actors from "../SingleMovie/Actors";
import Director from "../SingleMovie/Director";
import Genres from "../SingleMovie/Genres";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const SingleMovieFromList = () => {
  const [actors, setActors] = useState([]);
  const [directors, setDirectors] = useState([]);
  const [genres, setGenres] = useState([]);
  const [duration, setDuration] = useState();
  const [trailer, setTrailer] = useState();

  const { id } = useParams();
  const { list } = useSelector((state) => state.list);
  const watchlist = list[0].watchlist;
  console.log(watchlist[0].id);
  console.log(id);
  const film = watchlist.filter((m) => m.id.toString() === id);
  console.log(film);

  useEffect(() => {
    const getActorsAndDirector = async () => {
      try {
        const response = await fetch(
          ` https://api.themoviedb.org/3/movie/${id}/credits?api_key=cd725d1c5efc50ead2110487dcd7be9e&language=en-US`
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
          `https://api.themoviedb.org/3/movie/${id}?api_key=cd725d1c5efc50ead2110487dcd7be9e&language=en-US`
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
          `https://api.themoviedb.org/3/movie/${id}/videos?api_key=cd725d1c5efc50ead2110487dcd7be9e&language=en-US`
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

  return (
    <section className={classes.movies__results}>
      <div className={classes.movie__div}>
        <div className={classes.movie__heading}>
          <h3>
            Original Title: <p>{film[0].title}</p>
          </h3>
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
          <p>{film[0].overview}</p>
        </div>
        <div>
          <h3>Release Date</h3>
          <p>{film[0].released}</p>
        </div>
        <div>
          <h3>Duration: {duration} mins.</h3>
        </div>
        <div>
          <h3>Rating: {film[0].rating}</h3>
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
                  title={film[0].original_title}
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

export default SingleMovieFromList;
