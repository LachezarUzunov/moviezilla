import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import classes from "./Home.module.css";
import SingleMovie from "../SingleMovie/SingleMovie";
import SingleTitle from "../../SingleTitle";
import MovieHeading from "../SingleMovie/MovieHeading";
import { FaAsterisk, FaSearch } from "react-icons/fa";

const Home = () => {
  const [textFile, setTextFile] = useState("");
  const [movieTitles, setMovieTitles] = useState([]);
  const [movieData, setMovieData] = useState([]);
  const [previewClicked, setPreviewClicked] = useState(false);
  const [searched, setSearched] = useState(false);
  const [inputSearch, setInputSearch] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => {
      setTextFile(reader.result);
      setSearched(true);
    };
  };

  useEffect(() => {
    if (textFile.length === 0) {
      return;
    } else {
      setMovieTitles(textFile.split(/\r\n|\n/));
    }
  }, [textFile]);

  const removeFromList = (title) => {
    setMovieTitles(movieTitles.filter((movieTitle) => movieTitle !== title));
  };

  const onFilmsPreview = async () => {
    setPreviewClicked(true);

    movieTitles.forEach(async (title) => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/multi?api_key=cd725d1c5efc50ead2110487dcd7be9e&language=en-US&page=1&include_adult=false&query=${title}`
        );

        if (response.status === 200) {
          const filmData = await response.json();
          let data = [];
          filmData.results.forEach((result) => {
            let filmData = {
              id: result.id,
              title: result.original_title,
              overview: result.overview,
              poster: result.poster_path,
              released: result.release_date,
              rating: result.vote_average,
            };
            data.push(filmData);
          });

          setMovieData((prevState) => [
            ...prevState,
            {
              title: title,
              results: data,
            },
          ]);
        }
      } catch (error) {
        console.log(error);
      }
      setMovieTitles([]);
    });
  };

  const handleRemoveFromList = (movieId, index, initialTitle, movies) => {
    const updatedFilms = movies.results.filter((el) => el.id !== movieId);
    let newFilm = {
      title: initialTitle,
      results: updatedFilms,
    };

    movieData.splice(index, 1, newFilm);
    setMovieData([...movieData]);
  };

  const onSingleMovieSearch = async (newMovieTitle, index, movie) => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=cd725d1c5efc50ead2110487dcd7be9e&language=en-US&page=1&include_adult=false&query=${newMovieTitle}`
      );

      if (res.status === 200) {
        const filmSearch = await res.json();
        let searchData = [];

        filmSearch.results.forEach((result) => {
          let filmData = {
            id: result.id,
            title: result.original_title,
            overview: result.overview,
            poster: result.poster_path,
            released: result.release_date,
            rating: result.vote_average,
          };
          searchData.push(filmData);
        });
        const newFilm = {
          title: newMovieTitle,
          results: searchData,
        };
        movieData.splice(index, 1, newFilm);
        setMovieData([...movieData]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onSearchFill = (e) => {
    setInputSearch(e.target.value);
    console.log(inputSearch);
  };

  // SEARCH BUTTON CLICK NEXT TO INPUT FIELD SEARCH
  const onFilmsSearch = async () => {
    console.log(inputSearch);
    setSearched(true);
    setPreviewClicked(true);

    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=cd725d1c5efc50ead2110487dcd7be9e&language=en-US&page=1&include_adult=false&query=${inputSearch}`
      );

      if (res.status === 200) {
        const filmSearch = await res.json();
        let searchData = [];

        filmSearch.results.forEach((result) => {
          let filmData = {
            id: result.id,
            title: result.original_title,
            overview: result.overview,
            poster: result.poster_path,
            released: result.release_date,
            rating: result.vote_average,
          };
          searchData.push(filmData);
        });

        setMovieData((prevState) => [
          ...prevState,
          {
            title: inputSearch,
            results: searchData,
          },
        ]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const saveList = async () => {
    // SAVING FILMS TO DATABASES

    // try {
    //   const res = await fetch(
    //     `http://localhost:5000/api/post`,
    //     {
    //       method: "POST",
    //       body: movieData,
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //     }
    //   );

    //   if (res.status === 201) {
    //     alert("Success");
    //   }
    // } catch (error) {
    //   console.log(error)
    // }
    setMovieData([]);
    setSearched(false);
    setTextFile("");
    setPreviewClicked(false);
    alert("SUCCESS");
  };

  return (
    <React.Fragment>
      <div className="main">
        <div className={classes.header}>
          <h1 className={classes.header__title}>MOVIEZILLA</h1>
          <h3 className={classes.header__subtitle}>
            Where movie fanatics reside!
          </h3>
        </div>

        {!searched ? (
          <div className={classes.search__field}>
            <input
              placeholder="Search for movie"
              type="text"
              id="text"
              onChange={onSearchFill}
            ></input>
            <button className={classes.search__icon} onClick={onFilmsSearch}>
              <FaSearch />
            </button>
          </div>
        ) : null}
        {!searched ? <h1 className={classes.or}>OR</h1> : null}
        {!searched ? (
          <React.Fragment>
            <div className={classes.upload}>
              <input type="file" id="file" onChange={handleFileUpload}></input>
              <label htmlFor="file" id="file">
                Upload movie list
              </label>
              <div className={classes.asterisk}>
                <FaAsterisk />
              </div>
            </div>
            <div className={classes.note}>
              <h4>
                <span>
                  <FaAsterisk />
                </span>{" "}
                Please note that only .txt files are accepted. Separate each
                movie on a new line without commas or quotes. For example:
              </h4>
              <h4>Interstellar</h4>
              <h4>The Shawshenk Redemption</h4>
              <h4>Avatar</h4>
            </div>
          </React.Fragment>
        ) : null}
      </div>
      {searched ? (
        <div className={classes.movieList}>
          <div>
            <div>
              {movieTitles.length > 0
                ? movieTitles.map((title, index) => (
                    <SingleTitle
                      key={title}
                      title={title}
                      index={index}
                      removeFromList={removeFromList}
                    />
                  ))
                : null}
              {movieData.length > 0
                ? movieData.map((movie, index) => (
                    <section key={movie.title}>
                      <div>
                        <MovieHeading
                          movie={movie}
                          index={index}
                          singleMovieSearch={onSingleMovieSearch}
                        />
                      </div>

                      <div>
                        {movie.results.map((film) => (
                          <SingleMovie
                            movie={film}
                            key={film.id}
                            index={index}
                            initialTitle={movie.title}
                            removeFromList={handleRemoveFromList}
                            movies={movie}
                          />
                        ))}
                      </div>
                    </section>
                  ))
                : null}
            </div>
          </div>
          {!previewClicked ? (
            <button className="btn__primary" onClick={onFilmsPreview}>
              Preview All Films
            </button>
          ) : null}
          {previewClicked && user ? (
            <button className="btn__primary" onClick={saveList}>
              Save to watchlist
            </button>
          ) : null}
        </div>
      ) : null}
    </React.Fragment>
  );
};

export default Home;
