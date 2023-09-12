import React from "react";
import axios from "axios";
import { FaAngleLeft } from "react-icons/fa";

const MyInquiryDetail = ({
  inquirydata,
  setInquiryAction,
  inquirydblist,
  inquiryCount,
}) => {
  //문의 삭제
  const inquiryDelete = () => {
    axios
      .post("/inquirydelete", {
        id: inquirydata.id,
      })
      .then((res) => {
        inquirydblist();
        setInquiryAction(0);
        inquiryCount();
      })
      .catch((e) => {
        console.error(e);
      });
  };

  return (
    <>
      <div className="inquiryHeader">
        {/* 뒤로가기 */}
        <div
          className="inquiryBack-left"
          onClick={() => {
            setInquiryAction(0);
          }}
        >
          <FaAngleLeft className="inquiryBack-icon" />
        </div>
        <h4>1:1문의</h4>
      </div>
      <hr className="inquiryhr1" />
      {/* 문의 상세내용 */}
      <div className="inquiryDetail1">
        <div className="inquiryDetail2">
          <div className="inquiryMainTitleBox">
            <b className="inquiryMainTitle">{inquirydata.title}</b>
          </div>
          <b className="inquiryMainDate">
            {/* {new Date(inquirydata.uploadDate).toISOString().split("T")[0]} */}
            {inquirydata.uploadDate.substring(0, 10).replace("T", " ")}
          </b>
          <br />
          <br />
          <b className="inquiryMainTitle">문의내용</b>
          <div className="inquiryDetailContent">{inquirydata.content}</div>
        </div>
      </div>
      <br />
      <hr className="inquiryhr1" />
      {inquirydata.answer_status === "ANSWERED" ? (
        <>
          <div className="inquiryDetail1">
            <div className="detailSpace">
              <b className="inquiryAnswerTitle">펫토피아 답변</b>
              <br />
              <b className="inquiryMainAnswerDate">
                {/* {new Date(inquirydata.reportDate).toISOString().split("T")[0]} */}
                {inquirydata.reportDate.substring(0, 10).replace("T", " ")}
              </b>
            </div>
            <div className="inquiryDetailContent1">
              {inquirydata.answerContent}
            </div>
          </div>
        </>
      ) : null}
      <br />
      <div className="inquiryDetailBox">
        {inquirydata.answer_status === "PENDING" ? (
          <>
            <button
              className="inquiryBtn"
              onClick={() => {
                setInquiryAction(3);
              }}
            >
              수정
            </button>
            <button
              className="inquiryBtn2"
              onClick={() => {
                if (window.confirm("삭제하시겠습니까?")) {
                  inquiryDelete();
                  setInquiryAction(0);
                }
              }}
            >
              삭제
            </button>
          </>
        ) : (
          <button
            className="inquiryBtn"
            onClick={() => {
              if (window.confirm("삭제하시겠습니까?")) {
                inquiryDelete();
                setInquiryAction(0);
              }
            }}
          >
            삭제
          </button>
        )}
      </div>
    </>
  );
};

export default MyInquiryDetail;
