import React, { useState, useEffect } from "react";
import BoardList from "../BoardList.js";
import Button from "react-bootstrap/Button";
import "../../Styles/UserBoard.css";
import "bootstrap/dist/css/bootstrap.min.css";
import styled from "styled-components";
import CardList from "../CardList";
import SearchBarcm from "../SearchBarcm.js";

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

const FreeBoardList = () => {
  return (
    <>
      <NoticeContainer>
        <BoardWrapper>
          <TitleSearchWrap>
            <SearchBarcm />
          </TitleSearchWrap>
          <CardList />
        </BoardWrapper>
      </NoticeContainer>
      <div class="div_boardwrite_btn"></div>
    </>
  );
};

export default FreeBoardList;
