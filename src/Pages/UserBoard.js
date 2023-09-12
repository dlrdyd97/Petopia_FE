import React, { useState, useEffect, useRef } from "react";
import Header from "../Components/Header.js";
import Footer from "../Components/Footer.js";
import BgLeft from "../Components/BgLeft.js";
import RegionModal from "../Components/UserBoards/RegionModal.js";
import BoardList from "../Components/BoardList";

import "../Styles/UserBoard.css";
import "../Styles/RegionModal.css";

import Button from "react-bootstrap/Button";
import RegionSelect from "../Components/UserBoards/RegionSelect.js";
import CommnityList from "../Components/CommunityList.js";

const UserBoard = () => {
  const toWrite = () => {
    window.location.href = "/Write";
  };

  // 커뮤니티 페이지 로딩 시 "자유게시판"이 default로 focus 되어 있음
  const freeBoardRef = useRef(null);
  useEffect(() => {
    freeBoardRef.current.focus();
  }, []);

  // selectBox 클릭(handleBoardClick) 시 id값(자유/지역) 저장
  const [boards, setBoards] = useState("자유");
  // id에 해당하는 게시판 불러오기
  const [selectedBoard, setSelectedBoard] = useState("");

  // 지역 게시판 선택 시 세부 지역 선택 버튼 나타남(.regionSelectBoxes)
  const [regionSelectBoxesView, setRegionSelectBoxesView] = useState(false);
  // 세부 지역 선택 버튼 모달창
  const [modalOpen, setModalOpen] = useState(false);

  //세부 지역 표시
  const [cityChk1, setCityChk1] = useState("");

  // 세부 지역 선택 모달창 외부 클릭하면 모달창 닫힘
  // const outsideModal = useRef();
  // const clickOutside = (e) => {
  //   if (modalOpen && !outsideModal.current.contains(e.target))
  //     setModalOpen(false);
  //   else setModalOpen(true);
  // };

  // useEffect(() => {
  //   window.addEventListener("mousedown", clickOutside);
  //   return () => {
  //     window.removeEventListener("mousedown", clickOutside);
  //   };
  // });

  const handleBoardClick = (e) => {
    const id = e.currentTarget.id;
    setSelectedBoard(id);
    // console.log(e.currentTarget.id);
    setBoards(id);

    // 자유게시판을 선택 -> 지역 선택 버튼(.RegionSelectBoxes) 사라짐
    // 지역게시판을 선택 -> .RegionSelectBoxes 나타남
    if (id === "자유") {
      setRegionSelectBoxesView(false);
    } else if (id === "지역") {
      setRegionSelectBoxesView(true);
    }
  };

  return (
    <>
      <BgLeft />

      <main className="UserBoardSection">
        <Header />
        <section>
          <div>
            {/* -- 자유 게시판 / 지역 게시판 시작 -- */}
            <div className="selectBoxes">
              <button
                tabIndex="0"
                className="selectBox"
                id="자유"
                ref={freeBoardRef}
                onClick={(e) => {
                  handleBoardClick(e);
                }}
              >
                <div className="boardTitle_select">자유 게시판</div>
              </button>
              <button
                tabIndex="0"
                className="selectBox"
                id="지역"
                onClick={(e) => {
                  handleBoardClick(e);
                }}
              >
                <div className="boardTitle_select">지역 게시판</div>
              </button>
            </div>
            {/* -- 자유 게시판 / 지역 게시판 선택 버튼 끝 -- */}

            <div className="totalBoard">
              {/* 전체 지역 게시판 글 or 특정 지역 게시판 글 선택 버튼 */}
              {regionSelectBoxesView && (
                <div className="RegionSelectBoxes">
                  <RegionSelect>
                    <div className="RegionSelectBtns">
                      <button
                        type="button"
                        class="btn btn-primary RegionSelectBox btn-sm"
                        onClick={() => {
                          setModalOpen(true);
                        }}
                      >
                        지역 선택...
                      </button>
                    </div>
                    <RegionModal
                      // ref={outsideModal}
                      open={modalOpen}
                      close={() => setModalOpen(false)}
                    ></RegionModal>
                  </RegionSelect>
                </div>
              )}
              {/* 게시판 목록 */}
              <CommnityList />
              <div class="div_boardwrite_btn">
                {/* 글쓰기 버튼 */}
                <Button
                  type="button"
                  class="btn btn-primary boardwrite_btn"
                  onClick={toWrite}
                >
                  글쓰기
                </Button>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    </>
  );
};

export default UserBoard;
