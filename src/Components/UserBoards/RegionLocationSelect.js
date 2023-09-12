import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../Styles/UserRegion.css";

const RegionLocationSelect = () => {
  const moveRegion = useNavigate();
  const [regionClick, setRegionClick] = useState(null);
  //const [prevClick, setPrevClick] = useState();

  const GetClick = (e) => {
    setRegionClick(e.currentTarget.id);
    // console.log(e.currentTarget);
    // useNavigate로 지역명(id)를 UserRegionBoard.js 컴포넌트로 넘김 {title}
    moveRegion("/userregionboard", { state: { title: e.currentTarget.id } });
  };

  return (
    <>
      <div className="wrapper">
        <div className="local_title">지역별 모임 게시판</div>

        <div className="wrapper1">
          <div className="content" id="서울" onClick={(e) => GetClick(e)}>
            <div className="locationTag">서울</div>
            <div className="content_title">서울 지역 모임 게시판 입니다.</div>
          </div>

          <div className="content" id="경기 북부" onClick={(e) => GetClick(e)}>
            <div className="locationTag">경기(북부)</div>
            <div className="content_title">
              경기 북부지역 모임 게시판 입니다.
            </div>
          </div>

          <div className="content" id="경기 남부" onClick={(e) => GetClick(e)}>
            <div className="locationTag">경기(남부)</div>
            <div className="content_title">
              경기 남부지역 모임 게시판 입니다.
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegionLocationSelect;
