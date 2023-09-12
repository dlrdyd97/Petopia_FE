import React from "react";
import Header from "../Components/Header.js";
import Footer from "../Components/Footer.js";
import BgLeft from "../Components/BgLeft.js";
import FindPassword from "../Components/FindPassword";

const FindAccountPassword = () => {
  return (
    <>
      <BgLeft />

      <main className="RouteTripSection">
        <Header />
        <section>
          <FindPassword />
        </section>
        <Footer />
      </main>
    </>
  );
};

export default FindAccountPassword;
