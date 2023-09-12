import React, { useState } from "react";
import AdminInquiryWrite from "./AdminInquiryWrite";
import AdminInquiryUpdate from "./AdminInquiryUpdate";
import { FaAngleLeft } from "react-icons/fa";
import axios from "axios";

const AdminInquiryDetail = ({
  inquiryAdminList,
  inquiryAdminData,
  setInquiryAdminData,
  setInquiryAdminAction,
  getInquiryListAll,
}) => {
  const [inquiryadmincheck, setInquiryadmincheck] = useState(0);

  const inquiryAnswerDelete = () => {
    axios
      .post("/inquiryAnswerDelete", {
        id: inquiryAdminData.id,
        answer_status: "PENDING",
      })
      .then((res) => {
        getInquiryListAll();
        setInquiryAdminData(res.data);
        setInquiryAdminAction(1);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  return (
    <>
      <div className="inquiryAdminHeader">
        <div className="inquiryAdminBack-Box">
          <div
            className="inquiryAdminBack-left"
            onClick={() => {
              setInquiryAdminAction(0);
            }}
          >
            <FaAngleLeft className="inquiryBack-icon" />
          </div>
        </div>
        <h4>1:1문의 관리</h4>
      </div>
      <hr className="inquiryAdminhr" />
      <div className="inquiryDetail1">
        <div className="inquiryDetail2">
          <div className="inquiryMainTitleBox">
            <b className="inquiryMainTitle">{inquiryAdminData.title}</b>
          </div>
          <b className="inquiryMainDate">
            {/* {new Date(inquiryAdminData.uploadDate).toISOString().split("T")[0]} */}
            {inquiryAdminData.uploadDate.substring(0, 10).replace("T", " ")}
          </b>
          <div className="inquiryadminusername">
            <b>작성자 : {inquiryAdminData.user.email}</b>
          </div>
          <div className="inquiryAdminDetailContent">
            {inquiryAdminData.content}
          </div>
        </div>
      </div>
      <br />
      <hr className="inquiryhr1" />
      {/* 답변내용 */}
      {inquiryAdminData.answer_status === "ANSWERED" &&
      inquiryadmincheck === 0 ? (
        <>
          <div className="inquiryDetail1">
            <div className="detailSpace">
              <b className="inquiryAdminAnswerTitle">답변</b>
              <br />
              <b className="inquiryMainDate">
                {/* {new Date(inquiryAdminData.reportDate).toISOString().split("T")[0]} */}
                {inquiryAdminData.uploadDate.substring(0, 10).replace("T", " ")}
              </b>
            </div>
            <div className="inquiryAdminDetailContent1">
              {inquiryAdminData.answerContent}
            </div>
          </div>
          <div className="inquiryWriteBox">
            <button
              className="inquiryBtn"
              onClick={() => {
                setInquiryadmincheck(1);
              }}
            >
              수정
            </button>
            <button
              className="inquiryBtn2"
              onClick={() => {
                inquiryAnswerDelete();
              }}
            >
              답변삭제
            </button>
          </div>
        </>
      ) : null}
      <br />
      {inquiryAdminData.answer_status === "PENDING" &&
      inquiryadmincheck === 0 ? (
        <div className="inquiryWriteBox">
          <AdminInquiryWrite
            inquiryAdminData={inquiryAdminData}
            setInquiryAdminAction={setInquiryAdminAction}
            getInquiryListAll={getInquiryListAll}
            setInquiryAdminData={setInquiryAdminData}
          />
        </div>
      ) : null}

      {inquiryadmincheck === 1 ? (
        <div className="inquiryWriteBox">
          <AdminInquiryUpdate
            inquiryAdminData={inquiryAdminData}
            setInquiryAdminAction={setInquiryAdminAction}
            getInquiryListAll={getInquiryListAll}
            setInquiryAdminData={setInquiryAdminData}
            setInquiryadmincheck={setInquiryadmincheck}
          />
        </div>
      ) : null}
    </>
  );
};

export default AdminInquiryDetail;
