import React, { useState, useEffect } from "react";
import HeaderAdmin from "../Components/HeaderAdmin.js";
import Footer from "../Components/Footer.js";
import BgAdmin from "../Components/BgAdmin.js";
import "../Styles/AdminUserList.css";

const AdminUserList = () => {
  const [members, setMembers] = useState([
    {
      id: 1,
      name: "홍길동",
      email: "test1@gmail.com",
      joinDate: "2022-05-01",
      memo: "첫 번째 회원",
    },
    {
      id: 2,
      name: "김기자",
      email: "test2@gmail.com",
      joinDate: "2022-04-15",
      memo: "",
    },
    {
      id: 3,
      name: "블랙리스트",
      email: "black@gmail.com",
      joinDate: "2022-03-10",
      memo: "다수 신고받은 회원",
    },
  ]);

  const [selected, setSelected] = useState([]);

  //체크박스 삭제, 취소
  const handleCheckboxChange = (id) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((item) => item !== id));
    } else {
      setSelected([...selected, id]);
    }
  };

  const handleDeleteClick = () => {
    setMembers(members.filter((member) => !selected.includes(member.id)));
    setSelected([]);
  };

  const handleCancelClick = () => {
    setSelected([]);
  };

  return (
    <>
      {/* <BgAdmin />

      <main className="admin-main">
        <HeaderAdmin />
        <section className="admin-page"> */}
      <div className="userlist-container">
        <div className="userlist-title">
          <h4>회원 리스트</h4>
        </div>
        <div className="member-list-container">
          <table className="member-table">
            <thead className="admin-table-title">
              <tr>
                <th className="member-checkbox"></th>
                <th className="member-id">num</th>
                <th className="member-name">이름</th>
                <th className="member-email">이메일</th>
                <th className="member-join-date">가입일</th>
                <th className="member-memo">기타</th>
              </tr>
            </thead>
            <tbody>
              {members.map((member) => (
                <tr key={member.id} className="member-row">
                  <td className="member-checkbox">
                    <input
                      type="checkbox"
                      className="member-checkbox"
                      checked={selected.includes(member.id)}
                      onChange={() => handleCheckboxChange(member.id)}
                    />
                  </td>
                  <td className="member-id">{member.id}</td>
                  <td className="member-name">{member.name}</td>
                  <td className="member-email">{member.email}</td>
                  <td className="member-join-date">{member.joinDate}</td>
                  <td className="member-memo">
                    <textarea
                      className="member-memo-textarea"
                      value={member.memo}
                      onChange={(e) =>
                        setMembers(
                          members.map((m) =>
                            m.id === member.id
                              ? { ...m, memo: e.target.value }
                              : m
                          )
                        )
                      }
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="list-button">
          {selected.length > 0 && (
            <div className="member-list-actions">
              <button
                style={{ backgroundColor: "red" }}
                onClick={handleDeleteClick}
              >
                삭제
              </button>
              <button onClick={handleCancelClick}>취소</button>
            </div>
          )}
        </div>
        {/* </section>
        <Footer />
      </main> */}
      </div>
    </>
  );
};

export default AdminUserList;
