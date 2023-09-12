import React, { useState, useEffect } from "react";

import Header from "../Components/Header.js";
import Footer from "../Components/Footer.js";
import BgLeft from "../Components/BgLeft.js";

import { NavLink, useNavigate } from "react-router-dom";

import "../Styles/UserMypage.css";
import {
  FaUser,
  FaHeart,
  FaComment,
  FaEdit,
  FaCheck,
  FaTimes,
  FaAngleRight,
  FaQuestionCircle,
} from "react-icons/fa";

import MyInquiry from "../Components/MyPage/MyInquiry.js";
import axios from "axios";
import UserUpdateComponent from "../Components/UserUpdateComponent.js";
import LikeList from "../Components/UserBoardsLike/LikeList.js";
import MyReviewList from "../Components/MyPage/MyReviewList.js";

const UserMypage = () => {
  const [nickname, setNickname] = useState("사용자 닉네임");
  const [editingNickname, setEditingNickname] = useState(false);
  const [tempNickname, setTempNickname] = useState("");
  const [imageSrc, setImageSrc] = useState(null); // 이미지 미리보기 URL
  const defaultProfileImage = "/img/Default_profile.png"; // 기본 이미지 파일명
  const [postCount, setPostCount] = useState(0);
  const [userReviewCount, setUserReviewCount] = useState(0);
  const [userInquiryCount, setUserInquiryCount] = useState(0);
  const handleNicknameChange = (event) => {
    setTempNickname(event.target.value);
  };

  const handleEditClick = () => {
    setTempNickname(nickname);
    setEditingNickname(true);
  };

  const handleConfirmClick = () => {
    setNickname(tempNickname);
    changeNickname();
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

  // useEffect(() => {
  //   // 네이버 로그인 SDK 초기화
  //   window.naver && window.naver.login && window.naver.login.init();
  // }, []);

  // 카카오 rest api key
  const Rest_api_key = `${process.env.REACT_APP_RESTAPI_KAKAO_APP_KEY}`;

  const handleLogoutClick = () => {
    if (sessionStorage.getItem("socialSession") === "naver") {
      // 네이버 로그아웃
      localStorage.removeItem("com.naver.nid.access_token");
      localStorage.removeItem("access_token");
    } else if (sessionStorage.getItem("socialSession") === "kakao") {
      // 카카오 로그아웃
      // window.Kakao.init(Rest_api_key);
      // window.Kakao.isInitialized();
      // window.Kakao.Auth.logout(function (response) {
      //   if (response === true) {
      //     window.Kakao.Auth.setAccessToken(undefined); // 토큰 제거
      //     sessionStorage.clear(); // 세션 제거
      //     localStorage.clear(); // 로컬스토리지 제거
      //   }
      // });
      localStorage.removeItem("access_token");
    } else if (
      sessionStorage.getItem("email") === undefined ||
      sessionStorage.getItem("email") === "" ||
      sessionStorage.getItem("email") === null
    ) {
      alert("로그인이 필요합니다.");
    } else {
      alert("로그아웃 되었습니다.");
    }
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("socialSession");
    window.location.href = `http://localhost:3000/`;
  };
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState({});
  const signUpCheck = () => {
    if (
      sessionStorage.getItem("email") !== undefined &&
      sessionStorage.getItem("email") !== "" &&
      sessionStorage.getItem("email") !== null
    ) {
      axios
        .post("/user/getuserinfo", {
          email: sessionStorage.getItem("email"),
        })
        .then((res) => {
          if (res.data === null || res.data === undefined || res.data === "") {
            alert("로그인이 필요합니다.");

            navigate("/");
          } else {
            setUserInfo({
              profile: res.data.profileImage,
              nickname: res.data.nickname,
            });
            setNickname(res.data.nickname);
          }
        })
        .catch((e) => {
          console.error(e);
        });
    }
  };

  const changeNickname = () => {
    axios
      .post("/user/updatenickname", {
        email: sessionStorage.getItem("email"),
        nickname: tempNickname,
      })
      .then((res) => {})
      .catch((e) => {
        console.error(e);
      });
  };

  const changeProFileImg = (e) => {
    const formData = new FormData();
    formData.append("uploadfiles", e.target.files[0]);

    axios
      .post("/user/updateprofileimg", formData, {
        params: {
          email: sessionStorage.getItem("email"),
        },
      })
      .then((res) => {
        signUpCheck();
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const clickUserUpdate = () => {
    if (
      sessionStorage.getItem("email") === null ||
      sessionStorage.getItem("email") === "" ||
      sessionStorage.getItem("email") === undefined
    ) {
      alert("로그인이 필요합니다.");
    } else {
      // navigate("/userupdate");
      setMyPageAction(1);
    }
  };

  const myPostCount = () => {
    axios
      .get("/myPostCount", {
        params: { email: sessionStorage.getItem("email") },
      })
      .then((response) => {
        setPostCount(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const reviewCount = () => {
    axios
      .get("/mapReviewCount", {
        params: { email: sessionStorage.getItem("email") },
      })
      .then((response) => {
        setUserReviewCount(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const inquiryCount = () => {
    axios
      .get("/inquiryCount", {
        params: { email: sessionStorage.getItem("email") },
      })
      .then((response) => {
        setUserInquiryCount(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const [myPageAction, setMyPageAction] = useState(0); // 마이페이지 액션
  // [액션 1 : 회원정보 수정] , [액션 2 : 관심목록] , [액션 3 : 리뷰 관리] , [액션 4 : 1:1 문의]

  useEffect(() => {
    signUpCheck();
    setMyPageAction(0);
    myPostCount();
    reviewCount();
    inquiryCount();
  }, [nickname]);

  return (
    <>
      <BgLeft />

      <main>
        <Header />
        <section className="user-mypage">
          <div className="user-mypage-area">
            <div className="user-profile">
              <div className="profile-image">
                <label htmlFor="profile-image-upload">
                  <img
                    src={
                      userInfo.profile !== null &&
                      userInfo.profile !== "" &&
                      userInfo.profile !== undefined
                        ? userInfo.profile.includes("ssl.pstatic.net")
                          ? userInfo.profile
                          : userInfo.profile.includes("http://k.kakaocdn")
                          ? userInfo.profile
                          : process.env.PUBLIC_URL +
                            "/uploadimgs/" +
                            userInfo.profile
                        : null
                    }
                    alt="프로필 이미지"
                    className="profile-image-preview"
                  />
                </label>
                <input
                  type="file"
                  id="profile-image-upload"
                  accept="image/*"
                  onChange={changeProFileImg}
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
                  <div className="user-nickname">
                    {userInfo.nickname !== null &&
                    userInfo.nickname !== undefined &&
                    userInfo.nickname !== ""
                      ? userInfo.nickname
                      : "사용자 닉네임"}
                  </div>
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
                내 글 <span className="category-count">{postCount}</span>
              </div>
              <div className="category-item">
                내 리뷰
                <span className="category-count">{userReviewCount}</span>
              </div>
              <div className="category-item">
                내 문의
                <span className="category-count">{userInquiryCount}</span>
              </div>
            </div>
          </div>
          <div className="separationArea" />
          {myPageAction === 0 ? (
            <div className="user-sections">
              <div
                className="user-section"
                onClick={() => {
                  clickUserUpdate(); // [액션 1 : 회원정보 수정]
                }}
                style={{ cursor: "pointer" }}
              >
                <div className="user-section-icon">
                  <FaUser className="user-info-icon" />
                </div>
                <div className="user-section-title">회원정보 수정</div>
                <div className="user-section-icon2">
                  <FaAngleRight className="user-info-icon2" />
                </div>
              </div>
              {/* <NavLink to="/userWatchlist" className="active-link"> */}
              <div
                className="user-section"
                onClick={() => {
                  if (sessionStorage.getItem("email") != null) {
                    setMyPageAction(2); // [액션 2 : 관심목록]
                  } else {
                    navigate("/login");
                  }
                }}
              >
                <div className="user-section-icon">
                  <FaHeart className="user-info-icon" />
                </div>
                <div className="user-section-title">관심목록</div>
                <div className="user-section-icon2">
                  <FaAngleRight className="user-info-icon2" />
                </div>
              </div>
              {/* </NavLink> */}
              {/* <NavLink to="/myreview" className="active-link"> */}
              <div
                className="user-section"
                onClick={() => {
                  if (sessionStorage.getItem("email") != null) {
                    setMyPageAction(3); // [액션 3 : 리뷰 관리]
                  } else {
                    navigate("/login");
                  }
                }}
              >
                <div className="user-section-icon">
                  <FaComment className="user-info-icon" />
                </div>
                <div className="user-section-title">리뷰 관리</div>
                <div className="user-section-icon2">
                  <FaAngleRight className="user-info-icon2" />
                </div>
              </div>
              {/* </NavLink> */}
              {/* <NavLink to="/usermypageinquiry" className="active-link"> */}
              <div
                className="user-section"
                onClick={() => {
                  if (sessionStorage.getItem("email") != null) {
                    setMyPageAction(4); // [액션 4 : 1:1 문의]
                  } else {
                    navigate("/login");
                  }
                }}
              >
                <div className="user-section-icon">
                  <FaQuestionCircle className="user-info-icon" />
                </div>
                <div className="user-section-title">1:1 문의</div>
                <div className="user-section-icon2">
                  <FaAngleRight className="user-info-icon2" />
                </div>
              </div>
              {/* </NavLink> */}
              <div className="separationArea" />
            </div>
          ) : myPageAction === 1 ? ( // [액션 1 : 회원정보 수정]
            <>
              <UserUpdateComponent setMyPageAction={setMyPageAction} />
            </>
          ) : myPageAction === 2 ? ( // [액션 2 : 관심목록]
            <>
              <LikeList setMyPageAction={setMyPageAction} />
            </>
          ) : myPageAction === 3 ? ( // [액션 3 : 리뷰 관리]
            <MyReviewList
              setMyPageAction={setMyPageAction}
              reviewCount={reviewCount}
            />
          ) : myPageAction === 4 ? ( // [액션 4 : 1:1 문의]
            <>
              <MyInquiry
                setMyPageAction={setMyPageAction}
                inquiryCount={inquiryCount}
              />
            </>
          ) : null}

          <div className="user-mypage-area">
            {myPageAction === 0 ? (
              <div class="button-wrapper">
                <div class="logout-button-wrapper">
                  <button class="logout-button" onClick={handleLogoutClick}>
                    로그아웃
                  </button>
                </div>
                {sessionStorage.getItem("email") === "admin@admin.com" ? (
                  <div class="admin-button-wrapper">
                    <NavLink to="/adminmypage">
                      <button class="admin-button">관리자 페이지</button>
                    </NavLink>
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>
        </section>
        <Footer />
      </main>
    </>
  );
};

export default UserMypage;
