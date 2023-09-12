import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Components/Header.js";
import Footer from "../Components/Footer.js";
import BgLeft from "../Components/BgLeft.js";
import MyReviewDetail from "../Components/MyPage/MyReviewDetail";
import RatingSection from "../Components/RatingSection";
import "../Styles/MyReview.css";
import Button from "react-bootstrap/Button";
import styled from "styled-components";
import { AiFillStar } from "react-icons/ai";

const RatingStar = styled(AiFillStar)`
  color: #ffb950;
`;

const ReviewPage = ({ setMyPageReviewAction, reviewdata }) => {
  const [reviews] = useState([
    {
      ratingIndex: 4,
      compareOption: "저렴해요",
      shopType: "카페",
      totalCost: " 15000원",
      reviewContent:
        "이 카페는 분위기도 좋고 커피도 맛있어요. 가격도 적당해서 자주 가는 곳이에요.",
    },
  ]);

  const navigate = useNavigate();

  return (
    <>
      {/* <BgLeft />
      <main>
        <Header /> */}

      <section className="myReviewDetailPage_wrapper">
        <div className="myReviewDetail">
          {/* <h2 className="myReviewTitle">내 리뷰 보기</h2>
          <hr className="hr-line" /> */}
          {reviews.map((review) => (
            <div key={review.ratingIndex}>
              <div className="starDiv">
                {[...Array(review.ratingIndex)].map((_, index) => (
                  <RatingStar size={30} key={index} />
                ))}
              </div>
              <MyReviewDetail
                rating={review.ratingIndex}
                compareOption={review.compareOption}
                shopType={review.shopType}
                totalCost={review.totalCost}
                reviewContent={review.reviewContent}
                reviewdata={reviewdata}
              />
            </div>
          ))}
        </div>
        <hr className="hr-line" />
        <div className="myReviewBtns">
          <Button
            className="btn btn-sm btn-outline-primary submit reviewWriteSubmit"
            onClick={() => {
              navigate("/myreview");
            }}
          >
            글목록
          </Button>
          <Button
            className="btn btn-sm btn-default submit reviewWriteSubmit"
            onClick={() => {
              // navigate("/reviewwrite");
              setMyPageReviewAction(2);
            }}
          >
            수정
          </Button>
          <Button
            className="btn btn-sm btn-danger reviewWriteSubmit"
            onClick={() => {
              navigate("/myreview");
            }}
          >
            삭제
          </Button>
        </div>
      </section>
      {/* <Footer />
      </main> */}
    </>
  );
};

export default ReviewPage;
