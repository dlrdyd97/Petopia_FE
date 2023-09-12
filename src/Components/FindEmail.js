import axios from "axios";
import "../Styles/Login.css";
import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";

const FindEmail = () => {
  const name = useRef("");
  const birthday = useRef("");
  const password1 = useRef("");
  const [mode, setMode] = useState(0);

  const [finduseremail, setFinduseremail] = useState([]);

  useEffect(() => {}, [finduseremail, setFinduseremail]);

  const findEmail = (event) => {
    event.preventDefault();
    setMode(1);
  };

  const clickFindEmail = () => {
    axios
      .post("/user/findemail", {
        name: name.current.value,
        password: password1.current.value,
        birthday: birthday.current.value,
      })
      .then((res) => {
        if (res.data === null || res.data === undefined || res.data === "") {
          alert("입력하신 정보로 찾을 수 있는 펫토피아 계정이 없습니다.");
          window.location.href = `http://localhost:3000/findemail`;
        } else {
          setFinduseremail(res.data.map((user) => user.email));
          setMode(1);
        }
      })
      .catch((e) => {
        console.error(e);
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

  const renderView = () => {
    if (mode === 0) {
      return (
        <>
          <div className="">
            <form
              className="validation-form "
              id="submitForm"
              onSubmit={(event) => findEmail(event)}
            >
              <div className="onlyPetopiaAccount">
                펫토피아 계정만 가능합니다.
              </div>
              <div className="signUpRow">
                <div className="col-md-6 mb-3 signUpName">
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
              </div>

              <div className="mb-3 signUpRow">
                <label htmlFor="password"></label>
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
                <label htmlFor="address"></label>
                <input
                  type="date"
                  className="form-control signUpFormInput signUpFormInputDate"
                  id="birth"
                  name="email"
                  placeholder="생년월일"
                  data-placeholder="생년월일"
                  ref={birthday}
                  required
                />
                <div className="invalid-feedback">생년월일을 입력해주세요.</div>
              </div>

              <div className="p_find">
                <Link
                  to="/findaccountpassword"
                  style={{ textDecoration: "none" }}
                >
                  <p className="p_idpw">비밀번호 찾기</p>
                </Link>
              </div>
              <br />
              <div className="mb-4 signUpBtnDiv">
                <button
                  className="btn btn-primary btn-sm btn-block signUpBtn findBtn"
                  type="submit"
                  onClick={() => clickFindEmail()}
                >
                  찾기
                </button>
              </div>
            </form>
          </div>
        </>
      );
    } else if (mode === 1) {
      /* mode 1  --------------------------------------------------------------------*/
      return (
        <>
          <div>
            <p className="findEmailP">
              {finduseremail.map((email, index) => (
                <p key={index}>{email.replace(/(...)@/, "***@")}</p>
              ))}
            </p>
          </div>

          <div className="findPwDiv">
            <Link to="/findaccountpassword" style={{ textDecoration: "none" }}>
              <p className="p_idpw">비밀번호 찾기</p>
            </Link>
          </div>
        </>
      );
    }
  };

  return (
    <>
      <div className="container loginComponent">
        <div className="input-form-backgroud row">
          <div className="input-form col-md-12 mx-auto signUpForm">
            <h4 className="mb-3 signUpText">이메일 찾기</h4>
            {renderView()}
          </div>
        </div>
      </div>
    </>
  );
};

export default FindEmail;
