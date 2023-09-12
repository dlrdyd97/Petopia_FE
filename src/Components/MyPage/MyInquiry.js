import React, { useEffect } from "react";
import MyInquiryMain from "./MyInquiryMain";
import MyInquiryWrite from "./MyInquiryWrite";
import MyInquiryDetail from "./MyInquiryDetail";
import { useState } from "react";
import MyInquiryUpdate from "./MyInquiryUpdate";
import axios from "axios";
import "../../Styles/MyInquiry.css";

const MyInquiry = ({ setMyPageAction, inquiryCount }) => {
  // 1:1 문의 페이지 액션 useState
  // 0 : 문의 리스트 , 1 : 문의 작성 , 2 : 문의 상세 내용 , 3 : 문의 수정
  const [inquiryAction, setInquiryAction] = useState(0);

  // 리스트로 받아온 문의 데이터의 분리를 위한 useState
  const [inquirydata, setInquirydata] = useState({});

  // DB로부터 받아온 데이터 저장 useState
  const [inquirydb, setInquirydb] = useState([]);

  useEffect(() => {
    // 페이지 렌더링시 1회만 문의 리스트 불러오기
    inquirydblist();
  }, []);

  const inquirydblist = () => {
    axios
      .get("/inquirylist", {
        params: {
          // session의 key(email)값의 value를 가져옴
          user: sessionStorage.getItem("email"),
        },
      })
      .then((res) => {
        const { data } = res;
        setInquirydb(data); // 문의 리스트들을 inquirydb 에 저장
      })
      .catch((e) => {
        console.error(e);
      });
  };

  return (
    <>
      {inquiryAction === 0 && ( // 문의 리스트
        <MyInquiryMain
          setInquiryAction={setInquiryAction}
          setInquirydata={setInquirydata}
          inquirydb={inquirydb}
          setMyPageAction={setMyPageAction}
        />
      )}
      {inquiryAction === 1 && ( // 문의 작성
        <MyInquiryWrite
          inquirydblist={inquirydblist}
          setInquiryAction={setInquiryAction}
          inquiryCount={inquiryCount}
        />
      )}
      {inquiryAction === 2 && ( // 문의 상세내용
        <MyInquiryDetail
          inquirydata={inquirydata}
          setInquiryAction={setInquiryAction}
          inquirydblist={inquirydblist}
          inquiryCount={inquiryCount}
        />
      )}
      {inquiryAction === 3 && ( // 문의내용 수정
        <MyInquiryUpdate
          inquirydata={inquirydata}
          setInquiryAction={setInquiryAction}
          inquirydblist={inquirydblist}
          setInquirydata={setInquirydata}
        />
      )}
    </>
  );
};

export default MyInquiry;
