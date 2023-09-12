import React from "react";
import Header from "../Components/Header.js";
import Footer from "../Components/Footer.js";
import BgLeft from "../Components/BgLeft.js";
import FindEmail from "../Components/FindEmail";

const FindAccountEmail = () => {
  return (
    <>
      <BgLeft />

      <main className="RouteTripSection">
        <Header />
        <section>
          <FindEmail />
        </section>
        <Footer />
      </main>
    </>
  );
};

export default FindAccountEmail;
