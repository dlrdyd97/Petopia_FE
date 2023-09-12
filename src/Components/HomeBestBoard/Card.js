import React, { useState, useEffect, Fragment } from "react";
import styled from "styled-components";
import { FaUser } from "react-icons/fa";

const BoardBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 500px;

  a {
    display: block;
    color: inherit;
    text-decoration: none;
    box-sizing: border-box;
    width: 100%;
  }
  .cardti {
    display: flex;
    align-items: center;
    justify-content: center; // 중앙 정렬
    margin-bottom: -3px; // 간격 조정
  }
`;

const BoardCard = styled.div`
  display: flex;
  flex-direction: row;
  border: 1px solid #c9c1c1;
  border-radius: 10px;
  padding: 10px;
  margin: 5px 0;
  width: 100%;
  height: auto;
`;

const Thumbnail = styled.img`
  width: 120px;
  height: 85px;
  flex-shrink: 0;
  margin-bottom: 0;
  border-radius: 10px;
`;

const ContentContainer = styled.div`
  width: 100%;
`;

const CardTitle = styled.div`
  margin: 3px;
  text-align: center;
`;

const CardComments = styled.div`
  margin-left: 4px;
  font-size: 14px;
  color: #999;
  line-height: 21px;
`;

const CardInfoContainer = styled.div`
  margin-top: 3px;
  display: flex;
  justify-content: center;
`;

const CardInfo = styled.p`
  font-size: 12px;
  display: flex;
  margin: 0;
  &:not(:first-child) {
    display:inline-block;
    vertical-align:top; 
  &:last-child:before {
     display:inline-block;
     width: 1px;
     height: 11px;
     margin:0 6px;
     background: black;
     vertical-align: -1px;
    content:'';
  }
`;

const CardDate = styled.p`
  margin-top: 10px;
  text-align: right;
  font-size: 12px;
  margin: 0px;
`;

const CardUser = styled.div`
  text-align: right;
  font-size: 12px;
  margin-right: 10px;
  margin-bottom: 10px;
  
`;

const Card = ({
  id,
  title,
  content,
  date,
  author,
  views,
  comments,
  thumbnailUrl,
  recommends,
}) => {
  return (
    <BoardBox>
      <BoardCard>
        <Thumbnail src={thumbnailUrl} alt={title} />
        <ContentContainer>
          <div className="cardti">
            <CardTitle>{title}</CardTitle>
            <CardComments>({comments})</CardComments>
          </div>
          <CardInfoContainer>
            <CardUser>
              <FaUser className="user-info-icon" />
              &nbsp;
              {author}
            </CardUser>
            <CardDate>{date}</CardDate>
          </CardInfoContainer>
          <CardInfo>조회수 {views}</CardInfo>
          <CardInfo>추천수 {recommends}</CardInfo>
        </ContentContainer>
      </BoardCard>
    </BoardBox>
  );
};

export default Card;
