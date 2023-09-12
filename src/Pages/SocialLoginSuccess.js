import React from "react";
import { useEffect, useState } from "react";
import Header from "../Components/Header.js";
import Footer from "../Components/Footer.js";
import BgLeft from "../Components/BgLeft.js";
import { Link, useNavigate } from "react-router-dom";
import "../Styles/Login.css";
import axios from "axios";

const SocialLoginSuccess = ({ user, setUser }) => {
  const navigate = useNavigate();

  const [viewMode, setViewMode] = useState(0);

  useEffect(() => {
    signUpCheck();
  }, [user]);

  const signUpCheck = () => {
    axios
      .post("/user/getuserinfo", {
        email: user.email,
        //provider: "naver",
      })
      .then((res) => {
        if (res.data === null || res.data === undefined || res.data === "") {
          setViewMode(1);
        } else if (res.data.provider === "naver") {
          sessionStorage.setItem("email", user.email);
          sessionStorage.setItem("socialSession", "naver");
          navigate("/");
        } else {
          alert(
            "이미 존재하는 이메일 입니다. \n펫토피아 계정 혹은 다른 소셜 계정과 중복되지 않는지 확인해 주세요. \n다시 로그인 하려면 네이버 로그아웃이 필요합니다."
          );
          localStorage.removeItem("com.naver.nid.access_token");
          localStorage.removeItem("access_token");
          sessionStorage.removeItem("email");
          sessionStorage.removeItem("socialSession");
          window.location.href = `http://localhost:3000/`;
        }
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const signUpNaver = () => {
    axios
      .post("/user/signupnaver", {
        email: user.email,
        provider: "naver",
        password: "",
        name: user.name,
        nickname: user.nickname,
        profileImage: user.profile_image,
      })
      .then((res) => {
        alert("네이버 간편 회원가입을 환영합니다.");
        sessionStorage.setItem("email", user.email);
        sessionStorage.setItem("socialSession", "naver");
        navigate("/");
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const clickSignUpNaver = () => {
    if (isChecked) {
      signUpNaver();
    } else if (!isChecked) {
      alert("개인정보 수집및 이용에 동의해 주세요.");
    }
  };

  const [isChecked, setIsChecked] = useState(false);
  const [isCheckedText, setIsCheckedText] = useState("false");
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    if (isChecked) {
      setIsCheckedText("true");
    } else if (!isChecked) {
      setIsCheckedText("false");
    }
  };

  return (
    <>
      <BgLeft />

      <main className="RouteTripSection">
        <Header />
        <section>
          {viewMode === 1 ? (
            <>
              <div className="container loginComponent">
                <div className="input-form-backgroud row">
                  <div className="input-form col-md-12 mx-auto signUpForm">
                    <h4 className="mb-3 signUpText">
                      <span style={{ color: "#2DB400" }}>네이버</span> 간편
                      회원가입
                    </h4>

                    <div className="socialLoginSuccessDiv">
                      <table className="socialLoginSuccessTable">
                        <tr className="socialLoginSuccessTr socialLoginSuccessTrProfile">
                          <td className="socialLoginSuccessTdTitle">프로필</td>
                          <td className="socialLoginSuccessTd socialLoginSuccessTdProfile">
                            {user && user.profile_image ? (
                              <img
                                src={user.profile_image}
                                alt=""
                                className="socialLoginSuccessTdProfileImg"
                              />
                            ) : null}
                          </td>
                        </tr>
                        <tr className="socialLoginSuccessTr">
                          <td className="socialLoginSuccessTdTitle">이메일</td>
                          <td className="socialLoginSuccessTd">
                            {user && user.email ? <p>{user.email}</p> : null}
                          </td>
                        </tr>
                        <tr className="socialLoginSuccessTr">
                          <td className="socialLoginSuccessTdTitle">이름</td>
                          <td className="socialLoginSuccessTd">
                            {user && user.name ? <p>{user.name}</p> : null}
                          </td>
                        </tr>
                        <tr className="socialLoginSuccessTr">
                          <td className="socialLoginSuccessTdTitle">닉네임</td>
                          <td className="socialLoginSuccessTd">
                            {user && user.nickname ? (
                              <p>{user.nickname}</p>
                            ) : null}
                          </td>
                        </tr>
                      </table>
                    </div>

                    <div className="custom-control custom-checkbox signupCheckAgreeDiv socialLoginSuccessAgreeDiv">
                      <input
                        type="checkbox"
                        className="custom-control-input signupCheckAgreeBox"
                        id="aggrement"
                        required
                        checked={isChecked}
                        onChange={handleCheckboxChange}
                      />
                      <label
                        className="custom-control-label"
                        htmlFor="aggrement"
                      >
                        &nbsp;&nbsp;개인정보 수집 및 이용에 동의합니다.
                      </label>
                    </div>

                    <br />

                    <form className="validation-form" onSubmit={() => {}}>
                      <div className="findidpwsignupDiv">
                        <Link
                          to="/findaccountemail"
                          style={{ textDecoration: "none" }}
                        >
                          <p className="p_idpw">이메일 찾기 </p>
                        </Link>
                        |
                        <Link
                          to="/findaccountpassword"
                          style={{ textDecoration: "none" }}
                        >
                          <p className="p_idpw"> 비밀번호 찾기 </p>
                        </Link>
                        |
                        <Link to="/login" style={{ textDecoration: "none" }}>
                          <p className="p_idpw"> 로그인</p>
                        </Link>
                      </div>

                      <br />

                      <div className="mb-4 signUpBtnDiv">
                        <button
                          className="btn btn-outline-primary btn-sm btn-block signUpBtn"
                          type="button"
                          onClick={() => clickSignUpNaver()}
                        >
                          회원가입
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </>
          ) : null}
        </section>
        <Footer />
      </main>
    </>
  );
};

export default SocialLoginSuccess;
