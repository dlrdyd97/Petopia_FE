import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Header from "../Components/Header.js";
import Footer from "../Components/Footer.js";
import BgLeft from "../Components/BgLeft.js";
import LikeList from "../Components/UserBoardsLike/LikeList.js";

import "../Styles/UserWatchlist.css";

const UserWatchlist = () => {
  return (
    <>
      <BgLeft />
      <main>
        <Header />
        <section>
          <div className="userlist-title">
            <h3>관심목록</h3>
          </div>
          <LikeList />
        </section>
        <Footer />
      </main>
    </>
  );
};

export default UserWatchlist;
