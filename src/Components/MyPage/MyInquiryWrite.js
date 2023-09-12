import React, { useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { FaAngleLeft } from "react-icons/fa";

const MyInquiryWrite = ({ setInquiryAction, inquirydblist, inquiryCount }) => {
  const titleRef = useRef();
  const contentRef = useRef();

  const [inquiryalert, setInquiryalert] = useState(0);

  const inquirydbwrite = () => {
    if (titleRef.current.value === "" || titleRef.current.value === undefined) {
      setInquiryalert(1);
      titleRef.current.focus();
      return false;
    } else if (
      contentRef.current.value === "" ||
      contentRef.current.value === undefined
    ) {
      setInquiryalert(2);
      contentRef.current.focus();
      return false;
    }
    axios
      .post("/inquirywrite", {
        title: titleRef.current.value,
        content: contentRef.current.value,
        answer_status: "PENDING",
        username: sessionStorage.getItem("email"),
      })
      .then((res) => {
        inquirydblist();
        setInquiryAction(0);
        inquiryCount();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const inquiryEnter = () => {
    if (titleRef.current.value !== "") {
      contentRef.current.focus();
    } else {
      setInquiryalert(1);
    }
  };

  const inquiryTitleChange = () => {
    if (titleRef.current.value !== "" || titleRef.current.value !== undefined) {
      setInquiryalert(0);
    }
  };

  const inquiryContentChange = () => {
    if (
      contentRef.current.value !== "" ||
      contentRef.current.value !== undefined
    ) {
      setInquiryalert(0);
    }
  };

  const [inquiryWriteLength, setInquiryWriteLength] = useState(0); // 문의 제목 길이
  const [inquiryWriteLength2, setInquiryWriteLength2] = useState(0); // 문의 내용 길이

  return (
    <>
      <div className="inquiryHeader">
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
      <div className="writeFormInquiry">
        <Form>
          <Form.Group className="mb-3">
            <Form.Label></Form.Label>
            <Form.Control
              className="writeTitle"
              type="text"
              placeholder="제목"
              ref={titleRef}
              maxLength={30}
              onChange={() => {
                inquiryTitleChange();
                setInquiryWriteLength(titleRef.current.value.length);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  inquiryEnter();
                }
              }}
            />
          </Form.Group>
          {inquiryalert === 1 ? (
            <div className="inquiryWriteAlert">
              <p>제목을 입력하세요.</p>
            </div>
          ) : inquiryWriteLength < 30 ? (
            <div className="inquiryWriteTitleLength">
              <div className="inquiryWriteTitleBox">
                <p>{inquiryWriteLength} / 30</p>
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
          <Form.Group className="mb-3 writeFormContent">
            <Form.Label></Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="문의 내용을 입력하세요"
              className="contentForm"
              ref={contentRef}
              maxLength={500}
              style={{ resize: "none" }}
              onChange={() => {
                inquiryContentChange();
                setInquiryWriteLength2(contentRef.current.value.length);
              }}
            />
          </Form.Group>
          {inquiryalert === 2 ? (
            <div className="inquiryWriteAlert">
              <p>내용을 입력하세요.</p>
            </div>
          ) : inquiryWriteLength2 < 500 ? (
            <div className="inquiryWriteTitleLength">
              <div className="inquiryWriteTitleBox">
                <p>{inquiryWriteLength2} / 500</p>
              </div>
            </div>
          ) : (
            <div className="inquiryWriteTitleLength">
              <div className="inquiryWriteTitleBox">
                <p>
                  <span className="inquiryWriteRed">{inquiryWriteLength2}</span>
                  / 500
                </p>
              </div>
            </div>
          )}
        </Form>
      </div>
      <div className="inquiryWriteBox">
        <button
          className="inquiryBtn"
          onClick={() => {
            // 저장 코드 들어감
            inquirydbwrite();
          }}
        >
          작성완료
        </button>
      </div>
    </>
  );
};

export default MyInquiryWrite;
