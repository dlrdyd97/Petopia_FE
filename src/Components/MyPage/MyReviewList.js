import styled from "styled-components";
import React, { useState, useEffect, Fragment } from "react";
import { NavLink } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { FaAngleLeft } from "react-icons/fa";
import ReviewWriteComponent from "../ReviewWriteComponent";
import axios from "axios";
import MyReviewDetail from "./MyReviewDetail";

const ReviewContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  margin-top: -15px;
  padding: 14px;
`;

const ReviewListWrap = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ReviewTableHeader = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  border-bottom: 2px solid #333;
  font-size: 18px;
  color: #333;
  font-weight: bold;
`;

const ReviewTableContent = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  border-bottom: 1px solid #ddd;
  font-size: 14px;
  cursor: pointer;
`;

const ReviewContent = styled.td`
  word-break: break-all;
  min-width: 150px;
  max-width: 155px;
  margin-left: 50px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

const ReviewDate = styled.td`
  margin-right: -10px;
`;

const ReviewCheckbox = styled.input`
  margin-right: 16px;
`;

const ReviewButtonsWrap = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-top: 20px;
`;

const ReviewList = ({ setMyPageAction, reviewCount }) => {
  const [checkedReviews, setCheckedReviews] = useState([]);

  const handleCheckAll = (e) => {
    if (e.target.checked) {
      const allReviewsIds = reviewdatalist.map((review) => review.id);
      setCheckedReviews(allReviewsIds);
    } else {
      setCheckedReviews([]);
    }
  };

  const handleCheck = (review) => {
    if (checkedReviews.includes(review.id)) {
      setCheckedReviews(checkedReviews.filter((r) => r !== review.id));
    } else {
      setCheckedReviews([...checkedReviews, review.id]);
    }
  };

  const handleDelete = (reviewIds) => {
    axios
      .post("/myreviewdelete", reviewIds)
      .then((res) => {
        myReviewList();
        reviewCount();
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const [myPageReviewAction, setMyPageReviewAction] = useState(0); // 마이 리뷰 액션
  // [액션 0 : 리뷰 리스트] [액션 1 : 리뷰 상세] , [액션 2 : 리뷰 수정]
  const [reviewdatalist, setReviewdatalist] = useState([]);
  const [reviewdata, setReviewdata] = useState([]);

  useEffect(() => {
    myReviewList();
  }, []);

  const myReviewList = () => {
    axios
      .get("/myreviewlist", {
        params: {
          // session의 key(email)값의 value를 가져옴
          writer: sessionStorage.getItem("email"),
        },
      })
      .then((res) => {
        const { data } = res;
        setReviewdatalist(data);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  return (
    <>
      {myPageReviewAction === 0 ? (
        <>
          <div className="inquiryHeader">
            <div
              className="inquiryBack-left"
              onClick={() => {
                setMyPageAction(0);
              }}
            >
              <FaAngleLeft className="inquiryBack-icon" />
            </div>
            <h4>내 리뷰 관리</h4>
          </div>
          {sessionStorage.getItem("email") != null ? (
            reviewdatalist.length !== 0 ? (
              <ReviewContainer>
                {/* <ReviewListHeader>내 리뷰 관리</ReviewListHeader> */}
                <ReviewListWrap>
                  <ReviewTableHeader>
                    <ReviewCheckbox
                      type="checkbox"
                      onChange={handleCheckAll}
                      checked={checkedReviews.length === reviewdatalist.length}
                    />
                    <div className="myreviewcontentbox">업체명</div>
                    <div className="myreviewdatebox">날짜</div>
                  </ReviewTableHeader>

                  {reviewdatalist.map((review) => (
                    <ReviewTableContent key={review.id}>
                      <ReviewCheckbox
                        type="checkbox"
                        checked={checkedReviews.includes(review.id)}
                        onChange={() => handleCheck(review)}
                      />
                      <ReviewContent
                        style={{}}
                        onClick={() => {
                          setReviewdata(review);
                          setMyPageReviewAction(1); // [액션 1 : 리뷰 상세]
                        }}
                      >
                        {review.location.facility_name}
                      </ReviewContent>
                      <ReviewDate>
                        {/* {new Date(review.updatedAt).toISOString().split("T")[0]} */}
                        {review.updatedAt.substring(0, 10).replace("T", " ")}
                      </ReviewDate>
                    </ReviewTableContent>
                  ))}
                </ReviewListWrap>
                <ReviewButtonsWrap>
                  <Button
                    className="mt-2 float-right"
                    variant="primary"
                    size="sm"
                    onClick={() => handleDelete(checkedReviews)}
                  >
                    삭제
                  </Button>
                </ReviewButtonsWrap>
              </ReviewContainer>
            ) : (
              <div className="inquiryNone">작성된 리뷰가 없습니다.</div>
            )
          ) : (
            <>
              <div className="inquiryNone">로그인을 해주세요.</div>
              <NavLink to="/login" style={{ textDecoration: "none" }}>
                <div className="inquiryBox">
                  <button className="inquiryBtn">로그인</button>
                </div>
              </NavLink>
            </>
          )}
        </>
      ) : myPageReviewAction === 1 ? ( // [액션 1 : 리뷰 상세]
        <>
          <div className="inquiryHeader">
            <div
              className="inquiryBack-left"
              onClick={() => {
                setMyPageReviewAction(0);
              }}
            >
              <FaAngleLeft className="inquiryBack-icon" />
            </div>
            <h4>내 리뷰 관리</h4>
          </div>
          {/* <MyReviewDetailPage /> */}
          <MyReviewDetail
            setMyPageReviewAction={setMyPageReviewAction}
            reviewdata={reviewdata}
            handleDelete={handleDelete}
          />
        </>
      ) : (
        // [액션 2 : 리뷰 수정]
        <>
          <div className="inquiryHeader">
            <div
              className="inquiryBack-left"
              onClick={() => {
                setMyPageReviewAction(0);
              }}
            >
              <FaAngleLeft className="inquiryBack-icon" />
            </div>
            <h4>리뷰 수정</h4>
          </div>
          <ReviewWriteComponent setMyPageReviewAction={setMyPageReviewAction} />
        </>
      )}
    </>
  );
};

export default ReviewList;
