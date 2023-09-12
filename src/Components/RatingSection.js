import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { AiFillStar } from "react-icons/ai";
import "../Styles/Review.css";

const RatingContainer = styled.div`
  display: flex;
  text-align: center;
  margin: 13px 0px;
  .inactive {
    color: #c1c1c1;
  }
  .active {
    color: #ffb950;
  }
`;

const RatingStar = styled(AiFillStar)`
  cursor: pointer;
`;

const PIndex = styled.p`
  margin: 0 5px;
`;

const RatingSection = ({ ratingIndex, setRatingIndex }) => {
  const ArrayIndexes = [1, 2, 3, 4, 5];

  useEffect(() => {
    setRatingIndex(ratingIndex); // ratingIndex 값이 변경될 때마다 setRatingIndex 호출
  }, [ratingIndex, setRatingIndex]);

  return (
    <RatingContainer className="raitingContainer">
      <div className="starDiv">
        {ArrayIndexes.map((arrayindex, index) => (
          <RatingStar
            size={35}
            key={`rating_${index}`}
            className={arrayindex <= ratingIndex ? "active" : "inactive"}
            onClick={() => {
              setRatingIndex(arrayindex);
              // console.log(
              //   "arrayindex : " +
              //     arrayindex +
              //     "\n" +
              //     "ratingIndex : " +
              //     ratingIndex
              // );
              setRatingIndex(arrayindex); // 부모 컴포넌트에도 ratingIndex 값 전달
            }}
          />
        ))}
      </div>

      <div className="ratingIndexText">
        <PIndex>
          {ratingIndex === 5
            ? "아주 좋아요"
            : ratingIndex === 4
            ? "맘에 들어요"
            : ratingIndex === 3
            ? "보통이에요"
            : ratingIndex === 2
            ? "그냥 그래요"
            : ratingIndex === 1
            ? "별로에요"
            : "　"}
        </PIndex>
      </div>
    </RatingContainer>
  );
};

export default RatingSection;
