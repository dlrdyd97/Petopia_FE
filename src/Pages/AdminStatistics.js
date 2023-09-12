import React from "react";
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import HeaderAdmin from "../Components/HeaderAdmin.js";
import Footer from "../Components/Footer.js";
import BgAdmin from "../Components/BgAdmin.js";
import "../Styles/AdminStatistics.css";

const AdminStatistics = () => {
  const data = [
    { name: "1월", view: 12, register: 10 },
    { name: "2월", view: 19, register: 8 },
    { name: "3월", view: 13, register: 15 },
    { name: "4월", view: 15, register: 5 },
    { name: "5월", view: 20, register: 12 },
  ];

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <>
      {/* <BgAdmin />

      <main className="admin-main">
        <HeaderAdmin />
        <section className="admin-page"> */}
      <div className="admin-statistics-container">
        <div className="statistics-title">
          <h3>Petopia 월간 통계</h3>
        </div>
        <hr className="hr-line" />
        <div className="statistics-container">
          <div className="statistics-item">
            <BarChart
              width={730}
              height={250}
              data={data}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="view" fill="#8884d8" />
              <Bar dataKey="register" fill="#82ca9d" />
            </BarChart>
          </div>
        </div>
      </div>
      {/* </section>

        <Footer />
      </main> */}
    </>
  );
};

export default AdminStatistics;
