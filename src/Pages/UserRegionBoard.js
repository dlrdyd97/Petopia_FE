import React from "react";
import { useLocation } from "react-router-dom";
import Header from "../Components/Header.js";
import Footer from "../Components/Footer.js";
import BgLeft from "../Components/BgLeft.js";
import "../Styles/UserRegion.css";
import RegionBoardList from "../Components/UserBoards/RegionBoardList.js";

const UserRegionBoard = () => {
  const location = useLocation();
  // RegionLocationSelect.js 컴포넌트로부터 title(지역명) 전달 받음
  // location.state 존재하면 location.state.title을 title 변수에 삽입, 아닐 경우 공백 삽입
  const title = location.state?.title || "";
  return (
    <>
      <BgLeft />

      <main className="UserBoardSection">
        <Header />
        <section>
          <div className="wrapper">
            <div className="local_title">{title}지역 게시판</div>
            <RegionBoardList />
          </div>
        </section>
        <Footer />
      </main>
    </>
  );
};

export default UserRegionBoard;
