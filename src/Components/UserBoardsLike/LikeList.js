import React, { useState, useEffect, Fragment } from "react";
import styled from "styled-components";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { FaAngleLeft } from "react-icons/fa";

import LikeCardList from "./LikeCardList";

const LikeContainer = styled.div`
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

const LikeList = ({ setMyPageAction }) => {
  const [interestList, setInterestList] = useState([]);

  const getInterestList = () => {
    axios
      .get("/interest/list", {
        params: {
          email: sessionStorage.getItem("email"),
        },
      })
      .then((res) => {
        const { data } = res;
        setInterestList(data);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  useEffect(() => {
    getInterestList();
  }, []);

  return (
    <>
      <div className="inquiryHeader">
        <div
          className="inquiryBack-left"
          onClick={() => {
            setMyPageAction(0);
          }}
        >
          <FaAngleLeft className="inquiryBack-icon" />
        </div>
        <h4>관심목록</h4>
      </div>
      <LikeContainer>
        <UserBoardWrapper>
          {/* <TitleSearchWrap>
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
          </TitleSearchWrap> */}
          <LikeCardList interestList={interestList} />
        </UserBoardWrapper>
      </LikeContainer>
    </>
  );
};

export default LikeList;
