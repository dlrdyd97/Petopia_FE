import React from "react";
import Header from "../Components/Header.js";
import Footer from "../Components/Footer.js";
import BgLeft from "../Components/BgLeft.js";
import SignUpComponent from "../Components/SignUpComponent.js";

const Register = ({ user, setUser }) => {
  return (
    <>
      <BgLeft />

      <main className="RouteTripSection">
        <Header />
        <section>
          <SignUpComponent user={user} setUser={setUser} />
        </section>
        <Footer />
      </main>
    </>
  );
};

export default Register;
