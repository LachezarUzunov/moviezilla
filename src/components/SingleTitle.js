import React from "react";
import classes from "./SingleTitle.module.css";
import { FaTrash } from "react-icons/fa";

const SingleTitle = ({ title, removeFromList, index }) => {
  const onDelete = () => {
    removeFromList(title);
  };

  return (
    <React.Fragment>
      <div className={classes.titleDiv}>
        <p>
          {index + 1}. {title}
        </p>
        <i className={classes.button}>
          <FaTrash className="iconBtns" onClick={onDelete} />
        </i>
      </div>
    </React.Fragment>
  );
};

export default SingleTitle;
