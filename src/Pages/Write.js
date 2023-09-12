import React from "react";
import Header from "../Components/Header.js";
import Footer from "../Components/Footer.js";
import BgLeft from "../Components/BgLeft.js";
import BoardWrite from "../Components/BoardWrite.js";

const Login = () => {
  return (
    <>
      <BgLeft />

      <main className="RouteTripSection">
        <Header />
        <section>
          <BoardWrite />
        </section>
        <Footer />
      </main>
    </>
  );
};

export default Login;
