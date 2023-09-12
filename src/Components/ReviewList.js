import styled from "styled-components";
import React, { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

const ReviewContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 32px;
`;

const ReviewListHeader = styled.h2`
  font-size: 25px;
  font-weight: bold;
  margin-bottom: 20px;
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
`;

const ReviewContent = styled.td`
  word-break: break-all;
`;

const ReviewDate = styled.td``;

const ReviewCheckbox = styled.input`
  margin-right: 16px;
`;

const ReviewButtonsWrap = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-top: 20px;
`;

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

const ReviewList = () => {
  const [checkedReviews, setCheckedReviews] = useState([]);

  const handleCheckAll = (e) => {
    if (e.target.checked) {
      const allReviewsIds = reviews.map((review) => review.id);
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
    const remainingReviews = reviews.filter(
      (review) => !reviewIds.includes(review.id)
    );
    setCheckedReviews([]);
    setReviews(remainingReviews);
  };

  const [reviews, setReviews] = useState([
    {
      id: 1,
      date: "2022.05.01",
      content: "이 제품 정말 좋네요",
    },
    {
      id: 2,
      date: "2022.04.28",
      content: "배송도 빠르고 좋습니다",
    },
    {
      id: 3,
      date: "2022.04.25",
      content: "이 가게 추천합니다",
    },
  ]);

  return (
    <ReviewContainer>
      <ReviewListHeader>리뷰 관리</ReviewListHeader>
      <ReviewListWrap>
        <ReviewTableHeader>
          <ReviewCheckbox
            type="checkbox"
            onChange={handleCheckAll}
            checked={checkedReviews.length === reviews.length}
          />
          <div>내용</div>
          <div>날짜</div>
        </ReviewTableHeader>
        {reviews.map((review) => (
          <ReviewTableContent key={review.id}>
            <ReviewCheckbox
              type="checkbox"
              checked={checkedReviews.includes(review.id)}
              onChange={() => handleCheck(review)}
            />
            <ReviewContent>{review.content}</ReviewContent>
            <ReviewDate>{review.date}</ReviewDate>
          </ReviewTableContent>
        ))}
      </ReviewListWrap>
      <ReviewButtonsWrap>
        <Button
          className="mt-2"
          variant="primary"
          size="sm"
          onClick={() => handleDelete(checkedReviews)}
        >
          삭제
        </Button>
        <Link to="/">
          <Button
            className="mt-2 border-primary"
            variant="btn-outline-primary"
            size="sm"
          >
            수정
          </Button>
        </Link>
      </ReviewButtonsWrap>
    </ReviewContainer>
  );
};

export default ReviewList;
