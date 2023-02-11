import React from "react";
//import classes from "./myLists.module.css";
import { useSelector } from "react-redux";
import MovieExcerpt from "./MovieExcerpt";

const MyWatchlist = () => {
  // const { user } = useSelector((state) => state.auth);
  const { list } = useSelector((state) => state.list);
  console.log(list);
  const watchlist = list.newWatchlist.watchlist;
  console.log(watchlist);
  // const { list } = useSelector((state) => state.list);
  // const watchlist = list.newWatchlist.watchlist;
  return (
    <div>
      <h1>My lists</h1>

      {watchlist.map((film) => {
        return <MovieExcerpt key={film.id} film={film} />;
      })}
    </div>
  );
};

export default MyWatchlist;
