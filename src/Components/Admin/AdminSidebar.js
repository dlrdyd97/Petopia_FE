import React, { useEffect, useState } from "react";
import { Navigation } from "react-minimal-side-navigation";
import "react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css";
import styled from "styled-components";
import { FaUser, FaFlag, FaInfoCircle, FaChartBar } from "react-icons/fa";
import { IoIosMenu, IoIosArrowBack } from "react-icons/io";
import AdminInquiry from "./AdminInquiry";
import AdminUserList from "../../Pages/AdminUserList";
import AdminStatistics from "../../Pages/AdminStatistics";
import AdminUserReportBE from "../../Pages/AdminUserReportBE";
import "../../Styles/AdminSide.css";

const AdmimSlideContainer = styled.div`
  display: flex;
  position: relative;
`;

const AdminSide = styled.div`
  width: ${({ expanded }) => (expanded ? "240px" : "0px")};
  transition: width 0.3s ease;
  overflow: hidden;
  // background-color: #f5f5f5;
  border-right: ${({ expanded }) => (expanded ? "1px solid #ccc" : "none")};
  height: ${({ expanded }) => (expanded ? "auto" : "auto")};
  white-space: nowrap;
`;

const AdminContent = styled.div`
  flex: 1;
  overflow: auto; /* 스크롤 가능하도록 설정 */
`;

const AdminToggleButton = styled.button`
  position: absolute;
  top: ${({ expanded }) => (expanded ? "13px" : "0px")};
  left: ${({ expanded }) => (expanded ? "203px" : "0px")};
  transition: left 0.3s ease;
  width: ${({ expanded }) => (expanded ? "30px" : "40px")};
  height: ${({ expanded }) => (expanded ? "30px" : "40px")};
  border: ${({ expanded }) => (expanded ? "none" : "3px solid #bdbdbd")};
  border-radius: 7px;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    opacity: 0.5;
  }
`;

const ArrowBackIcon = styled(IoIosArrowBack)`
  color: #a4a4a4; /* 아이콘 색상 설정 */
  font-size: 20px; /* 아이콘 크기 설정 */
`;

const MenuIcon = styled(IoIosMenu)`
  color: #a4a4a4; /* 아이콘 색상 설정 */
  font-size: 30px; /* 아이콘 크기 설정 */
`;

const AdminSidebar = () => {
  const [expanded, setExpanded] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("/management");

  const handleToggle = () => {
    setExpanded(!expanded);
  };

  const handleSelectCategory = (itemId) => {
    setSelectedCategory(itemId);
  };

  let content;
  if (selectedCategory === "/management") {
    content = (
      <>
        <AdminUserList />
      </>
    );
  } else if (selectedCategory === "/report") {
    content = (
      <>
        <AdminUserReportBE />
      </>
    );
  } else if (selectedCategory === "/inquiry") {
    content = (
      <>
        <AdminInquiry />
      </>
    );
  } else if (selectedCategory === "/statistics") {
    content = (
      <>
        <AdminStatistics />
      </>
    );
  }

  return (
    <>
      <AdmimSlideContainer>
        <AdminSide expanded={expanded}>
          <div className="admin-side-header">관리자님 환영합니다</div>
          <hr className="admin-side-hr" />
          <Navigation
            // you can use your own router's api to get pathname
            activeItemId={selectedCategory}
            onSelect={({ itemId }) => {
              handleSelectCategory(itemId);
              // maybe push to the route
            }}
            items={[
              {
                title: "회원 관리",
                itemId: "/management",
                // elemBefore: () => <Icon name="users" />,
                elemBefore: () => (
                  <>
                    <div className="user-section-icon-side">
                      <FaUser className="user-info-icon" />
                    </div>
                  </>
                ),
              },
              {
                title: "신고 관리",
                itemId: "/report",
                elemBefore: () => (
                  <div className="user-section-icon-side">
                    <FaFlag className="user-info-icon" />
                  </div>
                ),
              },
              {
                title: "문의 관리",
                itemId: "/inquiry",
                elemBefore: () => (
                  <div className="user-section-icon-side">
                    <FaInfoCircle className="user-info-icon" />
                  </div>
                ),
              },
              {
                title: "통계",
                itemId: "/statistics",
                elemBefore: () => (
                  <div className="user-section-icon-side">
                    <FaChartBar className="user-info-icon" />
                  </div>
                ),
              },
            ]}
          />
        </AdminSide>
        <AdminContent>{content}</AdminContent>
        <AdminToggleButton expanded={expanded} onClick={handleToggle}>
          {expanded ? <ArrowBackIcon /> : <MenuIcon />}
        </AdminToggleButton>
      </AdmimSlideContainer>
    </>
  );
};

export default AdminSidebar;
