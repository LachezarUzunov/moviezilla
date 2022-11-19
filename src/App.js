import React, { useEffect, useState } from "react";
import classes from "./App.module.css";
import SingleTitle from "./components/SingleTitle";
import SingleMovie from "./components/SingleMovie";
import { FaEdit } from "react-icons/fa";

function App() {
  const [textFile, setTextFile] = useState("");
  const [movieTitles, setMovieTitles] = useState([]);
  const [movieData, setMovieData] = useState([]);
  const [previewClicked, setPreviewClicked] = useState(false);
  const [titleEditMode, setTitleEditMode] = useState(false);
  const [actors, setActors] = useState();

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => {
      setTextFile(reader.result);
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
    setMovieTitles(movieTitles.filter((movie) => movie !== title));
  };

  const onFilmsPreview = () => {
    setPreviewClicked(true);
    movieTitles.forEach(async (movie) => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/multi?api_key=cd725d1c5efc50ead2110487dcd7be9e&language=en-US&page=1&include_adult=false&query=${movie}`
        );

        if (response.status === 200) {
          const filmData = await response.json();
          let film = {
            movie: movie,
            filmData: filmData.results,
          };
          setMovieData((prevState) => [...prevState, film]);
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
  console.log(movieData);
  return (
    <React.Fragment>
      <div>
        <div className={classes.header}>
          <h1 className={classes.header__title}>THE MOVIEZILLA DATABASE</h1>
          <h3>Where movie fanatics reside!</h3>
        </div>
        <h4> Upload your file here</h4>
        <input type="file" onChange={handleFileUpload}></input>
      </div>
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
              ? movieData.map((movie) => (
                  <React.Fragment>
                    <div className={classes.movie__title} key={movie.movie}>
                      {!titleEditMode ? (
                        <div>
                          <h2>{movie.movie} </h2>
                          <i>
                            <FaEdit onClick={handleTitleEdit} />
                          </i>
                        </div>
                      ) : (
                        <React.Fragment>
                          <input placeholder={movie.movie}></input>
                          <button>Check again</button>
                        </React.Fragment>
                      )}
                    </div>
                    <h3>Results:</h3>

                    <div>
                      {movie.filmData.map((film) => (
                        <SingleMovie movie={film} />
                      ))}
                    </div>
                  </React.Fragment>
                ))
              : null}
          </div>
          <div></div>
        </div>
        {!previewClicked ? (
          <button onClick={onFilmsPreview}>Preview All Films</button>
        ) : null}
        {previewClicked ? <button>Save</button> : null}
      </div>
    </React.Fragment>
  );
}

export default App;
