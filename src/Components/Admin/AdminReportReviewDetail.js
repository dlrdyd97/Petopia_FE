import React, { useEffect, useState } from "react";
import StarRating1 from "../StarRating1.js";
import axios from "axios";
import styled from "styled-components";
import Button from "react-bootstrap/Button";
import MyReviewSlider from "../MyPage/MyReviewSlider";

const ReviewButtonsWrap = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-top: 10px;
`;

const AdminReportReviewDetail = ({
  setMyPageReviewAction,
  reviewdata,
  handleDelete,
}) => {
  const [reviewImgList, setReviewImgList] = useState([]);
  const [reviewId, setReviewId] = useState([]);

  const reviewImg = () => {
    axios
      .get("/mapImgList", {
        params: { id: reviewdata.location.id },
      })
      .then((res) => {
        const { data } = res;
        setReviewImgList(data);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  useEffect(() => {
    setReviewId([reviewdata.id]);
    reviewImg();
  }, []);

  return (
    <>
      <div className="myReviewListMain">
        <div className="reviewListMainHeader">
          <span className="reviewListName">
            {/* {new Date(reviewdata.updatedAt).toISOString().split("T")[0]} */}
            {reviewdata.updatedAt.substring(0, 10).replace("T", " ")}
          </span>
          <span className="report-review-name">
            작성자 : {reviewdata.writer.email}
          </span>
        </div>
        <div className="reviewListStar">
          <StarRating1 className="test13" score={reviewdata.rating} index={0} />
          <span className="reviewListScore1">{reviewdata.rating}.0</span>
        </div>
        {reviewdata.location.category3 === "동물병원" ? (
          <div className="reviewListCost">
            <div className="reviewListCost2">
              <span className="reviewListMedical">
                진료비
                <br />
                {reviewdata.medicalCost
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                원
              </span>
            </div>
            <div className="reviewListCost2">
              <span className="reviewListMedical">
                수술비
                <br />
                {reviewdata.surgeryCost
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                원
              </span>
            </div>
            <div className="reviewListCost2">
              <span className="reviewListMedical">
                총 비용
                <br />
                {reviewdata.cost
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                원
              </span>
            </div>
          </div>
        ) : (
          <div className="reviewListCost3">
            <span className="reviewListMedical">
              총 비용 :&nbsp;
              {reviewdata.cost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              원
            </span>
          </div>
        )}
        <div>
          <div className="reviewListImgBox">
            {reviewImgList.filter((item) => item.review.id === reviewdata.id)
              .length !== 0 ? (
              reviewImgList.filter((item) => item.review.id === reviewdata.id)
                .length === 1 ? (
                <>
                  <div className="reviewListImg1">
                    <img
                      className="reviewListImg2"
                      src={
                        process.env.PUBLIC_URL +
                        "/uploadimgs/" +
                        reviewImgList.filter(
                          (item) => item.review.id === reviewdata.id
                        )[0].imageUrl
                      }
                      alt="이미지"
                      style={{ objectFit: "contain" }}
                    />
                  </div>
                </>
              ) : (
                <>
                  <MyReviewSlider
                    reviewImgList={reviewImgList.filter(
                      (item) => item.review.id === reviewdata.id
                    )}
                  />
                </>
              )
            ) : null}
          </div>
          <div className="reviewListContentBox">
            <span className="reviewListContent">{reviewdata.content}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminReportReviewDetail;
