import React, { useState, useEffect, Fragment } from "react";
import styled from "styled-components";
import axios from "axios";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import CommnityCardList from "./UserBoards/CommunityCardList";

const CouumnityContainer = styled.div`
  padding: 0 15px;
  max-height: 100%;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const UserBoardWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
  margin-top: 10px;
  flex-direction: column;
`;

const TitleSearchWrap = styled.div`
  flex-direction: row;
  width: 100%;
  margin-bottom: 5px;
  align-items: center;
`;

const CommunityList = () => {
  return (
    <>
      <CouumnityContainer>
        <UserBoardWrapper>
          <TitleSearchWrap>
            <div className="CommunitySearch">
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="검색할 내용을 입력하세요"
                  className="me-1 w-75 searchBar"
                  aria-label="Search"
                />
                <Button
                  className="searchBtn"
                  variant="outline-primary"
                  size="sm"
                >
                  검색
                </Button>
              </Form>
            </div>
          </TitleSearchWrap>
          <CommnityCardList />
        </UserBoardWrapper>
      </CouumnityContainer>
    </>
  );
};

export default CommunityList;
