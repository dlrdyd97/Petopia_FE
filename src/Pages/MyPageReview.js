import React from "react";
import Header from "../Components/Header.js";
import Footer from "../Components/Footer.js";
import BgLeft from "../Components/BgLeft.js";
import ReviewList from "../Components/ReviewList.js";

const MyPageReview = () => {
  return (
    <>
      <BgLeft />
      <main>
        <Header />
        <section>
          <ReviewList />
        </section>
        <Footer />
      </main>
    </>
  );
};

export default MyPageReview;
