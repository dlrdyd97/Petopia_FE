import React from "react";
import { useEffect } from "react";
import axios from "axios";
import qs from "qs";
import { useNavigate } from "react-router-dom";

const CallBack = () => {
  const Rest_api_key = `${process.env.REACT_APP_RESTAPI_KAKAO_APP_KEY}`; //REST API KEY
  const redirect_uri = "http://localhost:3000/kakaologin"; //Redirect URI
  const CLIENT_SECRET = `${process.env.REACT_APP_CLIENT_SECRET}`;

  const navigate = useNavigate();

  // calllback으로 받은 인가코드
  const code = new URL(window.location.href).searchParams.get("code");

  const getToken = async () => {
    const payload = qs.stringify({
      grant_type: "authorization_code",
      client_id: Rest_api_key,
      redirect_uri: redirect_uri,
      code: code,
      client_secret: CLIENT_SECRET,
    });
    try {
      // access token 가져오기
      const res = await axios.post(
        "https://kauth.kakao.com/oauth/token",
        payload
      );

      // window.Kakao.init(Rest_api_key);
      // window.Kakao.isInitialized();
      // window.Kakao.Auth.logout(function (response) {
      //   if (response === true) {
      //     sessionStorage.clear(); // 세션 제거
      //     localStorage.clear(); // 로컬스토리지 제거
      //   }
      // });
      // //localStorage.removeItem("access_token");
      sessionStorage.removeItem("socialSession");
      sessionStorage.removeItem("email");

      // Kakao Javascript SDK 초기화
      window.Kakao.init(Rest_api_key);
      // access token 설정
      window.Kakao.Auth.setAccessToken(res.data.access_token);
      navigate("/SocialLoginSuccessKakao");
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getToken();
  }, []);

  return <></>;
};
export default CallBack;
