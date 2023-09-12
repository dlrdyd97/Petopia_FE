import { useEffect, useRef } from "react";
import "../../Styles/Login.css";

const NaverLogin = ({ setGetToken, user, setUser }) => {
  const { naver } = window;
  const NAVER_CLIENT_ID = `${process.env.REACT_APP_NAVER_CLIENT_ID}`; // Client ID
  const NAVER_CALLBACK_URL = `${process.env.REACT_APP_NAVER_CALLBACK_URL}`; // Callback URL

  const naverRef = useRef();

  useEffect(() => {}, [user]);

  const initializeNaverLogin = () => {
    const naverLogin = new naver.LoginWithNaverId({
      clientId: NAVER_CLIENT_ID,
      callbackUrl: NAVER_CALLBACK_URL,
      isPopup: false,
      // 버튼 타입 ( 색상, 타입, 크기 변경 가능 )
      loginButton: { color: "green", type: 3, width: 120, height: 30 },
      callbackHandle: true,
    });
    naverLogin.init();

    // 첫 연동시 정보 동의한 데이터만 추출 가능
    naverLogin.getLoginStatus(async function (status) {
      if (status) {
        const email = naverLogin.user.getEmail();
        const username = naverLogin.user.getName();
        const nickname = naverLogin.user.getNickName();
        const profile_image = naverLogin.user.getProfileImage();

        setUser({
          email: email,
          name: username,
          nickname: nickname,
          profile_image: profile_image,
        });
      }
    });
  };

  // const userAccessToken = () => {
  //   window.location.href.includes("access_token") && getToken();
  // };

  // const getToken = () => {
  //   const token = window.location.href.split("=")[1].split("&")[0];
  //   // alert("token: ", token);

  //   localStorage.setItem("access_token", token);
  //   setGetToken(token);
  // };

  useEffect(() => {
    initializeNaverLogin();
    // userAccessToken();
  }, []);

  const handleNaverLogin = () => {
    naverRef.current.children[0].click();
  };

  return (
    <>
      {/* id="naverIdLogin" 를 해주지 않으면 오류 발생 */}
      <div
        id="naverIdLogin"
        className="naverIdLoginImgDiv"
        ref={naverRef}
      ></div>
      <img
        className="socialLoginLogoLeft"
        src="img/naver.png"
        alt=""
        type="button"
        onClick={handleNaverLogin}
      />
    </>
  );
};

export default NaverLogin;
