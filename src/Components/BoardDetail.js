import "bootstrap/dist/css/bootstrap.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import { BsPerson, BsHandThumbsUp, BsHeart } from "react-icons/bs";
import "../Styles/RecomendStyle.css";
import React, { useState, useEffect } from "react";
import Comment from "./Comment";
import Reply from "./Reply";
import { Link } from "react-router-dom";
import ReportModal from "../Modal/ReportModal";

const Recomend_detail = () => {
  const thumbsClick = () => {};

  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <ReportModal open={modalOpen} close={closeModal} header="게시글 신고">
        <p>신고 사유를 선택해 주세요</p>
      </ReportModal>
      <div className="RecomendBody">
        <h2 className="h2_Recomend">공간 보기</h2>

        <div>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="검색할 내용을 입력하세요"
              className="me-1 w-75 searchBar"
              aria-label="Search"
            />
            <Button className="searchBtn" variant="outline-primary" size="sm">
              검색
            </Button>
          </Form>
        </div>

        <h4 className="h4_Recomend">게시글 제목</h4>

        <div className="detailReportBtnDiv">
          {sessionStorage.getItem("email") === "admin@admin.com" ? (
            <Button
              className="btm-sm reportBtn"
              variant="outline-secondary"
              style={{ padding: "4px 0px 3px 0px", marginRight: "10px" }}
              onClick={() => {
                alert("delete btn clicked");
              }}
            >
              삭제
            </Button>
          ) : null}
          <Button
            className="btm-sm reportBtn"
            variant="outline-danger"
            style={{ padding: "4px 0px 3px 0px" }}
            onClick={openModal}
          >
            🚨신고
          </Button>
        </div>

        <hr className="hr_Recomend" />

        <p className="p_recomend detailWriterP">
          <img
            className="detailProfileImg"
            src="img/detail_profile_img.png"
            alt=""
          />
          petopia
        </p>

        <p className="p_recommendDate">2023-05-05</p>
        <br />
        <br />
        <br />
        <br />

        <div className="RecomendDetailBody">
          <div>
            <img
              className="RecomendDetailImg"
              src="img/recommend_detail1.png"
              alt=""
            />
          </div>

          <div>
            <p className="RecomendDetailP">
              [송도IBD 매거진 블로그]에서는, 송도IBD '블로그피플'이라는 코너를
              연재하고 있습니다. <br />
              일상생활과 문화, 예술 등 송도IBD의 생생한 모습들이 담겨있는
              블로그를 하나하나 찾아 소개해드리는 코너지요! <br />
              이번에는 '로니&베베 개판 Story'라는 독특한 이름을 가진 블로그를
              만나봤습니다. <br />
              <br />
              블로그를 운영하고 계신 로니PaPa님은 비글 로니와 닥스훈트 베베라는
              반려견을 키우고 있습니다.
              <br /> 이 활발한 강아지들을 산책시킬 때는 송도국제도시에 있는
              센트럴파크가 딱이라고 하는데요.
              <br />
              <br /> 이유가 뭘까요? 그 현장에서 확인해보시죠!
            </p>
          </div>
          <br />

          <div>
            <img
              className="RecomendDetailImg"
              src="img/recommend_detail2.png"
              //   src="https://placeholder.com/300x200"
              alt=""
            />
          </div>

          <div>
            <p className="RecomendDetailP">
              센트럴파크에서의 행복한 한 때를 보낸 로니, 베베 그리고 파파.{" "}
              <br />
              마치 화보 같은 센트럴파크의 사진들을 보니 정말 푸른 풀밭이 있는
              공원에서 여유로운 한 때를 보내고 싶은 기분이 들지 않으세요? <br />
              오늘은 공원 산책, 어떠세요?
            </p>
          </div>

          <div className="thumbsHeart">
            <br />
            <div className="thumbs">
              {/* <p className="thumbsHeartText">추천해요</p> */}
              <button type="button" className="thumbsHeartIconBtn">
                <BsHandThumbsUp
                  className="thumbsHeartIcon"
                  onClick={thumbsClick}
                />
              </button>
              <span className="thumbsHeartSpan">32</span>
            </div>

            <br />

            <div className="heart">
              {/* <p className="thumbsHeartText">저장할래요</p> */}
              <button type="button" className="thumbsHeartIconBtn">
                <BsHeart
                  className="thumbsHeartIcon"
                  style={{ outline: "none" }}
                />
              </button>
              <span className="thumbsHeartSpan">8</span>
            </div>
          </div>

          <div className="Div_boardListBtn boardListBtnDetailDiv">
            <button
              type="button"
              className="btn btn-outline-primary boardListBtn"
            >
              글목록
            </button>

            <div className="boardListBtnDetail">
              <Link to="/update">
                <button
                  type="button"
                  className="btn btn-primary btn-sm boardListBtn boardListBtnDetail"
                >
                  글 수정
                </button>{" "}
              </Link>
            </div>
            {/* {session === "admin" && (
              <Link to="/update">
                <button
                  type="button"
                  className="btn btn-primary boardListBtn boardListBtnDetail"
                >
                  글 수정
                </button>{" "}
              </Link>
            )} */}
          </div>

          <div className="boardCommentDiv">
            <Comment
              commentProfile="img/recommend_detail2.png"
              commentWriter="fasd"
              commentTime="14 시간 전"
              commentContent="굿"
            />
            <Comment
              commentProfile="img/facebook.png"
              commentWriter="fasd1234"
              commentContent="Porta ac consectetur acPorta cteturPorta ac consectetur acPorta cteturPorta ac consectetur acPorta ctetur"
              commentTime="14 시간 전"
            />
            <Reply
              replyProfile="img/recommend_best3.png"
              replyWriter="reple 1"
              replyTime="24 시간 전"
              replyContent="?"
            />
            <Reply
              replyProfile="img/googlelogo.png"
              replyWriter="reple 2"
              replyTime="24 시간 전"
              replyContent="Porta ac consectetur acPorta ctetur"
            />
            <Comment
              commentProfile="img/dog_main.png"
              commentWriter="qwerty"
              commentTime="24 시간 전"
              commentContent="둣"
            />

            <Reply
              replyProfile="img/recommend_detail1.png"
              replyWriter="reple 3"
              replyTime="24 시간 전"
              replyContent="fasd"
            />
          </div>

          <div className="writeCommentDiv">
            <Form.Group className="mb-3 writeFormContent">
              <Form.Label></Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="댓글을 입력하세요"
                className="writeCommentTextarea"
              />
              <Button className="btn-sm writeCommentBtn" variant="primary">
                댓글달기
              </Button>
            </Form.Group>
          </div>
        </div>
      </div>
    </>
  );
};
export default Recomend_detail;
