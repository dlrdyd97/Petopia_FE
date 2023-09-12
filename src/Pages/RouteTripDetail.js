import React from "react";
import Header from "../Components/Header.js";
import Footer from "../Components/Footer.js";
import BgLeft from "../Components/BgLeft.js";
import RecomendDetail from "../Components/RecomendComponent/Recomend_detail.js";

const RouteTrip = () => {
  return (
    <>
      <BgLeft />

      <main className="RouteTripSection">
        <Header />
        <section>
          <RecomendDetail />
          {/* <p>여행 추천 페이지입니다</p> */}
        </section>
        <Footer />
      </main>
    </>
  );
};

export default RouteTrip;
