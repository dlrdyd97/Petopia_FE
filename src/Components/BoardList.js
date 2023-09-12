import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import CardList from "./CardList";
import SearchBarcm from "./SearchBarcm";
import Button from "react-bootstrap/Button";

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
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 5px;
  align-items: center;
`;

function NoticeBoard() {
  return (
    <NoticeContainer>
      <BoardWrapper>
        <TitleSearchWrap>
          <SearchBarcm />
        </TitleSearchWrap>
        <CardList />
      </BoardWrapper>
    </NoticeContainer>
  );
}

export default NoticeBoard;
