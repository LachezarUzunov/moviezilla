import React from "react";
import { Route, Routes } from "react-router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./components/screens/home/Home";
import MainNavigation from "./components/screens/layout/MainNavigation";
import Register from "./components/screens/Register/Register";
import Login from "./components/screens/Login/Login";
import MyWatchlist from "./components/screens/myLists/MyWatchlist";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <React.Fragment>
      <main>
        <MainNavigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/my-watchlist" element={<PrivateRoute />}>
            <Route path="/my-watchlist" element={<MyWatchlist />} />
          </Route>
        </Routes>
      </main>
      <ToastContainer />
    </React.Fragment>
  );
}

export default App;
