import React, { useEffect, useState } from "react";
import HeaderAdmin from "../Components/HeaderAdmin.js";
import Footer from "../Components/Footer.js";
import BgAdmin from "../Components/BgAdmin.js";
import "../Styles/AdminUserReport.css";
import axios from "axios";

const AdminUserReport = () => {
  const [reports, setReports] = useState([
    {
      id: 1,
      title: "@쿠팡 할인 이벤트@",
      content: "쿠팡 파트너스 할인 이벤트입니다",
      writer: "작성자1",
      status: "대기 중",
      createDate: "2022-05-09",
      reason: "광고성, 도배, 허위정보",
    },
    {
      id: 2,
      title: "허위 리뷰 작성",
      content: "타인의 리뷰 사진 도용한 게시글",
      writer: "작성자2",
      status: "완료",
      createDate: "2022-05-08",
      reason: "광고성, 도배, 허위정보",
    },
    {
      id: 3,
      title: "욕설 게시글",
      status: "대기 중",
      writer: "작성자3",
      content: "부적절한 욕설 포함 글 작성",
      createDate: "2022-05-07",
      reason: "선정성, 정치관련, 혐오감",
    },
    {
      id: 4,
      title: "혐오 게시글",
      status: "대기 중",
      writer: "작성자4",
      content: "혐오스런 사진을 포함한 글",
      createDate: "2022-05-07",
      reason: "선정성, 정치관련, 혐오감",
    },
    {
      id: 5,
      title: "저작권 침해글",
      status: "완료",
      writer: "작성자5",
      content: "타인 게시글 도용",
      createDate: "2022-05-08",
      reason: "저작권 침해",
    },
    {
      id: 6,
      title: "허위 리뷰 작성",
      status: "완료",
      writer: "작성자6",
      content: "허위 과장 리뷰 작성",
      createDate: "2022-05-08",
      reason: "광고성, 도배, 허위정보",
    },
    {
      id: 7,
      title: "허위 리뷰 작성",
      status: "완료",
      writer: "작성자7",
      content: "허위 과장 리뷰 작성",
      createDate: "2022-05-08",
      reason: "광고성, 도배, 허위정보",
    },
    {
      id: 8,
      title: "허위 리뷰 작성",
      status: "완료",
      writer: "작성자8",
      content: "허위 과장 리뷰 작성",
      createDate: "2022-05-08",
      reason: "광고성, 도배, 허위정보",
    },
    {
      id: 9,
      title: "허위 리뷰 작성",
      status: "완료",
      writer: "작성자9",
      content: "허위 과장 리뷰 작성",
      createDate: "2022-05-08",
      reason: "광고성, 도배, 허위정보",
    },
    {
      id: 10,
      title: "허위 리뷰 작성",
      status: "완료",
      writer: "작성자10",
      content: "허위 과장 리뷰 작성",
      createDate: "2022-05-08",
      reason: "광고성, 도배, 허위정보",
    },
  ]);

  const [selectedReport, setSelectedReport] = useState(null);

  const handleReportProcessing = () => {
    if (selectedReport) {
      // 신고가 선택 시 reports 배열에서 해당 신고의 인덱스 찾기
      const reportIndex = reports.findIndex(
        (report) => report.id === selectedReport.id
      );

      if (reportIndex !== -1) {
        // 신고 내용 변경
        const updatedReports = [...reports];
        updatedReports[reportIndex] = {
          ...selectedReport,
          status: "완료",
          content: "신고 처리된 게시글입니다",
          title: `신고처리된 게시글 [${selectedReport.title}]`,
        };

        setReports(updatedReports);
      }

      setSelectedReport(null);
    }
  };

  return (
    <>
      <BgAdmin />

      <main className="admin-main">
        <HeaderAdmin />
        <section className="admin-page">
          <div className="userlist-title">
            <h3>신고 관리</h3>
          </div>
          <div className="hr-line-container">
            <hr className="hr-line" />
          </div>
          <div className="report-category">
            <div className="report-category-item">
              전체 신고 <span className="category-count">10</span>
            </div>
            <div className="report-category-item">
              신고 대기 <span className="category-count">3</span>
            </div>
            <div className="report-category-item">
              처리 완료 <span className="category-count">7</span>
            </div>
          </div>
          <div className="separationArea" />
          <div className="userlist-title">
            <p>신고 리스트</p>
          </div>
          <div className="report-table-container">
            <table className="admin-user-report-table">
              <thead className="admin-table-title">
                <tr>
                  <th className="admin-user-report-item-title">제목</th>
                  <th className="admin-user-report-item-date">작성자</th>
                  <th className="admin-user-report-item-date">날짜</th>
                  <th className="admin-user-report-item-date">진행</th>
                </tr>
              </thead>
              <tbody>
                {reports.length !== 0 ? (
                  reports.map((report) => (
                    <tr
                      key={report.id}
                      onClick={() => {
                        setSelectedReport(report);
                      }}
                      className="admin-user-report-row"
                    >
                      <td
                        className="admin-user-report-item-title"
                        onClick={() => {
                          console.log(`Report ${report.id} clicked`);
                        }}
                      >
                        {report.title}
                      </td>
                      <td className="admin-user-report-item-date">
                        {report.writer}
                      </td>
                      <td className="admin-user-report-item-date">
                        {report.createDate}
                      </td>
                      <td className="admin-user-report-item-date">
                        <div
                          className={`admin-user-report-item-status ${
                            report.status === "대기 중"
                              ? "admin-user-report-item-status-processing"
                              : ""
                          }`}
                        >
                          {report.status}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="admin-user-report-none">
                      신고 내역이 없습니다.
                    </td>
                  </tr>
                )}
              </tbody>
              {selectedReport && (
                <div className="modal-wrapper">
                  <div className="modal-content admin-user-report-modal">
                    <div className="modal-header">
                      <h2>신고 정보</h2>
                    </div>
                    <div className="modal-body">
                      {selectedReport.status === "완료" ? (
                        <>
                          <b>처리완료</b>
                          <p>{selectedReport.reason}</p>
                          <br />
                          <div className="report-modal-board">
                            <div className="report-tilte">
                              <b>게시글 제목</b>
                            </div>
                            {selectedReport.title}

                            <div className="report-tilte">
                              <br />
                              <b>게시글 내용</b>
                            </div>
                            {selectedReport.content}
                          </div>
                        </>
                      ) : (
                        <>
                          <b>대기 중</b>
                          <p>{selectedReport.reason}</p>

                          <div className="report-modal-board">
                            <div className="report-tilte">
                              <b>게시글 제목</b>
                            </div>
                            {selectedReport.title}

                            <div className="report-tilte">
                              <br />
                              <b>게시글 내용</b>
                            </div>
                            {selectedReport.content}
                          </div>
                        </>
                      )}
                    </div>
                    <div className="modal-footer">
                      {selectedReport.status === "완료" ? (
                        <>
                          <button onClick={() => setSelectedReport(null)}>
                            취소
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={handleReportProcessing}
                            style={{ backgroundColor: "red", color: "white" }}
                          >
                            신고 처리
                          </button>
                          <button onClick={() => setSelectedReport(null)}>
                            취소
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </table>
          </div>
        </section>
        <Footer />
      </main>
    </>
  );
};

export default AdminUserReport;
