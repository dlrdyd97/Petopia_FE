import React, { useEffect, useState } from "react";
import StarRating from "../StarRating.js";
import StarRating1 from "../StarRating1.js";
import { FaAngleLeft } from "react-icons/fa";
import "../../Styles/ReviewList.css";
import MapReviewSlider from "./MapReviewSlider.js";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import ReportModalCopy from "../../Modal/ReportModalCopy.js";

const MapReviewList = ({
  setReviewAction,
  placedata,
  reviewList,
  ratingScore,
  reviewImgList,
  setReviewListState,
  getPlaceReview,
  reviewListState,
}) => {
  const reviewDelete = (reviewIds) => {
    const delete1 = [reviewIds];

    axios
      .post("/myreviewdelete", delete1)
      .then((res) => {
        getPlaceReview();
      })
      .catch((e) => {
        console.error(e);
      });
  };

  useEffect(() => {
    getPlaceReview();
    setReviewListState(0);
  }, []);

  // ㅡㅡㅡ 모달창 카피본 ㅡㅡㅡ

  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  // ㅡㅡㅡ 모달창 카피본 ㅡㅡㅡ

  const [reviewid, setReviewid] = useState(0);

  return (
    <>
      <ReportModalCopy
        open={modalOpen}
        reviewid={reviewid}
        close={() => {
          closeModal();
        }}
        header="게시글 신고"
        // id={boardid}
      ></ReportModalCopy>
      <div className="reviewListTitle">
        <span>{placedata.facility_name}</span>
        <div
          className="reviewListBack"
          onClick={() => {
            setReviewAction(0);
          }}
        >
          <FaAngleLeft className="inquiryBack-icon" />
        </div>
        <div className="reviewListRating">
          <StarRating ratingScore={ratingScore} />
          <b className="reviewMainRatingScore">({ratingScore})</b>
        </div>
      </div>
      <hr style={{ height: "3px", backgroundColor: "lightgray" }} />
      <Form.Select
        className="reviewListSelectBox"
        aria-label="Default select example"
        size="sm"
        onChange={(e) => {
          setReviewListState(e.target.value);
        }}
      >
        <option value="0">최신순</option>
        <option value="1">오래된순</option>
        <option value="2">별점 높은 순</option>
        <option value="3">별점 낮은 순</option>
      </Form.Select>
      {/* 반복문 */}
      {reviewList.map((review, index) => (
        <React.Fragment>
          <div className="reviewListMain" key={index}>
            <div className="reviewListReport">
              {sessionStorage.getItem("email") !== null ? (
                <Button
                  className="btm-sm reportBtn"
                  variant="outline-danger"
                  style={{ padding: "4px 0px 3px 0px", fontSize: "10px" }}
                  onClick={() => {
                    setReviewid(review.id);
                    openModal();
                    console.log("콘솔값", review);
                  }}
                >
                  🚨신고
                </Button>
              ) : null}
            </div>
            {sessionStorage.getItem("email") === review.writer.email ||
            sessionStorage.getItem("email") === "admin@admin.com" ? (
              <div className="reviewListDelete">
                <Button
                  className="btm-sm reportBtn"
                  variant="outline-secondary"
                  style={{ padding: "4px 0px 3px 0px", fontSize: "10px" }}
                  onClick={() => {
                    if (window.confirm("삭제하시겠습니까?")) {
                      reviewDelete(review.id);
                    }
                  }}
                >
                  삭제
                </Button>
              </div>
            ) : null}
            <div className="reviewListMainHeader">
              <span className="reviewListName">
                {review.writer.nickname.length <= 2 ? (
                  <>
                    {review.writer.nickname.substr(
                      0,
                      review.writer.nickname.length - 1
                    ) + "*".repeat(1)}
                  </>
                ) : (
                  <>
                    {review.writer.nickname.substr(
                      0,
                      review.writer.nickname.length - 2
                    ) + "*".repeat(2)}
                  </>
                )}
                &nbsp;&nbsp;&nbsp;
                {/* {new Date(review.updatedAt).toISOString().split("T")[0]} */}
                {review.updatedAt.substring(0, 10).replace("T", " ")}
              </span>
            </div>
            <div className="reviewListStar">
              <StarRating1
                className="test13"
                score={review.rating}
                index={index}
              />
              <span className="reviewListScore">{review.rating}.0</span>
            </div>
            {review.location.category3 === "동물병원" ? (
              <div className="reviewListCost">
                <div className="reviewListCost2">
                  <span className="reviewListMedical">
                    진료비
                    <br />
                    {review.medicalCost
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    원
                  </span>
                </div>
                <div className="reviewListCost2">
                  <span className="reviewListMedical">
                    수술비
                    <br />
                    {review.surgeryCost
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    원
                  </span>
                </div>
                <div className="reviewListCost2">
                  <span className="reviewListMedical">
                    총 비용
                    <br />
                    {review.cost
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
                  {review.cost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  원
                </span>
              </div>
            )}
            <div>
              <div className="reviewListImgBox">
                {reviewImgList.filter((item) => item.review.id === review.id)
                  .length !== 0 ? (
                  reviewImgList.filter((item) => item.review.id === review.id)
                    .length === 1 ? (
                    <>
                      <div className="reviewListImg1">
                        <img
                          className="reviewListImg2"
                          src={
                            process.env.PUBLIC_URL +
                            "/uploadimgs/" +
                            reviewImgList.filter(
                              (item) => item.review.id === review.id
                            )[0].imageUrl
                          }
                          alt="이미지"
                          style={{ objectFit: "contain" }}
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <MapReviewSlider
                        review={review}
                        reviewImgList={reviewImgList}
                        reviewListState={reviewListState}
                      />
                    </>
                  )
                ) : null}
              </div>
              <div className="reviewListContentBox">
                <span className="reviewListContent">{review.content}</span>
                <br />
                <br />
                <span className="reviewListPrice">
                  가격 대비 : {review.priceLevel === "CHEAP" ? "저렴해요" : ""}
                  {review.priceLevel === "MODERATE" ? "보통이에요" : ""}
                  {review.priceLevel === "EXPENSIVE" ? "비싸요" : ""}
                </span>
              </div>
            </div>
          </div>
          <hr style={{ height: "3px", backgroundColor: "lightgray" }} />
        </React.Fragment>
      ))}
    </>
  );
};

export default MapReviewList;
