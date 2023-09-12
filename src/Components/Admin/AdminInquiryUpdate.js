import React, { useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Form from "react-bootstrap/Form";
import axios from "axios";

const AdminInquiryUpdate = ({
  inquiryAdminData,
  setInquiryAdminAction,
  getInquiryListAll,
  setInquiryAdminData,
  setInquiryadmincheck,
}) => {
  const contentRef = useRef();

  const [inquiryAdminAlert, setInquiryAdminAlert] = useState(0);

  const inquiryAdminUpdate = () => {
    if (
      contentRef.current.value === "" ||
      contentRef.current.value === undefined
    ) {
      contentRef.current.focus();
      setInquiryAdminAlert(1);
      return false;
    }
    axios
      .post("/inquiryUpdateAnswer", {
        id: inquiryAdminData.id,
        answerContent: contentRef.current.value,
      })
      .then((res) => {
        getInquiryListAll();
        setInquiryAdminData(res.data);
        setInquiryadmincheck(0);
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

  const [inquiryWriteLength, setInquiryWriteLength] = useState(
    inquiryAdminData.answerContent.length
  ); // 문의 내용 길이 , 초기값 defaultValue

  return (
    <>
      <div className="writeForm">
        <Form>
          <Form.Group className="mb-3 writeFormContent">
            <Form.Label></Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="문의 내용을 입력하세요"
              className="contentForm"
              defaultValue={inquiryAdminData.answerContent}
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
                  1000
                </p>
              </div>
            </div>
          )}
        </Form>
        <div className="inquiryWriteBox">
          <button
            className="inquiryBtn"
            onClick={() => {
              inquiryAdminUpdate();
            }}
          >
            수정
          </button>
        </div>
      </div>
    </>
  );
};

export default AdminInquiryUpdate;
