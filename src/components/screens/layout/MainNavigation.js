import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout, reset } from "../../features/auth/authSlice";
import classes from "./MainNavigation.module.css";

import { ImMenu } from "react-icons/im";
import { FaWindowClose } from "react-icons/fa";
import { BsFillArrowUpSquareFill } from "react-icons/bs";

const MainNavigation = () => {
  const [openMobile, setOpenMobile] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  return (
    <header className={classes.header} id="up">
      <div className={classes.mobile__section}>
        <div>
          {openMobile ? (
            <button
              className={classes.mobile__btn}
              onClick={() => setOpenMobile(false)}
            >
              <ImMenu />
            </button>
          ) : (
            <button
              className={classes.mobile__btn}
              onClick={() => setOpenMobile(true)}
            >
              <FaWindowClose />
            </button>
          )}
        </div>
      </div>

      <nav>
        <ul
          className={`${classes.lis} ${openMobile ? classes.display : null} `}
        >
          <li>
            <Link onClick={() => setOpenMobile(true)} to="/">
              Home
            </Link>
          </li>
          {user && (
            <li>
              <Link onClick={() => setOpenMobile(true)} to="/my-watchlist">
                My Watchlist
              </Link>
            </li>
          )}
          {/* <li>
          <Link to="/recepti">РЕЦЕПТИ</Link>
        </li> */}
          {!user && (
            <li>
              <Link onClick={() => setOpenMobile(true)} to="/login">
                Login
              </Link>
            </li>
          )}
          {!user && (
            <li>
              <Link onClick={() => setOpenMobile(true)} to="/register">
                Register
              </Link>
            </li>
          )}
          {user && (
            <li>
              <Link to="/" onClick={onLogout}>
                Logout
              </Link>
            </li>
          )}
        </ul>
      </nav>

      <a href="#up" className={classes.link__to_top_li}>
        <BsFillArrowUpSquareFill className={classes.link__to_top} />
      </a>
    </header>
  );
  // return (
  //   <nav>
  //     {!openMobile ? (
  //       <div className={classes.mob_menu_div}>
  //         <ImMenu
  //           onClick={() => setOpenMobile(true)}
  //           className={classes.mobile__menu}
  //         />
  //       </div>
  //     ) : (
  //       <div className={classes.mob_menu_div}>
  //         <FaWindowClose
  //           onClick={() => setOpenMobile(false)}
  //           className={classes.mobile__menu}
  //         />
  //       </div>
  //     )}
  //     <div className={classes.menu__div}>
  //       <ul className={`${classes.nav} ${openMobile ? "" : classes.display}`}>
  //         <li>
  //           <Link className={classes.link} to="/">
  //             Home
  //           </Link>
  //         </li>
  //         {user ? (
  //           <React.Fragment>
  //             <li>
  //               <Link className={classes.link} to="/my-watchlist">
  //                 My Watchlist
  //               </Link>
  //             </li>
  //             <li>
  //               <Link onClick={onLogout} className={classes.link}>
  //                 Logout
  //               </Link>
  //             </li>
  //           </React.Fragment>
  //         ) : (
  //           <React.Fragment>
  //             <li>
  //               <Link className={classes.link} to="/register">
  //                 Register
  //               </Link>
  //             </li>
  //             <li>
  //               <Link className={classes.link} to="/login">
  //                 Login
  //               </Link>
  //             </li>
  //           </React.Fragment>
  //         )}
  //       </ul>
  //     </div>
  //   </nav>
  // );
};

export default MainNavigation;
