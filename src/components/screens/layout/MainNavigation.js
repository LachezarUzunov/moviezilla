import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout, reset } from "../../features/auth/authSlice";
import classes from "./MainNavigation.module.css";

import { ImMenu } from "react-icons/im";
import { FaWindowClose } from "react-icons/fa";

const MainNavigation = () => {
  const [openMobile, setOpenMobile] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

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
        {user ? (
          <React.Fragment>
            <li>
              <Link className={classes.link} to="/my-watchlist">
                My Watchlist
              </Link>
            </li>
            <li>
              <Link onClick={onLogout} className={classes.link}>
                Logout
              </Link>
            </li>
          </React.Fragment>
        ) : (
          <React.Fragment>
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
          </React.Fragment>
        )}
      </ul>
    </nav>
  );
};

export default MainNavigation;
