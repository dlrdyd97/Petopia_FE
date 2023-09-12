import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const CardList = styled.div`
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

const LikeCard = styled.div`
  display: flex;
  flex-direction: row;
  border: 1px solid #c9c1c1;
  border-radius: 10px;
  padding: 10px;
  margin: 5px 0;
  width: 100%;
  height: 100%;
`;

const Thumbnail = styled.img`
  width: 130px;
  height: 85px;
  margin-right: 10px;
  flex-shrink: 0;
  margin-bottom: 0;
  border-radius: 10px;
`;

const ContentContainer = styled.div`
  width: 100%;
`;

const CardTitle = styled.div`
  margin: 0;
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

const CardDate = styled.p`
  margin-top: 10px;
  text-align: right;
  font-size: 12px;
  margin: 0 10px;
`;

const LikeCardList = ({ interestList }) => {
  return (
    <>
      {interestList.length !== 0 ? (
        <CardList>
          {interestList.map((community) => (
            <Link
              className="linkstyle"
              to={`/recomend_best?id=${community.id}`}
              state={{ boardid: community.id }}
              key={community.id}
            >
              <LikeCard>
                <Thumbnail
                  src={
                    process.env.PUBLIC_URL +
                    "/uploadimgs/" +
                    community.thumbnailImage
                  }
                  alt={community.title}
                />
                <ContentContainer>
                  <div className="cardti">
                    <CardTitle
                      style={{
                        maxWidth: "170px",
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {community.title}
                    </CardTitle>
                    {/* 답글 수 */}
                  </div>
                  <CardInfoContainer>
                    <CardInfo>작성자 {community.author.nickname}</CardInfo>
                    <CardInfo>조회수 {community.views}</CardInfo>
                    <CardInfo>추천 수 {community.recommends}</CardInfo>
                  </CardInfoContainer>
                  <CardDate>
                    {/* {new Date(community.updatedAt).toISOString().split("T")[0]} */}
                    {community.updatedAt.substring(0, 10).replace("T", " ")}
                  </CardDate>
                </ContentContainer>
              </LikeCard>
            </Link>
          ))}
        </CardList>
      ) : (
        <div className="inquiryNone">저정한 게시글이 없습니다.</div>
      )}
    </>
  );
};

export default LikeCardList;
