import React, { useEffect, useState, useCallback } from "react";
import HeaderAdmin from "../Components/HeaderAdmin.js";
import Footer from "../Components/Footer.js";
import BgAdmin from "../Components/BgAdmin.js";
import "../Styles/AdminUserReport.css";
import axios from "axios";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import AdminUserReportBoard from "../Components/Admin/AdminUserReportBoard.js";
import AdminUserReportReview from "../Components/Admin/AdminUserReportReview.js";

const AdminUserReportBE = () => {
  let progressReportsData = 0;
  let completeReportsData = 0;
  const [reports, setReports] = useState([]);
  const [what, setWhat] = useState(0);
  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);
  const [selectedReport, setSelectedReport] = useState(null);

  const handleReportProcessing = (reportid) => {
    axios
      .post("/report/reportprogress", {
        id: reportid,
        processingStatus: "PROGRESS_COMPLETE",
      })
      .then((res) => {
        setSelectedReport(null);
        forceUpdate();
        window.location.reload();
      });
  };

  const [totalReports, setTotalReports] = useState(null);
  const [progressReports, setProgressReports] = useState(null);
  const [completeReports, setCompleteReports] = useState(null);

  const [reportSelect, setReportSelect] = useState("0"); // 0 : 게시판 , 1 : 리뷰

  useEffect(() => {
    axios
      .get("/report/boardreportlist", {
        params: { num: reportSelect },
      })
      .then((res) => {
        setReports(res.data);
        setTotalReports(res.data.length);

        res.data.map((data) => {
          if (data.processingStatus === "PROCEEDING") progressReportsData++;
          else if (data.processingStatus === "PROGRESS_COMPLETE")
            completeReportsData++;
        });
        setProgressReports(progressReportsData);
        setCompleteReports(completeReportsData);
      });
  }, [
    completeReportsData,
    progressReportsData,
    setSelectedReport,
    reportSelect,
  ]);

  return (
    <>
      {/* <BgAdmin />

      <main className="admin-main">
        <HeaderAdmin />
        <section className="admin-page"> */}
      <div className="report-container">
        <div className="userlist-title">
          <h4>신고 관리</h4>
        </div>
        {/* <div className="hr-line-container">
        <hr className="hr-line" />
      </div> */}
        <br />
        <div className="report-category">
          <div className="report-category-item">
            전체 신고 <span className="category-count">{totalReports}</span>
          </div>
          <div className="report-category-item">
            신고 대기 <span className="category-count">{progressReports}</span>
          </div>
          <div className="report-category-item">
            처리 완료 <span className="category-count">{completeReports}</span>
          </div>
        </div>
        <div className="separationArea" />
        <div className="userlist-title">
          <p>신고 리스트</p>
        </div>

        <div className="report-select-container">
          <Form.Select
            className="report-select"
            aria-label="Default select example"
            size="sm"
            onChange={(e) => {
              setReportSelect(e.target.value);
            }}
          >
            <option value="0">게시판</option>
            <option value="1">리뷰</option>
          </Form.Select>
        </div>
        {reportSelect === "0" ? (
          <AdminUserReportBoard
            reports={reports}
            setSelectedReport={setSelectedReport}
            selectedReport={selectedReport}
            handleReportProcessing={handleReportProcessing}
          />
        ) : (
          <AdminUserReportReview
            totalReports={totalReports}
            progressReports={progressReports}
            completeReports={completeReports}
            setReportSelect={setReportSelect}
            reports={reports}
            setSelectedReport={setSelectedReport}
            selectedReport={selectedReport}
            handleReportProcessing={handleReportProcessing}
            reportSelect={reportSelect}
          />
        )}
        {/* </section>
        <Footer />
      </main> */}
      </div>
    </>
  );
};

export default AdminUserReportBE;
