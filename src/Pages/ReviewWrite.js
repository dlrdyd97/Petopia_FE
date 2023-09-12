import React from "react";
import Header from "../Components/Header.js";
import Footer from "../Components/Footer.js";
import BgLeft from "../Components/BgLeft.js";
import ReviewWriteComponent from "../Components/ReviewWriteComponent";

const ReviewWrite = () => {
  return (
    <>
      <BgLeft />

      <main className="RouteTripSection">
        <Header />
        <section>
          <ReviewWriteComponent />
        </section>
        <Footer />
      </main>
    </>
  );
};

export default ReviewWrite;
