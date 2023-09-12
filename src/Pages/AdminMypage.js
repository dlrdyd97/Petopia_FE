import React, { useState } from "react";
import HeaderAdmin from "../Components/HeaderAdmin.js";
import Footer from "../Components/Footer.js";
import BgAdmin from "../Components/BgAdmin.js";
import { NavLink, useNavigate } from "react-router-dom";
import "../Styles/Adminpage.css";
import {
  FaUser,
  FaFlag,
  FaInfoCircle,
  FaChartBar,
  FaCheck,
  FaTimes,
  FaAngleRight,
  FaEdit,
} from "react-icons/fa";
import AdminSidebar from "../Components/Admin/AdminSidebar.js";

const AdminMypage = () => {
  const [nickname, setNickname] = useState("관리자");
  const [editingNickname, setEditingNickname] = useState(false);
  const [tempNickname, setTempNickname] = useState("");
  const [imageSrc, setImageSrc] = useState(null); // 이미지 미리보기 URL
  const defaultProfileImage = "/img/Default_profile.png"; // 기본 이미지 파일명
  const handleNicknameChange = (event) => {
    setTempNickname(event.target.value);
  };

  const handleEditClick = () => {
    setTempNickname(nickname);
    setEditingNickname(true);
  };

  const handleConfirmClick = () => {
    setNickname(tempNickname);
    setEditingNickname(false);
  };

  const handleCancelClick = () => {
    setEditingNickname(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const navigate = useNavigate();

  return (
    <>
      <BgAdmin />
      <main className="admin-main">
        <HeaderAdmin />

        <section className="admin-page">
          <AdminSidebar />
          {/* <div className="user-mypage-area">
            <div className="admin-profile">
              <div className="profile-image">
                <label htmlFor="profile-image-upload">
                  <img
                    src={imageSrc || defaultProfileImage}
                    alt="프로필 이미지"
                    className="profile-image-preview"
                  />
                </label>
                <input
                  type="file"
                  id="profile-image-upload"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ display: "none" }}
                />
              </div>
              {editingNickname ? (
                <>
                  <input
                    type="text"
                    value={tempNickname}
                    onChange={handleNicknameChange}
                    className="user-nickname-edit"
                  />
                  <div className="edit-buttons">
                    <button className="edit-check" onClick={handleConfirmClick}>
                      <FaCheck className="edit-icon" />
                    </button>
                    <button className="edit-cancle" onClick={handleCancelClick}>
                      <FaTimes className="edit-icon" />
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="user-nickname">{nickname}</div>
                  <button
                    className="edit-nickname-button"
                    onClick={handleEditClick}
                  >
                    <FaEdit className="edit-icon" />
                  </button>
                </>
              )}
            </div>

            <div className="hr-line-container">
              <hr className="hr-line" />
            </div>

            <div className="user-category">
              <div className="category-item">
                관리자 글 <span className="category-count">3</span>
              </div>
              <div className="category-item">
                관리자 댓글 <span className="category-count">2</span>
              </div>
            </div>
          </div> */}
          {/* <div className="separationArea" />
          <div className="user-sections">
            <NavLink to="/adminuserlist" className="active-link">
              <div className="user-section">
                <div className="user-section-icon">
                  <FaUser className="user-info-icon" />
                </div>
                <div className="user-section-title">회원 관리</div>
                <div className="user-section-icon2">
                  <FaAngleRight className="user-info-icon2" />
                </div>
              </div>
            </NavLink>
            <NavLink to="/adminuserreport" className="active-link">
              <div className="user-section">
                <div className="user-section-icon">
                  <FaFlag className="user-info-icon" />
                </div>
                <div className="user-section-title">신고 관리</div>
                <div className="user-section-icon2">
                  <FaAngleRight className="user-info-icon2" />
                </div>
              </div>
            </NavLink>
            <NavLink to="/admininquiry" className="active-link">
              <div className="user-section">
                <div className="user-section-icon">
                  <FaInfoCircle className="user-info-icon" />
                </div>
                <div className="user-section-title">1:1 문의 관리</div>
                <div className="user-section-icon2">
                  <FaAngleRight className="user-info-icon2" />
                </div>
              </div>
            </NavLink>
            <NavLink to="/adminstatistics" className="active-link">
              <div className="user-section">
                <div className="user-section-icon">
                  <FaChartBar className="user-info-icon" />
                </div>
                <div className="user-section-title">통계</div>
                <div className="user-section-icon2">
                  <FaAngleRight className="user-info-icon2" />
                </div>
              </div>
            </NavLink>
          </div>
          <div className="separationArea" /> */}
          {/* <div className="user-mypage-area">
            <div class="button-wrapper">
              <div class="logout-button-wrapper">
                <button class="logout-button">로그아웃</button>
              </div>
            </div>
          </div> */}
        </section>
        <Footer />
      </main>
    </>
  );
};

export default AdminMypage;
