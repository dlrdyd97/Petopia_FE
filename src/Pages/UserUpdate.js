import React from "react";
import Header from "../Components/Header.js";
import Footer from "../Components/Footer.js";
import BgLeft from "../Components/BgLeft.js";
import UserUpdateComponent from "../Components/UserUpdateComponent.js";

const UserUpdate = () => {
  return (
    <>
      <BgLeft />

      <main className="RouteTripSection">
        <Header />
        <section>
          <UserUpdateComponent />
        </section>
        <Footer />
      </main>
    </>
  );
};

export default UserUpdate;
