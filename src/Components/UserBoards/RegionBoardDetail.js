import "bootstrap/dist/css/bootstrap.css";

import "../../Styles/RecomendStyle.css";
import "../Styles/RecomendStyle.css";
import React, { useState } from "react";
import BoardDetail from "../BoardDetail";

const RegionBoardDetail = () => {
  return (
    <>
      <div className="RegionBoardDetailBody">
        <BoardDetail />
      </div>
    </>
  );
};

export default RegionBoardDetail;
