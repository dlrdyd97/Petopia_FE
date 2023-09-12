import "bootstrap/dist/css/bootstrap.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import { BsPerson, BsHandThumbsUp, BsHeart } from "react-icons/bs";
import "../../Styles/RecomendStyle.css";
import { Link, useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import ReportModal from "../../Modal/ReportModal";
import axios from "axios";

const Recommend_detail_before = () => {
  const location = useLocation();
  const boardid = location.state.boardid;

  const thumbsClick = () => {
    alert("thumbs up clicked");
  };

  // useState를 사용하여 open상태를 변경한다. (open일때 true로 만들어 열리는 방식)
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  const [placeCategory, setPlaceCategory] = useState("");
  const [petProvisionsData, setPetProvisionsData] = useState([]);

  axios
    .post("/board/detail", {
      id: boardid,
      category: "TRAVEL",
    })
    .then((res) => {
      getTravelInfo(res.data.id);
      //console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    });

  const getTravelInfo = (boardid) => {
    axios
      .post("/travel/getinfo", { post: { id: boardid } })
      .then((res) => {
        setPlaceCategory(res.data.category);
        setPetProvisionsData(res.data.petProvisions);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {}, [petProvisionsData]);

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
            <Button className="searchBtn btn-sm" variant="outline-primary">
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
              센트럴파크에서의 행복한 한 때를 보낸 로니, 베베 그리고 파파.
              <br />
              마치 화보 같은 센트럴파크의 사진들을 보니 정말 푸른 풀밭이 있는
              공원에서 여유로운 한 때를 보내고 싶은 기분이 들지 않으세요? <br />
              오늘은 공원 산책, 어떠세요?
            </p>
          </div>

          <Card className="cardRecomendDetail">
            <Card.Body className="cardRecomendDetailBody jangso">
              ✅ 장소 정보
            </Card.Body>
            <Card.Body className="cardRecomendDetailBody">
              📌 어떤 종류의 장소인가요? <br /> <br />
              {placeCategory === "RESTAURANT" ? (
                <span>- 음식점</span>
              ) : placeCategory === "PARK" ? (
                <span>- 공원</span>
              ) : placeCategory === "CAFE" ? (
                <span>- 카페</span>
              ) : placeCategory === "ACCOMMODATION" ? (
                <span>- 숙소</span>
              ) : null}
            </Card.Body>
            <Card.Body className="cardRecomendDetailBody">
              📌 반려견 동반 시 유의사항 <br /> <br />
              {petProvisionsData.includes("PET_SNACK") && (
                <span>
                  - 펫 간식 제공 <br />
                </span>
              )}
              {petProvisionsData.includes("PET_SNACK") && (
                <span>
                  - 펫방석 혹은 담요 제공 <br />
                </span>
              )}
              {petProvisionsData.includes("PET_MANNER_BELT") && (
                <span>
                  - 마킹이 심한 반려견은 매너벨트 착용 <br />
                </span>
              )}
              {petProvisionsData.includes("NO_LARGE_DOG_ALLOWED") && (
                <span>
                  - 15 kg 이상 대형견은 업체 문의 <br />
                </span>
              )}
              - 심한 짖음, 공격성 있는 반려견 동반 불가
            </Card.Body>

            <Card.Body className="cardRecomendDetailBodyAlert">
              💡기본적인 펫티켓을 꼭 지켜주세요💡
            </Card.Body>
          </Card>

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
                <BsHeart className="thumbsHeartIcon" />
              </button>
              <span className="thumbsHeartSpan">8</span>
            </div>
          </div>

          <div className="Div_boardListBtn">
            <Link to="/routetrip">
              <button
                type="button"
                className="btn btn-outline-primary boardListBtn"
              >
                글목록
              </button>
            </Link>

            {/* <div className="reportBtnDiv">
              <Button
                className="btm-sm reportBtn"
                variant="outline-danger"
                style={{ padding: "4px 0px 3px 0px" }}
              >
                🚨신고
              </Button>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Recommend_detail_before;
