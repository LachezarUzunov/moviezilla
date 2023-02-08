import React, { useState } from "react";
import classes from "./MainNavigation.module.css";
import { Link } from "react-router-dom";
import { ImMenu } from "react-icons/im";
import { FaWindowClose } from "react-icons/fa";

const MainNavigation = () => {
  const [openMobile, setOpenMobile] = useState(false);

  return (
    <nav>
      {!openMobile ? (
        <div className={classes.mob_menu_div}>
          <ImMenu
            onClick={() => setOpenMobile(true)}
            className={classes.mobile__menu}
          />
        </div>
      ) : (
        <div className={classes.mob_menu_div}>
          <FaWindowClose
            onClick={() => setOpenMobile(false)}
            className={classes.mobile__menu}
          />
        </div>
      )}

      <ul className={`${classes.nav} ${openMobile ? "" : classes.display}`}>
        <li>
          <Link className={classes.link} to="/">
            Home
          </Link>
        </li>
        <li>
          <Link className={classes.link} to="/register">
            Register
          </Link>
        </li>
        <li>
          <Link className={classes.link} to="/login">
            Login
          </Link>
        </li>
      </ul>

      {/* <ul className={classes.nav}>
        <li>
          <Link className={classes.link} to="/">
            Home
          </Link>
        </li>
        <li>
          <Link className={classes.link} to="/register">
            Register
          </Link>
        </li>
        <li>
          <Link className={classes.link} to="/login">
            Login
          </Link>
        </li>
      </ul> */}
    </nav>
  );
};

export default MainNavigation;
