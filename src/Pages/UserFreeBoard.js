import React from "react";
import Header from "../Components/Header.js";
import Footer from "../Components/Footer.js";
import BgLeft from "../Components/BgLeft.js";
import FreeBoardList from "../Components/UserBoards/FreeBoardList";
import "../Styles/UserFreeBoard.css";
import Button from "react-bootstrap/Button";

const UserFreeBoard = () => {
  const toWrite = () => {
    window.location.href = "/Write";
  };
  return (
    <>
      <BgLeft />

      <main className="UserFreeBoardSection">
        <Header />
        <section>
          <div className="free_title">자유 게시판</div>
          <FreeBoardList />
          <div className="freeboardwrite_btn">
            <Button type="button" class="btn btn-primary" onClick={toWrite}>
              글쓰기
            </Button>
          </div>
        </section>
        <Footer />
      </main>
    </>
  );
};

export default UserFreeBoard;
