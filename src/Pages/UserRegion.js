import React from "react";
import Header from "../Components/Header.js";
import Footer from "../Components/Footer.js";
import "../Styles/UserRegion.css";
import BgLeft from "../Components/BgLeft.js";
import RegionLocationSelect from "../Components/UserBoards/RegionLocationSelect.js";

const UserRegion = () => {
  return (
    <>
      <BgLeft />

      <main className="UserRegionSection">
        <Header />
        <section>
          <RegionLocationSelect />
        </section>
        <Footer />
      </main>
    </>
  );
};

export default UserRegion;
