import React from "react";
import Header from "../Components/Header.js";
import Footer from "../Components/Footer.js";
import BgLeft from "../Components/BgLeft.js";
import NoticeBoard from "../Components/NoticeBoard.js";

const Notice = () => {
  return (
    <>
      <BgLeft />
      <main>
        <Header />
        <section className="wrap">
          <NoticeBoard />
        </section>
        <Footer />
      </main>
    </>
  );
};

export default Notice;
