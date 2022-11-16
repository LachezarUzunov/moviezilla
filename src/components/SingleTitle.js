import React from "react";
import classes from './SingleTitle.module.css'

const SingleTitle = ({ titles }) => {
  return (
    <React.Fragment>
      {titles ? titles.map((t) => <div className={classes.titleDiv} key={t.substring(5, 5)}>{t}</div>) : null}
    </React.Fragment>
  );
};

export default SingleTitle;
