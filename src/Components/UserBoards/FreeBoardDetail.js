import React, { useState } from "react";
import Header from "../../Components/Header.js";
import Footer from "../../Components/Footer.js";
import BgLeft from "../../Components/BgLeft.js";
import ReportModal from "../../Modal/ReportModal";
import "bootstrap/dist/css/bootstrap.css";
import "../../Styles/RecomendStyle.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const FreeBoardDetail = () => {
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
      <BgLeft />
      <main className="RouteTripSection">
        <Header />
        <section>
          <div className="RecomendBody">
            <div>
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search"
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

            <h4 className="h4_Recomend">게시글 테스트</h4>
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
                style={{ padding: "4px 0px 3px 0px", width: "70px" }}
                onClick={openModal}
              >
                🚨신고
              </Button>
            </div>
            <hr className="hr_Recomend" />

            <p className="p_recomend detailWriterP">
              <img
                className="detailProfileImg"
                src="img/titletest2.jpg"
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
                  src="img/titletest3.jpg"
                  alt=""
                />
              </div>

              <div>
                <p className="RecomendDetailP">
                  <br />
                  모든 국민은 근로의 의무를 진다. <br />
                  국가는 근로의 의무의 내용과 조건을 민주주의원칙에 따라 법률로
                  정한다. <br />
                  <br />
                  국회는 의장 1인과 부의장 2인을 선출한다.
                  <br /> 국회나 그 위원회의 요구가 있을 때에는 국무총리·국무위원
                  또는 정부위원은 출석·답변하여야 하며,
                  <br />
                  국무총리 또는 국무위원이 출석요구를 받은 때에는 국무위원 또는
                  정부위원으로 하여금 출석·답변하게 할 수 있다.
                  <br />
                </p>
              </div>
              <br />

              <div>
                <p className="RecomendDetailP">
                  제1항의 해임건의는 국회재적의원 3분의 1 이상의 발의에 의하여
                  국회재적의원 과반수의 찬성이 있어야 한다.
                  <br />
                  <br />
                  <br />
                </p>
              </div>

              <div className="Div_boardListBtn">
                <button
                  type="button"
                  class="btn btn-outline-primary boardListBtn"
                >
                  글목록
                </button>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    </>
  );
};

export default FreeBoardDetail;
