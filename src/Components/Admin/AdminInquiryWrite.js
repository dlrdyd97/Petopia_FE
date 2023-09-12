import React, { useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Form from "react-bootstrap/Form";
import axios from "axios";

const AdminInquiryWrite = ({
  inquiryAdminData,
  setInquiryAdminAction,
  getInquiryListAll,
  setInquiryAdminData,
}) => {
  const contentRef = useRef();

  const [inquiryAdminAlert, setInquiryAdminAlert] = useState(0);

  const inquiryAdminWrite = () => {
    if (
      contentRef.current.value === "" ||
      contentRef.current.value === undefined
    ) {
      contentRef.current.focus();
      setInquiryAdminAlert(1);
      return false;
    }
    axios
      .post("/inquiryanswer", {
        id: inquiryAdminData.id,
        answer_status: "ANSWERED",
        answerContent: contentRef.current.value,
      })
      .then((res) => {
        getInquiryListAll();
        setInquiryAdminData(res.data);
        setInquiryAdminAction(1);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const inquiryAdminContentChange = () => {
    if (
      contentRef.current.value !== "" ||
      contentRef.current.value !== undefined
    ) {
      setInquiryAdminAlert(0);
    }
  };

  const [inquiryWriteLength, setInquiryWriteLength] = useState(0); // 문의 답변 길이

  return (
    <>
      <div className="writeForm">
        <Form>
          <Form.Group className="mb-3 writeFormContent">
            <Form.Label></Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="답변 내용을 입력하세요"
              className="contentForm"
              style={{ resize: "none" }}
              ref={contentRef}
              maxLength={1000}
              onChange={() => {
                inquiryAdminContentChange();
                setInquiryWriteLength(contentRef.current.value.length);
              }}
            />
          </Form.Group>
          {inquiryAdminAlert === 1 ? (
            <div className="inquiryWriteAlert">
              <p>내용을 입력하세요.</p>
            </div>
          ) : inquiryWriteLength < 1000 ? (
            <div className="inquiryWriteTitleLength">
              <div className="inquiryWriteTitleBox">
                <p>{inquiryWriteLength} / 1000</p>
              </div>
            </div>
          ) : (
            <div className="inquiryWriteTitleLength">
              <div className="inquiryWriteTitleBox">
                <p>
                  <span className="inquiryWriteRed">{inquiryWriteLength}</span>/
                  30
                </p>
              </div>
            </div>
          )}
        </Form>
        <div className="inquiryWriteBox">
          <button
            className="inquiryBtn"
            onClick={() => {
              inquiryAdminWrite();
              // setInquiryAdminAction(0);
            }}
          >
            저장
          </button>
        </div>
      </div>
    </>
  );
};

export default AdminInquiryWrite;
