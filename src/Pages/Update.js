import React from "react";
import Header from "../Components/Header.js";
import Footer from "../Components/Footer.js";
import BgLeft from "../Components/BgLeft.js";
import BoardUpdate from "../Components/BoardUpdate.js";

const Login = () => {
  return (
    <>
      <BgLeft />

      <main className="RouteTripSection">
        <Header />
        <section>
          <BoardUpdate />
        </section>
        <Footer />
      </main>
    </>
  );
};

export default Login;
