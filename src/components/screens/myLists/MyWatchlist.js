import React from "react";
import classes from "./MyWatchlist.module.css";
import { useSelector } from "react-redux";
import MovieExcerpt from "./MovieExcerpt";

const MyWatchlist = () => {
  // const { user } = useSelector((state) => state.auth);
  const { list } = useSelector((state) => state.list);
  const watchlist = list.length > 0 ? list[0].watchlist : [];
  console.log(watchlist);

  return (
    <div className="main">
      <section className={classes.excerpts}>
        {watchlist.length > 0 ? (
          watchlist.map((film) => {
            return <MovieExcerpt key={film.id} film={film} />;
          })
        ) : (
          <h2>You do not have a created list</h2>
        )}
      </section>
    </div>
  );
};

export default MyWatchlist;
