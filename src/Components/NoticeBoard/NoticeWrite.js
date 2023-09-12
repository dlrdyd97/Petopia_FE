import React from "react";
import Header from "../Header.js";
import Footer from "../Footer.js";
import BgLeft from "../BgLeft.js";
import NoticeBoardWrite from "./NoticeBoardWrite.js";

const NoticeWrite = () => {
  return (
    <>
      <BgLeft />

      <main className="RouteTripSection">
        <Header />
        <section>
          <NoticeBoardWrite />
        </section>
        <Footer />
      </main>
    </>
  );
};

export default NoticeWrite;
