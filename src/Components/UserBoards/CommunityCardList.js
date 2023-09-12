import React, { useState, useEffect, Fragment } from "react";
import styled from "styled-components";
import axios from "axios";
import { Link } from "react-router-dom";

const CommunityList = styled.div`
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

const CommunityCard = styled.div`
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
`;

const ContentContainer = styled.div`
  width: 100%;
`;

const CardTitle = styled.div`
  margin: 0;
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

const CardDate = styled.p`
  margin-top: 10px;
  text-align: right;
  font-size: 12px;
  margin: 0 10px;
`;

const CardList = () => {
  const toBoardDetail = () => {
    window.location.href = "/boarddetail";
  };
  const [lists, setlists] = useState([
    {
      id: 1,
      title: "게시글 테스트.",
      content: "테스트.",
      date: "2023-05-09",
      author: "홍길동",
      views: 10,
      comments: 3,
      thumbnailUrl:
        "https://cdn.imweb.me/upload/S201807025b39d1981b0b0/5cada7d69cdc5.jpg",
      recommends: 10,
    },
    {
      id: 2,
      title: "게시글 테스트",
      content: "테스트",
      date: "2023-05-09",
      author: "홍길동",
      views: 10,
      comments: 5,
      thumbnailUrl:
        "https://cdn.imweb.me/upload/S201807025b39d1981b0b0/5cada7d69cdc5.jpg",
      recommends: 10,
    },
    {
      id: 3,
      title: "게시글 테스트",
      content: "테스트",
      date: "2023-05-09",
      author: "admin",
      views: 10,
      comments: 15,
      thumbnailUrl:
        "https://cdn.imweb.me/upload/S201807025b39d1981b0b0/5cada7d69cdc5.jpg",
      recommends: 10,
    },

    {
      id: 4,
      title: "게시글 테스트",
      content: "테스트",
      date: "2023-05-09",
      author: "관리자",
      views: 10,
      comments: 2,
      thumbnailUrl:
        "https://cdn.imweb.me/upload/S201807025b39d1981b0b0/5cada7d69cdc5.jpg",
      recommends: 10,
    },

    {
      id: 5,
      title: "게시글 테스트",
      content: "테스트",
      date: "2023-05-09",
      author: "관리자2",
      views: 10,
      comments: 150,
      thumbnailUrl:
        "https://cdn.imweb.me/upload/S201807025b39d1981b0b0/5cada7d69cdc5.jpg",
      recommends: 10,
    },
  ]);

  useEffect(() => {
    axios
      .get("/lists")
      .then((response) => {
        setlists(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <CommunityList>
      {lists.map((community) => (
        <Link className="linkstyle" to="/" key={community.id}>
          <CommunityCard onClick={toBoardDetail}>
            <Thumbnail src={community.thumbnailUrl} alt={community.title} />
            <ContentContainer>
              <div className="cardti">
                <CardTitle>{community.title}</CardTitle>
                <CardComments>({community.comments})</CardComments>
              </div>
              <CardInfoContainer>
                <CardInfo>작성자 {community.author}</CardInfo>
                <CardInfo>조회수 {community.views}</CardInfo>
                <CardInfo>추천 수 {community.recommends}</CardInfo>
              </CardInfoContainer>
              <CardDate>{community.date}</CardDate>
            </ContentContainer>
          </CommunityCard>
        </Link>
      ))}
    </CommunityList>
  );
};

export default CardList;
