import "../Styles/Login.css";
import { useRef, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import NaverLogin from "./SocialLogin/NaverLogin";
import axios from "axios";

const SignUpComponent = ({ user, setUser }) => {
  const name = useRef("");
  const nickname = useRef("");
  const email = useRef("");
  const birthday = useRef("");
  const password1 = useRef("");
  const password2 = useRef("");

  const regCheck = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi;

  const navigate = useNavigate();

  const checkCharacter = (event) => {
    if (
      regCheck.test(name.current.value) ||
      regCheck.test(nickname.current.value)
    ) {
      alert("특수문자는 포함될 수 없습니다.");
    } else if (password1.current.value !== password2.current.value) {
      alert("비밀번호가 일치하지 않습니다.");
      return false;
    } else if (
      email.current.value !== "" &&
      name.current.value !== "" &&
      nickname.current.value !== "" &&
      birthday.current.value !== "" &&
      password1.current.value !== "" &&
      password2.current.value !== "" &&
      emailRegTest === true
    ) {
      clickSignupBtn();
    }
  };

  const clickSignUpPetopia = (event) => {
    if (isChecked) {
      checkCharacter(event);
    } else if (!isChecked) {
      alert("개인정보 수집및 이용에 동의해 주세요.");
      return false;
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

  // 카카오 로그인
  const Rest_api_key = `${process.env.REACT_APP_RESTAPI_KAKAO_APP_KEY}`; //REST API KEY
  const redirect_uri = "http://localhost:3000/kakaologin"; //Redirect URI
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code&prompt=login`;

  const [getToken, setGetToken] = useState("");

  const clickSignupBtn = () => {
    axios
      .post("/user/getuserinfo", {
        email: email.current.value,
      })
      .then((res) => {
        if (res.data === null || res.data === undefined || res.data === "") {
          signUpPetopia();
        } else {
          alert(
            "이미 존재하는 이메일 입니다. 펫토피아 계정 혹은 다른 소셜 계정과 중복되지 않는지 확인해 주세요."
          );
        }
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const signUpPetopia = () => {
    axios
      .post("/user/signuppetopia", {
        email: email.current.value,
        name: name.current.value,
        nickname: nickname.current.value,
        provider: "petopia",
        birthday: birthday.current.value,
        password: password1.current.value,
        profileImage:
          "https://ssl.pstatic.net/static/pwe/address/img_profile.png",
      })
      .then((res) => {
        sessionStorage.setItem("email", email.current.value);
        sessionStorage.setItem("socialSession", "petopia");
        alert("펫토피아 회원가입을 환영합니다.");
        navigate("/");
      })
      .catch((e) => {
        console.error(e);
        alert("회원 가입 오류");
      });
  };

  useEffect(() => {
    let now_utc = Date.now() - 8 * 365 * 24 * 60 * 60000; // 지금 날짜를 밀리초로. 만 9세 이상 가입 가능
    // getTimezoneOffset()은 현재 시간과의 차이를 분 단위로 반환
    let timeOff = new Date().getTimezoneOffset() * 60000; // 분단위를 밀리초로 변환
    // new Date(now_utc-timeOff).toISOString()은 '2022-05-11T18:09:38.134Z'를 반환
    let today = new Date(now_utc - timeOff).toISOString().split("T")[0];
    document.getElementById("birth").setAttribute("max", today);
  }, []);

  // 이메일 형식 추가 검사
  const [emailRegTest, setEmailRegTest] = useState(false);

  const checkEmail = (e) => {
    var regExp =
      /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    // 형식에 맞는 경우 true 리턴
    if (regExp.test(e.target.value) === true) {
      setEmailRegTest(true);
    } else if (regExp.test(e.target.value) === false) {
      setEmailRegTest(false);
      alert("올바른 이메일 형식을 사용해 주세요. \n(example@petopia.com)");
    }
  };

  return (
    <>
      <div className="container loginComponent">
        <div className="input-form-backgroud row">
          <div className="input-form col-md-12 mx-auto signUpForm">
            <h4 className="mb-3 signUpText">회원가입</h4>

            <div>
              <NaverLogin setGetToken={setGetToken} setUser={setUser} />

              <Link to={kakaoURL}>
                <img
                  className="socialLoginLogoRight"
                  src="img/kakao.png"
                  alt=""
                  type="button"
                />
              </Link>
            </div>

            <br />
            <p className="p_or">- OR -</p>

            <form
              className="validation-form"
              id="submitForm"
              onSubmit={(event) => event.preventDefault()}
            >
              <div className="signUpRow">
                <div className="col-md-5 mb-3 signUpName">
                  {/* <Form.Text muted className="formText">
                    성명
                  </Form.Text> */}
                  <label htmlFor="name"></label>
                  <input
                    type="text"
                    className="form-control signUpFormInput"
                    id="name"
                    name="name"
                    ref={name}
                    placeholder="이름"
                    maxLength="10"
                    required
                  />
                  <div className="invalid-feedback">이름을 입력해주세요.</div>
                </div>
                <div className="col-md-6 mb-3 signUpNickname">
                  {/* <Form.Text muted className="formText">
                    닉네임
                  </Form.Text> */}
                  <label htmlFor="nickname"></label>
                  <input
                    type="text"
                    className="form-control signUpFormInput"
                    id="nickname"
                    name="nickname"
                    ref={nickname}
                    placeholder="닉네임"
                    maxLength="10"
                    required
                  />
                  <div className="invalid-feedback">닉네임을 입력해주세요.</div>
                </div>
              </div>

              <div className="mb-3 signUpRow">
                {/* <Form.Text muted className="formText">
                  이메일
                </Form.Text> */}
                <label htmlFor="email"></label>
                <input
                  type="email"
                  className="form-control signUpFormInput"
                  id="email"
                  name="email"
                  placeholder="이메일"
                  ref={email}
                  maxLength="40"
                  required
                  onBlur={checkEmail}
                />
                <div className="invalid-feedback">이메일을 입력해주세요.</div>
              </div>

              <div className="mb-3 signUpRow">
                {/* <Form.Text muted className="formText">
                  생년월일
                </Form.Text> */}
                <label htmlFor="birth"></label>
                <input
                  type="date"
                  className="form-control signUpFormInput signUpFormInputDate"
                  id="birth"
                  name="birth"
                  placeholder="서울특별시 강남구"
                  data-placeholder="생년월일"
                  ref={birthday}
                  required
                />
                <div className="invalid-feedback">생년월일을 입력해주세요.</div>
              </div>

              <div className="mb-3 signUpRow">
                {/* <Form.Text muted className="formText">
                  비밀번호
                </Form.Text> */}
                <label htmlFor="address"></label>
                <input
                  type="password"
                  className="form-control signUpFormInput"
                  id="password1"
                  name="password1"
                  placeholder="비밀번호"
                  ref={password1}
                  maxLength="20"
                  required
                />
                <div className="invalid-feedback">비밀번호를 입력해주세요.</div>
              </div>

              <div className="mb-3 signUpRow">
                {/* <Form.Text muted className="formText">
                  비밀번호 확인
                </Form.Text> */}
                <label htmlFor="password"></label>
                <input
                  type="password"
                  className="form-control signUpFormInput"
                  id="password2"
                  placeholder="비밀번호 확인"
                  name="password2"
                  ref={password2}
                  maxLength="20"
                  required
                />
                <div className="invalid-feedback">
                  비밀번호를 다시 한 번 입력해주세요.
                </div>
              </div>
              {/* <hr class="mb-4" /> */}
              <div className="custom-control custom-checkbox signupCheckAgreeDiv">
                <input
                  type="checkbox"
                  className="custom-control-input signupCheckAgreeBox"
                  id="aggrement"
                  required
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                />
                <label className="custom-control-label" htmlFor="aggrement">
                  &nbsp;&nbsp;개인정보 수집 및 이용에 동의합니다.
                </label>
              </div>
              <div className="findidpwsignupDiv">
                <Link to="/findaccountemail" style={{ textDecoration: "none" }}>
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
                  className="btn btn-primary btn-sm btn-block signUpBtn"
                  type="submit"
                  onClick={() => {
                    clickSignUpPetopia();
                  }}
                >
                  가입 완료
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUpComponent;
