import React from "react";
import styled from "styled-components";
import Card from "./Card";
import { Link } from "react-router-dom";

const NoticeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 95%;
`;

const BoardWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
  width: 100%;
`;

function Board() {
  const cards = [
    {
      id: 1,
      title: "귀여운 강아지",
      content: "이 아이는 정말 귀엽죠!",
      date: "2023-04-25",
      author: "홍길동",
      views: 200,
      comments: 37,
      thumbnailUrl:
        "https://images.unsplash.com/photo-1562176546-95420556c872?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      recommends: 70,
    },
    {
      id: 2,
      title: "귀여운 고양이",
      content: "이 아이도 정말 귀여워요!",
      date: "2023-04-28",
      author: "김철수",
      views: 150,
      comments: 20,
      thumbnailUrl:
        "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1143&q=80",
      recommends: 50,
    },
    {
      id: 3,
      title: "귀여운 햄스터",
      content: "이 아이는 귀여움의 끝판왕!",
      date: "2023-04-30",
      author: "이영희",
      views: 100,
      comments: 15,
      thumbnailUrl:
        "https://images.unsplash.com/photo-1425082661705-1834bfd09dca?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1176&q=80",
      recommends: 30,
    },
    {
      id: 4,
      title: "귀여운 여우",
      content: "이 아이도 정말 귀여워요!",
      date: "2023-05-02",
      author: "박철호",
      views: 80,
      comments: 10,
      thumbnailUrl:
        "https://images.unsplash.com/photo-1506657047594-19a6c6a72bd0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80",
      recommends: 20,
    },
    {
      id: 5,
      title: "귀여운 앵무새",
      content: "이 아이도 정말 귀여워요!",
      date: "2023-05-05",
      author: "김민지",
      views: 70,
      comments: 8,
      thumbnailUrl:
        "https://images.unsplash.com/photo-1604826010917-65cf53d6249b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      recommends: 15,
    },
  ];

  return (
    <NoticeContainer>
      <BoardWrapper>
        {cards.map((card) => (
          <StyledLink to={`/${card.id}`} key={card.id}>
            <Card {...card} />
          </StyledLink>
        ))}
      </BoardWrapper>
    </NoticeContainer>
  );
}

export default Board;
