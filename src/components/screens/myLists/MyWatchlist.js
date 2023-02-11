import React from "react";
//import classes from "./myLists.module.css";
import { useSelector } from "react-redux";
import MovieExcerpt from "./MovieExcerpt";

const MyWatchlist = () => {
  // const { user } = useSelector((state) => state.auth);
  const { list } = useSelector((state) => state.list);
  const watchlist = list.length > 0 ? list[0].watchlist : [];
  console.log(watchlist);

  return (
    <div>
      <h1>My lists</h1>
      {watchlist.length > 0 ? (
        watchlist.map((film) => {
          return <MovieExcerpt key={film.id} film={film} />;
        })
      ) : (
        <h2>You do not have a created list</h2>
      )}
    </div>
  );
};

export default MyWatchlist;
