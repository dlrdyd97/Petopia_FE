import React, { useState, useEffect, Fragment } from "react";
import styled from "styled-components";
import { FaUser } from "react-icons/fa";
import { BsEye, BsHandThumbsUp, BsPerson } from "react-icons/bs";

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

    vertical-align: middle;
  }
`;

const BoardCard = styled.div`
  display: flex;
  flex-direction: row;
  border: 1px solid #c9c1c1;
  border-radius: 10px;
  padding: 8px;
  margin: 5px 0;
  width: 100%;
  height: auto;
`;

const Thumbnail = styled.img`
  width: 120px;
  height: 85px;
  margin-right: 10px;
  flex-shrink: 0;
  margin-bottom: 0;
  object-fit: cover;
  border-radius: 2px;
`;

const ContentContainer = styled.div`
  width: 100%;
  text-align: left;
`;

const CardTitle = styled.div`
  margin: 0;
  font-size: 14px;
`;

const CardComments = styled.div`
  margin-left: 4px;
  font-size: 14px;
  color: #999;
  line-height: 21px;
`;

const CardInfoContainer = styled.div`
  margin-top: 3px;
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

const CardInfoUser = styled.p`
  font-size: 14px;
  margin: 0;
`;

const CardDate = styled.p`
  margin-top: 10px;
  text-align: right;
  font-size: 12px;
  margin: 0 10px;
`;

const CardUser = styled.div`
  font-size: 12px;
  margin-right: 10px;
  margin-bottom: 10px;
`;

const RecommendCard = (props) => {
  useEffect(() => {}, []);

  return (
    <BoardBox>
      <BoardCard>
        <Thumbnail
          src={props.picture !== undefined ? props.picture : null}
          alt={props.title}
        />
        <ContentContainer>
          <div className="cardti">
            <CardTitle>{props.title}</CardTitle>
            <CardComments>({props.like})</CardComments>
          </div>
          <CardInfoContainer>
            <CardInfoUser>
              {/* <FaUser className="user-info-icon" /> */}
              {props.writerimg !== null &&
              props.writerimg !== undefined &&
              props.writerimg !== "" ? (
                <>
                  <img
                    src={
                      props.writerimg.includes("ssl.pstatic.net")
                        ? props.writerimg
                        : props.writerimg.includes("http://k.kakaocdn")
                        ? props.writerimg
                        : process.env.PUBLIC_URL +
                          "/uploadimgs/" +
                          props.writerimg
                    }
                    alt=""
                    className="detailProfileImg"
                  />
                </>
              ) : (
                <>
                  <BsPerson className="recommendIcon recommendMainWriterIcon" />
                  {/* &nbsp; */}
                </>
              )}
              {props.writer !== null &&
              props.writer !== undefined &&
              props.writer !== "" ? (
                <> {props.writer}</>
              ) : (
                <></>
              )}
            </CardInfoUser>

            <CardInfo>조회수 {props.view}</CardInfo>
            <CardInfo>추천수 {props.recommends}</CardInfo>
          </CardInfoContainer>
          <CardDate>
            <span style={{ whiteSpace: "pre" }}>
              {props.createdat !== undefined
                ? props.createdat.substring(5, 16).replace("T", "\u00A0\u00A0")
                : null}
            </span>
          </CardDate>
        </ContentContainer>
      </BoardCard>
    </BoardBox>
  );
};

export default RecommendCard;
