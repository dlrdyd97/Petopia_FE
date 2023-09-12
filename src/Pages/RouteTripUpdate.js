import React from "react";
import Header from "../Components/Header.js";
import Footer from "../Components/Footer.js";
import BgLeft from "../Components/BgLeft.js";
import RecommendUpdate from "../Components/RecomendComponent/Recommend_update.js";

const RouteTripUpdate = () => {
  return (
    <>
      <BgLeft />

      <main className="RouteTripSection">
        <Header />
        <section>
          <RecommendUpdate />
        </section>
        <Footer />
      </main>
    </>
  );
};

export default RouteTripUpdate;
