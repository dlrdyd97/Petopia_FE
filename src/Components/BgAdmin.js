import React from "react";
import "../Styles/BgAdmin.css";

const BgAdmin = () => {
  return (
    <section className="admin-full-bg">
      <section className="main-bg">
        {/*배경 요소 디자인 */}
        <div className="admin-bg-left">
          <div className="logo">
            <img src="../../img/logo.png" alt="Petoia logo" />
          </div>
          <div className="main-left">
            <div className="mainContent">
              <h1>
                반려 동물과
                <br />
                함께하는
                <br />
                일상 여행
              </h1>
            </div>
            <div className="mainImg">
              <img src="../../img/dog_main.png" alt="dog" />
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default BgAdmin;
