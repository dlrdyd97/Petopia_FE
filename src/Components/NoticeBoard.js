import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import CardList from "./CardList";
import SearchBarcm from "./SearchBarcm";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Paginationcm from "./Paginationcm";
import { Link } from "react-router-dom";

const NoticeContainer = styled.div`
  padding: 0 15px;
  max-height: 100%;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const BoardWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
  margin-top: 10px;
  flex-direction: column;
`;

const TitleSearchWrap = styled.div`
  flex-direction: column;
  justify-content: center;
  width: 100%;
  margin-bottom: 5px;
  align-items: center;
`;

const Title = styled.h2`
  font-size: 25px;
  font-weight: bold;
  margin: 0;
  text-align: center;
`;

const NoticeBoard = () => {
  const [session, setSession] = useState("admin@admin.com"); // 버튼 보이게 하기 위해 작성 추후 삭제
  // const session = sessionStorage.getItem("email"); // 로그인 email

  const [lists, setLists] = useState([]);
  const [filteredLists, setFilteredLists] = useState([]);

  const handleSearch = (query) => {
    const filteredLists = lists.filter((list) => {
      const title = list.title.toLowerCase();
      const content = list.content.toLowerCase();
      const author = list.author.toLowerCase();
      return (
        title.includes(query) ||
        content.includes(query) ||
        author.includes(query)
      );
    });
    setFilteredLists(filteredLists);
  };

  return (
    <NoticeContainer>
      <BoardWrapper>
        <h2 className="h2_Recomend">공지사항</h2>
        <TitleSearchWrap>
          <SearchBarcm />
        </TitleSearchWrap>

        <CardList lists={filteredLists.length > 0 ? filteredLists : lists} />
        <Link to="/NoticeWrite">
          {session === "admin@admin.com" && (
            <Button className="mt-2" variant="primary" size="sm">
              글쓰기
            </Button>
          )}
        </Link>
        {/* <Paginationcm /> */}
      </BoardWrapper>
    </NoticeContainer>
  );
};

export default NoticeBoard;
