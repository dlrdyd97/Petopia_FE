import React from "react";
import Header from "../Components/Header.js";
import Footer from "../Components/Footer.js";
import BgLeft from "../Components/BgLeft.js";
import BoardDetail from "../Components/BoardDetail.js";

const RouteTrip = () => {
  return (
    <>
      <BgLeft />

      <main className="RouteTripSection">
        <Header />
        <section>
          <BoardDetail />
        </section>
        <Footer />
      </main>
    </>
  );
};

export default RouteTrip;
