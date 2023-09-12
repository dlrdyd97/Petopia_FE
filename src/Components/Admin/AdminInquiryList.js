import React, { useEffect, useState } from "react";

const AdminInquiryList = ({
  inquiryAdminList,
  setInquiryAdminData,
  setInquiryAdminAction,
  getInquiryListAll,
}) => {
  // 문의 카테고리 선택
  const [selectedInquiry, setSelectedInquiry] = useState("All");
  useEffect(() => {
    const inquiryAll = document.getElementById("inquiryAll");
    const inquiryWating = document.getElementById("inquiryWating");
    const inquiryWComplete = document.getElementById("inquiryWComplete");

    if (selectedInquiry === "All") {
      inquiryAll.className = "inquiryadminbox1 inquiry_selected";
      inquiryWating.className = "inquiryadminbox1";
      inquiryWComplete.className = "inquiryadminbox1";
    } else if (selectedInquiry === "Wating") {
      inquiryAll.className = "inquiryadminbox1";
      inquiryWating.className = "inquiryadminbox1 inquiry_selected";
      inquiryWComplete.className = "inquiryadminbox1";
    } else if (selectedInquiry === "Complete") {
      inquiryAll.className = "inquiryadminbox1";
      inquiryWating.className = "inquiryadminbox1";
      inquiryWComplete.className = "inquiryadminbox1 inquiry_selected";
    }
  }, [selectedInquiry]);

  const [inquiryadminstate, setInquiryadminstate] = useState(0);
  // inquiryadminstate = 0 => 전체 문의 , inquiryadminstate = 1 => 답변 대기 , inquiryadminstate = 2 = > 답변 완료

  useEffect(() => {
    getInquiryListAll();
  }, [inquiryadminstate]);
  return (
    <>
      <div className="inquiryAdminHeader">
        <h4>1:1문의 관리</h4>
      </div>
      <div className="inquiryadminbox">
        <div
          className="inquiryadminbox1"
          id="inquiryAll"
          onClick={() => {
            setSelectedInquiry("All");
            setInquiryadminstate(0);
          }}
        >
          <b>전체 문의</b>
          <br />
          <b>{inquiryAdminList.length}</b>
        </div>
        <div
          className="inquiryadminbox1"
          id="inquiryWating"
          onClick={() => {
            setSelectedInquiry("Wating");
            setInquiryadminstate(1);
          }}
        >
          <b>답변 대기</b>
          <br />
          <b>
            {
              inquiryAdminList.filter(
                (data) => data.answer_status === "PENDING"
              ).length
            }
          </b>
        </div>
        <div
          className="inquiryadminbox1"
          id="inquiryWComplete"
          onClick={() => {
            setSelectedInquiry("Complete");
            setInquiryadminstate(2);
          }}
        >
          <b>답변 완료</b>
          <br />
          <b>
            {
              inquiryAdminList.filter(
                (data) => data.answer_status === "ANSWERED"
              ).length
            }
          </b>
        </div>
      </div>
      <hr className="inquiryhr1" />
      {inquiryAdminList.length !== 0 && inquiryadminstate === 0 ? (
        inquiryAdminList.map((a, i) => (
          <div
            className="inquiryMain"
            onClick={() => {
              setInquiryAdminData(a);
              setInquiryAdminAction(1);
            }}
          >
            <div className="inquiryAdminList">
              <div className="inquiryAdminTitleEllipsis">
                <b className="inquiryMainTitle">{a.title}</b>
              </div>
              {a.answer_status === "PENDING" ? (
                <div className="inquiryadminStatusWait">답변 대기</div>
              ) : (
                <div className="inquiryadminStatusComplete">답변 완료</div>
              )}
              <b className="inquiryMainDate">
                {/* {new Date(a.uploadDate).toISOString().split("T")[0]} */}
                {a.uploadDate.substring(0, 10).replace("T", " ")}
              </b>
            </div>
            <hr className="inquiryhr2" />
          </div>
        ))
      ) : inquiryAdminList.length !== 0 && inquiryadminstate === 1 ? (
        inquiryAdminList
          .filter((data) => data.answer_status === "PENDING")
          .map((a, i) => (
            <div
              className="inquiryMain"
              onClick={() => {
                setInquiryAdminData(a);
                setInquiryAdminAction(1);
              }}
            >
              <div className="inquiryAdminList">
                <div className="inquiryAdminTitleEllipsis">
                  <b className="inquiryMainTitle">{a.title}</b>
                </div>
                {a.answer_status === "PENDING" ? (
                  <div className="inquiryadminStatusWait">답변 대기</div>
                ) : (
                  <div className="inquiryadminStatusComplete">답변 완료</div>
                )}
                <b className="inquiryMainDate">
                  {/* {new Date(a.uploadDate).toISOString().split("T")[0]} */}
                  {a.uploadDate.substring(0, 10).replace("T", " ")}
                </b>
              </div>
              <hr className="inquiryhr2" />
            </div>
          ))
      ) : inquiryAdminList.length !== 0 && inquiryadminstate === 2 ? (
        inquiryAdminList
          .filter((data) => data.answer_status === "ANSWERED")
          .map((a, i) => (
            <div
              className="inquiryMain"
              onClick={() => {
                setInquiryAdminData(a);
                setInquiryAdminAction(1);
              }}
            >
              <div className="inquiryAdminList">
                <div className="inquiryAdminTitleEllipsis">
                  <b className="inquiryMainTitle">{a.title}</b>
                </div>
                {a.answer_status === "PENDING" ? (
                  <div className="inquiryadminStatusWait">답변 대기</div>
                ) : (
                  <div className="inquiryadminStatusComplete">답변 완료</div>
                )}
                <b className="inquiryMainDate">
                  {/* {new Date(a.uploadDate).toISOString().split("T")[0]} */}
                  {a.uploadDate.substring(0, 10).replace("T", " ")}
                </b>
              </div>
              <hr className="inquiryhr2" />
            </div>
          ))
      ) : (
        <div className="inquiryNone">문의내역이 없습니다.</div>
      )}
    </>
  );
};

export default AdminInquiryList;
