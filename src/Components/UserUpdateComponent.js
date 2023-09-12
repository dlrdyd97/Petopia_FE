import "../Styles/Login.css";
import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaAngleLeft } from "react-icons/fa";

const UserUpdateComponent = ({ setMyPageAction }) => {
  const name = useRef("");
  const nickname = useRef("");
  const password1 = useRef("");
  const password2 = useRef("");

  const [currentName, setCurrentName] = useState("");
  const [currentNickname, setCurrentNickname] = useState("");

  const handleNameChange = (event) => {
    setCurrentName(event.target.value);
  };

  const handleNickNameChange = (event) => {
    setCurrentNickname(event.target.value);
  };

  const regCheck = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi;

  const navigate = useNavigate();

  const clickUserUpdate = (event) => {
    if (
      regCheck.test(name.current.value) ||
      regCheck.test(nickname.current.value)
    ) {
      alert("특수문자는 포함될 수 없습니다.");
    } else if (password1.current.value !== password2.current.value) {
      alert("비밀번호가 일치하지 않습니다.");
    } else {
      updateUserInfo();
    }
  };

  useEffect(() => {
    selectUserInfo();
  }, []);

  const selectUserInfo = () => {
    axios
      .post("/user/getuserinfo", {
        email: sessionStorage.getItem("email"),
      })
      .then((res) => {
        if (res.data === null || res.data === undefined || res.data === "") {
          alert("가입되지 않은 회원입니다.");
        } else if (res.data.provider !== "petopia") {
          alert("펫토피아 계정이 아닙니다.");
          setCurrentName(res.data.name);
          setCurrentNickname(res.data.nickname);
        } else {
          setCurrentName(res.data.name);
          setCurrentNickname(res.data.nickname);
        }
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const updateUserInfo = () => {
    axios
      .post("/user/updateuserinfo", {
        email: sessionStorage.getItem("email"),
        name: currentName,
        nickname: currentNickname,
        password: password1.current.value,
      })
      .then((res) => {
        alert("회원 정보를 수정하였습니다. \n다시 로그인 해주세요.");
        removeSessionStorage().then(() => {
          window.location.href = `http://localhost:3000/login`;
        });
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const removeSessionStorage = async () => {
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("socialSession");
    localStorage.removeItem("com.naver.nid.access_token");
    localStorage.removeItem("access_token");
  };

  const clickUserDelete = () => {
    const deleteConfirm = window.confirm("회원 탈퇴 하시겠습니까?");
    if (deleteConfirm) {
      axios
        .post("/user/withdrawal", {
          email: sessionStorage.getItem("email"),
        })
        .then((res) => {
          localStorage.removeItem("com.naver.nid.access_token");
          localStorage.removeItem("access_token");
          sessionStorage.removeItem("email");
          sessionStorage.removeItem("socialSession");
          alert("계정을 탈퇴처리 하였습니다.");
          window.location.href = `http://localhost:3000/`;
        });
    }
  };

  return (
    <>
      <div className="inquiryHeader">
        <div
          className="inquiryBack-left"
          onClick={() => {
            setMyPageAction(0);
          }}
        >
          <FaAngleLeft className="inquiryBack-icon" />
        </div>
        <h4>회원정보 수정</h4>
      </div>
      <div className="container loginComponent">
        <div className="input-form-backgroud row">
          <div className="input-form col-md-12 mx-auto signUpForm">
            <h4 className="mb-3 signUpText">회원 정보 수정</h4>
            <form
              className="validation-form is-invalid"
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
                    value={currentName}
                    onChange={handleNameChange}
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
                    value={currentNickname}
                    onChange={handleNickNameChange}
                  />
                  <div className="invalid-feedback">닉네임을 입력해주세요.</div>
                </div>
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

              <br />
              <div className="mb-4 signUpBtnDiv">
                <button
                  className="btn btn-primary btn-sm btn-block signUpBtn findBtn"
                  type="submit"
                  onClick={() => {
                    clickUserUpdate();
                  }}
                >
                  수정
                </button>
              </div>
            </form>
          </div>
        </div>

        <div
          className="withdrawal"
          style={{ margin: "40px 0 0 130px", textAlign: "right" }}
        >
          <span onClick={() => clickUserDelete()}>회원 탈퇴</span>
        </div>
      </div>
    </>
  );
};

export default UserUpdateComponent;
