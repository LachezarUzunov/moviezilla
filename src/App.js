import React, { useEffect, useState } from "react";
import SingleTitle from "./components/SingleTitle";
import classes from "./App.module.css";

function App() {
  const [textFile, setTextFile] = useState("");
  const [movieTitles, setMovieTitles] = useState([]);
  const [movieData, setMovieData] = useState([]);

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
    movieTitles.forEach(async (movie) => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/multi?api_key=cd725d1c5efc50ead2110487dcd7be9e&language=en-US&page=1&include_adult=false&query=${movie}`
        );

        if (response.status === 200) {
          const filmData = await response.json();
          console.log(filmData.results);
          let film = {
            [movie]: filmData.results,
          };
          setMovieData((prevState) => [...prevState, film]);
        }
      } catch (error) {
        console.log(error);
      }
    });
  };
  console.log(movieData);
  return (
    <React.Fragment>
      <div>
        <h1> Upload your file here</h1>
        <input type="file" onChange={handleFileUpload}></input>
      </div>
      <div className={classes.movieList}>
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
        </div>
        <button onClick={onFilmsPreview}>Preview All Films</button>
      </div>
    </React.Fragment>
  );
}

export default App;
