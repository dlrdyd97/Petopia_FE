import React from "react";
import Header from "../Components/Header.js";
import Footer from "../Components/Footer.js";
import BgLeft from "../Components/BgLeft.js";
import RecomendWrite from "../Components/RecomendComponent/Recomend_write.js";

const RouteTrip = () => {
  return (
    <>
      <BgLeft />

      <main className="RouteTripSection">
        <Header />
        <section>
          <RecomendWrite />
          {/* <p>여행 추천 작성 페이지입니다</p> */}
        </section>
        <Footer />
      </main>
    </>
  );
};

export default RouteTrip;
