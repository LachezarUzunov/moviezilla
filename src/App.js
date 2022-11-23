import React, { useEffect, useState } from "react";
import classes from "./App.module.css";
import SingleTitle from "./components/SingleTitle";
import SingleMovie from "./components/SingleMovie/SingleMovie";
import { FaEdit } from "react-icons/fa";

function App() {
  const [textFile, setTextFile] = useState("");
  const [movieTitles, setMovieTitles] = useState([]);
  const [movieData, setMovieData] = useState([]);
  const [previewClicked, setPreviewClicked] = useState(false);
  const [titleEditMode, setTitleEditMode] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(false);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => {
      setTextFile(reader.result);
      setUploadedFile(true);
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

  const onFilmsPreview = () => {
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

  const handleTitleEdit = () => {
    setTitleEditMode(true);
  };

  const handleRemoveFromList = (
    movieId,
    movie,
    index,
    initialTitle,
    movies
  ) => {
    const updatedFilms = movies.results.filter((el) => el.id !== movieId);
    let newFilm = {
      title: initialTitle,
      results: updatedFilms,
    };

    movieData.splice(index, 1, newFilm);
    setMovieData([...movieData]);
  };

  console.log(movieData);

  return (
    <React.Fragment>
      <div>
        <div className={classes.header}>
          <h1 className={classes.header__title}>MOVIEZILLA</h1>
          <h3 className={classes.header__subtitle}>
            Where movie fanatics reside!
          </h3>
        </div>
        <div className={classes.upload}>
          <h4> Upload your file here</h4>
          <input type="file" onChange={handleFileUpload}></input>
        </div>
      </div>
      {uploadedFile ? (
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
                    <section key={movie.title.id}>
                      <div key={movie.title.id}>
                        {!titleEditMode ? (
                          <div
                            key={movie.title.id}
                            className={classes.movie__title}
                          >
                            <h2>{movie.title}</h2>
                            <i>
                              <FaEdit
                                className="iconBtn__second"
                                onClick={handleTitleEdit}
                              />
                            </i>
                          </div>
                        ) : (
                          <div key={movie.title.id}>
                            <input placeholder={movie.title}></input>
                            <button>Check again</button>
                          </div>
                        )}
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
            <button onClick={onFilmsPreview}>Preview All Films</button>
          ) : null}
          {previewClicked ? <button>Save</button> : null}
        </div>
      ) : null}
    </React.Fragment>
  );
}

export default App;
