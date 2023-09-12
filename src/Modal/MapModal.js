import React, { useState } from "react";

const Modal1 = ({
  open,
  close,
  setCity,
  setCounty,
  setLocation,
  maplevel,
  setMaplevel,
}) => {
  const [view, setView] = useState(0); // 지역선택 useState , view=0 city_name 리스트 view=1 county_name 리스트
  const [citycheck1, setCitycheck1] = useState(""); // 지역선택 로직을 위한 ustState1
  const [citycheck2, setCitycheck2] = useState([]); // 지역선택 로직을 위한 ustState2

  // 각 county_name에 해당하는 county_name 목록
  const seoul = [
    // 서울
    { region: "강남구", lat: 37.5047, lng: 127.0485 },
    { region: "강동구", lat: 37.5371, lng: 127.1318 },
    { region: "강북구", lat: 37.6373, lng: 127.0243 },
    { region: "강서구", lat: 37.5612346, lng: 126.8228132 },
    { region: "관악구", lat: 37.4815, lng: 126.9528 },
    { region: "광진구", lat: 37.5467284, lng: 127.0857543 },
    { region: "구로구", lat: 37.4944134, lng: 126.8563336 },
    { region: "금천구", lat: 37.4605655, lng: 126.9008183 },
    { region: "노원구", lat: 37.6525076, lng: 127.075042 },
    { region: "도봉구", lat: 37.6691065, lng: 127.0323527 },
    { region: "동대문구", lat: 37.5819561, lng: 127.054846 },
    { region: "동작구", lat: 37.4988794, lng: 126.9516345 },
    { region: "마포구", lat: 37.5593115, lng: 126.9082589 },
    { region: "서대문구", lat: 37.5777796, lng: 126.9390623 },
    { region: "서초구", lat: 37.4929, lng: 127.0146 },
    { region: "성동구", lat: 37.5621, lng: 127.0377 },
    { region: "성북구", lat: 37.6036, lng: 127.0246 },
    { region: "송파구", lat: 37.5056205, lng: 127.1152992 },
    { region: "양천구", lat: 37.5247402, lng: 126.8553909 },
    { region: "영등포구", lat: 37.5223245, lng: 126.9101692 },
    { region: "은평구", lat: 37.6191784, lng: 126.9270142 },
    { region: "종로구", lat: 37.5729, lng: 127.0149 },
    { region: "중구", lat: 37.5601443, lng: 126.9959649 },
    { region: "중랑구", lat: 37.5978139, lng: 127.0928927 },
  ];

  const gyeonggi = [
    // 경기
    { region: "가평군", lat: 37.8314, lng: 127.5106 },
    { region: "고양시 덕양구", lat: 37.6351, lng: 126.8326 },
    { region: "고양시 일산동구", lat: 37.6717, lng: 126.7854 },
    { region: "고양시 일산서구", lat: 37.6833, lng: 126.7565 },
    { region: "과천시", lat: 37.4338294, lng: 127.0027656 },
    { region: "광명시", lat: 37.477, lng: 126.8653 },
    { region: "광주시", lat: 37.4134, lng: 127.2615 },
    { region: "구리시", lat: 37.5967, lng: 127.1336 },
    { region: "군포시", lat: 37.3604, lng: 126.9356 },
    { region: "김포시", lat: 37.6196, lng: 126.7202 },
    { region: "남양주시", lat: 37.6625097, lng: 127.2436632 },
    { region: "동두천시", lat: 37.9048, lng: 127.0597 },
    { region: "부천시", lat: 37.5042687, lng: 126.7886531 },
    { region: "성남시 분당구", lat: 37.3793356, lng: 127.1060411 },
    { region: "성남시 수정구", lat: 37.4497, lng: 127.1444 },
    { region: "성남시 중원구", lat: 37.4316, lng: 127.1364 },
    { region: "수원시 권선구", lat: 37.2605171, lng: 126.9797665 },
    { region: "수원시 영통구", lat: 37.2750488, lng: 127.0567165 },
    { region: "수원시 장안구", lat: 37.3140058, lng: 127.0034702 },
    { region: "수원시 팔달구", lat: 37.2774643, lng: 127.0162335 },
    { region: "시흥시", lat: 37.3806, lng: 126.8032 },
    { region: "안산시 단원구", lat: 37.3215, lng: 126.8197 },
    { region: "안산시 상록구", lat: 37.3159728, lng: 126.8707713 },
    { region: "안성시", lat: 37.0075, lng: 127.2794 },
    { region: "안양시 동안구", lat: 37.4003896, lng: 126.9554961 },
    { region: "안양시 만안구", lat: 37.4009, lng: 126.9191 },
    { region: "양주시", lat: 37.818, lng: 127.0685 },
    { region: "양평군", lat: 37.4923, lng: 127.4878 },
    { region: "여주시", lat: 37.2984, lng: 127.6362 },
    { region: "연천군", lat: 38.0256, lng: 127.0671 },
    { region: "오산시", lat: 37.1496, lng: 127.0752 },
    { region: "용인시 기흥구", lat: 37.2741, lng: 127.111 },
    { region: "용인시 수지구", lat: 37.3219, lng: 127.0943 },
    { region: "용인시 처인구", lat: 37.2345, lng: 127.2011 },
    { region: "의왕시", lat: 37.3498, lng: 126.9712 },
    { region: "의정부시", lat: 37.7388, lng: 127.0486 },
    { region: "이천시", lat: 37.278, lng: 127.4469 },
    { region: "파주시", lat: 37.7585, lng: 126.777 },
    { region: "평택시", lat: 36.9927, lng: 127.1118 },
    { region: "포천시", lat: 37.8953, lng: 127.2011 },
    { region: "하남시", lat: 37.5424, lng: 127.2133 },
    { region: "화성시", lat: 37.1995, lng: 127.0957 },
  ];

  const gangwondo = [
    // 강원도
    { region: "강릉시", lat: 37.7588, lng: 128.8863 },
    { region: "고성군", lat: 38.3817, lng: 128.4664 },
    { region: "동해시", lat: 37.5216, lng: 129.1126 },
    { region: "삼척시", lat: 37.4499796, lng: 129.1654335 },
    { region: "속초시", lat: 38.2012, lng: 128.5771 },
    { region: "양구군", lat: 38.1038, lng: 127.9923 },
    { region: "양양군", lat: 38.0756, lng: 128.6191 },
    { region: "영월군", lat: 37.1839, lng: 128.4618 },
    { region: "원주시", lat: 37.3412, lng: 127.9254 },
    { region: "인제군", lat: 38.0688048, lng: 128.263324 },
    { region: "정선군", lat: 37.3807, lng: 128.6608 },
    { region: "철원군", lat: 38.1477, lng: 127.3111 },
    { region: "춘천시", lat: 37.8897796, lng: 127.7398952 },
    { region: "태백시", lat: 37.1722939, lng: 128.9800161 },
    { region: "평창군", lat: 37.556735, lng: 128.4826261 },
    { region: "홍천군", lat: 37.6919, lng: 127.8887 },
    { region: "화천군", lat: 38.1383179, lng: 127.6849292 },
    { region: "횡성군", lat: 37.492, lng: 127.9862 },
  ];

  const chungbuk = [
    // 충북
    { region: "괴산군", lat: 36.8169, lng: 127.7857 },
    { region: "단양군", lat: 36.9848, lng: 128.3655 },
    { region: "보은군", lat: 36.4896, lng: 127.7288 },
    { region: "영동군", lat: 36.1754, lng: 127.7813 },
    { region: "옥천군", lat: 36.3061, lng: 127.5715 },
    { region: "음성군", lat: 36.9403, lng: 127.6903 },
    { region: "제천시", lat: 37.1369, lng: 128.2005 },
    { region: "증평군", lat: 36.7852, lng: 127.5815 },
    { region: "진천군", lat: 36.8548, lng: 127.4361 },
    { region: "청주시 상당구", lat: 36.6239, lng: 127.5004 },
    { region: "청주시 서원구", lat: 36.6378, lng: 127.4694 },
    { region: "청주시 청원구", lat: 36.6516, lng: 127.4861 },
    { region: "청주시 흥덕구", lat: 36.6421, lng: 127.4323 },
    { region: "충주시", lat: 36.9902, lng: 127.9264 },
  ];

  const chungnam = [
    // 충남
    { region: "계룡시", lat: 36.2745, lng: 127.2509 },
    { region: "공주시", lat: 36.4688, lng: 127.1293 },
    { region: "금산군", lat: 36.1088, lng: 127.4884 },
    { region: "논산시", lat: 36.2033, lng: 127.0877 },
    { region: "당진시", lat: 36.8897, lng: 126.6458 },
    { region: "보령시", lat: 36.3484, lng: 126.6043 },
    { region: "부여군", lat: 36.2759, lng: 126.9095 },
    { region: "서산시", lat: 36.7848, lng: 126.4499 },
    { region: "서천군", lat: 36.0803, lng: 126.6914 },
    { region: "아산시", lat: 36.7884, lng: 127.0008 },
    { region: "예산군", lat: 36.681, lng: 126.8453 },
    { region: "천안시 동남구", lat: 36.8071, lng: 127.1505 },
    { region: "천안시 서북구", lat: 36.8238, lng: 127.1259 },
    { region: "청양군", lat: 36.451, lng: 126.8023 },
    { region: "태안군", lat: 36.7498, lng: 126.3005 },
    { region: "홍성군", lat: 36.6014, lng: 126.6615 },
  ];

  const gyeongbuk = [
    // 경북
    { region: "경산시", lat: 35.8252, lng: 128.74 },
    { region: "경주시", lat: 35.8561, lng: 129.2251 },
    { region: "고령군", lat: 35.7269, lng: 128.2652 },
    { region: "구미시", lat: 36.1182, lng: 128.3444 },
    { region: "군위군", lat: 36.2409, lng: 128.571 },
    { region: "김천시", lat: 36.1399, lng: 128.1151 },
    { region: "문경시", lat: 36.5866, lng: 128.1874 },
    { region: "봉화군", lat: 36.8927, lng: 128.733 },
    { region: "상주시", lat: 36.4114, lng: 128.1593 },
    { region: "성주군", lat: 35.9191, lng: 128.2854 },
    { region: "안동시", lat: 36.568, lng: 128.73 },
    { region: "영덕군", lat: 36.4147, lng: 129.3664 },
    { region: "영양군", lat: 36.6662, lng: 129.1132 },
    { region: "영주시", lat: 36.8066, lng: 128.6237 },
    { region: "영천시", lat: 35.9729, lng: 128.9381 },
    { region: "예천군", lat: 36.648, lng: 128.4389 },
    { region: "울릉군", lat: 37.4845, lng: 130.9051 },
    { region: "울진군", lat: 36.9937, lng: 129.4018 },
    { region: "의성군", lat: 36.353, lng: 128.6978 },
    { region: "청도군", lat: 35.6474, lng: 128.7358 },
    { region: "칠곡군", lat: 35.9967, lng: 128.4017 },
    { region: "포항시 남구", lat: 35.9682, lng: 129.4103 },
    { region: "포항시 북구", lat: 36.0792, lng: 129.3803 },
  ];

  const gyeongnam = [
    // 경남
    { region: "거제시", lat: 34.8812, lng: 128.6225 },
    { region: "거창군", lat: 35.6872, lng: 127.9096 },
    { region: "고성군", lat: 34.9732, lng: 128.3224 },
    { region: "김해시", lat: 35.2288, lng: 128.8897 },
    { region: "남해군", lat: 34.8381, lng: 127.8929 },
    { region: "밀양시", lat: 35.5022, lng: 128.7467 },
    { region: "사천시", lat: 35.0786, lng: 128.0853 },
    { region: "산청군", lat: 35.4149, lng: 127.8748 },
    { region: "양산시", lat: 35.3378, lng: 129.0364 },
    { region: "의령군", lat: 35.3207, lng: 128.2619 },
    { region: "진주시", lat: 35.1801, lng: 128.109 },
    { region: "창녕군", lat: 35.5435, lng: 128.4922 },
    { region: "창원시 마산합포구", lat: 35.1966, lng: 128.5666 },
    { region: "창원시 마산회원구", lat: 35.2201, lng: 128.5797 },
    { region: "창원시 성산구", lat: 35.2017, lng: 128.7043 },
    { region: "창원시 의창구", lat: 35.2582, lng: 128.6232 },
    { region: "창원시 진해구", lat: 35.1348, lng: 128.7095 },
    { region: "통영시", lat: 34.8548, lng: 128.4334 },
    { region: "하동군", lat: 35.0677, lng: 127.75 },
    { region: "함안군", lat: 35.2736, lng: 128.4076 },
    { region: "함양군", lat: 35.52, lng: 127.7258 },
  ];

  const jeonbuk = [
    // 전북
    { region: "고창군", lat: 35.4353, lng: 126.702 },
    { region: "군산시", lat: 35.9698, lng: 126.7363 },
    { region: "김제시", lat: 35.8038, lng: 126.881 },
    { region: "남원시", lat: 35.4159, lng: 127.3912 },
    { region: "무주군", lat: 36.007, lng: 127.6615 },
    { region: "부안군", lat: 35.7316, lng: 126.7339 },
    { region: "순창군", lat: 35.3752, lng: 127.1377 },
    { region: "완주군", lat: 35.9015, lng: 127.1588 },
    { region: "익산시", lat: 35.9486, lng: 126.9575 },
    { region: "임실군", lat: 35.6168, lng: 127.2865 },
    { region: "장수군", lat: 35.648, lng: 127.5203 },
    { region: "전주시 덕진구", lat: 35.829, lng: 127.1341 },
    { region: "전주시 완산구", lat: 35.8125, lng: 127.1197 },
    { region: "정읍시", lat: 35.5693, lng: 126.8553 },
    { region: "진안군", lat: 35.7918, lng: 127.4249 },
  ];

  const jeonnam = [
    // 전남
    { region: "강진군", lat: 34.6417, lng: 126.7682 },
    { region: "고흥군", lat: 34.6047, lng: 127.2775 },
    { region: "곡성군", lat: 35.2816, lng: 127.2925 },
    { region: "광양시", lat: 34.9397, lng: 127.6964 },
    { region: "구례군", lat: 35.2034, lng: 127.4633 },
    { region: "나주시", lat: 35.0162, lng: 126.7121 },
    { region: "담양군", lat: 35.3214, lng: 126.9875 },
    { region: "목포시", lat: 34.8114, lng: 126.3934 },
    { region: "무안군", lat: 34.9906, lng: 126.4808 },
    { region: "보성군", lat: 34.7701, lng: 127.0807 },
    { region: "순천시", lat: 34.9487, lng: 127.4894 },
    { region: "신안군", lat: 34.834, lng: 126.3515 },
    { region: "여수시", lat: 34.7598, lng: 127.662 },
    { region: "영광군", lat: 35.2764, lng: 126.5121 },
    { region: "영암군", lat: 34.7999, lng: 126.6972 },
    { region: "완도군", lat: 34.3116, lng: 126.7556 },
    { region: "장성군", lat: 35.3022, lng: 126.7839 },
    { region: "장흥군", lat: 34.681, lng: 126.9095 },
    { region: "진도군", lat: 34.4833, lng: 126.2654 },
    { region: "함평군", lat: 35.0655, lng: 126.5168 },
    { region: "해남군", lat: 34.573, lng: 126.6003 },
    { region: "화순군", lat: 35.0641, lng: 126.987 },
  ];

  const daegu = [
    // 대구
    { region: "남구", lat: 35.8459, lng: 128.598 },
    { region: "달서구", lat: 35.8301, lng: 128.533 },
    { region: "달성군", lat: 35.7747, lng: 128.4308 },
    { region: "동구", lat: 35.8868, lng: 128.6348 },
    { region: "북구", lat: 35.8862, lng: 128.583 },
    { region: "서구", lat: 35.8715, lng: 128.559 },
    { region: "수성구", lat: 35.8586, lng: 128.6322 },
    { region: "중구", lat: 35.8691, lng: 128.6064 },
  ];

  const busan = [
    // 부산
    { region: "강서구", lat: 35.1035, lng: 128.9221 },
    { region: "금정구", lat: 35.2434, lng: 129.0919 },
    { region: "기장군", lat: 35.244, lng: 129.221 },
    { region: "남구", lat: 35.137, lng: 129.0847 },
    { region: "동구", lat: 35.1296, lng: 129.0451 },
    { region: "동래구", lat: 35.2027, lng: 129.0913 },
    { region: "부산진구", lat: 35.1653, lng: 129.0433 },
    { region: "북구", lat: 35.2416, lng: 129.0127 },
    { region: "사상구", lat: 35.1528, lng: 128.9907 },
    { region: "사하구", lat: 35.1052, lng: 128.9735 },
    { region: "서구", lat: 35.1006, lng: 129.0242 },
    { region: "수영구", lat: 35.1553, lng: 129.1165 },
    { region: "연제구", lat: 35.1971, lng: 129.0821 },
    { region: "영도구", lat: 35.0911, lng: 129.0663 },
    { region: "중구", lat: 35.1063, lng: 129.0324 },
    { region: "해운대구", lat: 35.1636, lng: 129.1641 },
  ];

  // 울산
  const ulsan = [
    { region: "남구", lat: 35.544, lng: 129.3307 },
    { region: "동구", lat: 35.5041, lng: 129.4181 },
    { region: "북구", lat: 35.5837, lng: 129.3624 },
    { region: "울주군", lat: 35.5673, lng: 129.1211 },
    { region: "중구", lat: 35.5687, lng: 129.3328 },
  ];

  // 대전
  const daejeon = [
    { region: "대덕구", lat: 36.3657, lng: 127.4271 },
    { region: "동구", lat: 36.3409, lng: 127.4468 },
    { region: "서구", lat: 36.3546, lng: 127.3854 },
    { region: "유성구", lat: 36.3621, lng: 127.3436 },
    { region: "중구", lat: 36.3253, lng: 127.4213 },
  ];

  // 광주
  const gwangju = [
    { region: "광산구", lat: 35.1424, lng: 126.7927 },
    { region: "남구", lat: 35.1328, lng: 126.9025 },
    { region: "동구", lat: 35.1453, lng: 126.9231 },
    { region: "북구", lat: 35.18, lng: 126.9119 },
    { region: "서구", lat: 35.1515, lng: 126.8755 },
  ];

  // 인천
  const incheon = [
    { region: "강화군", lat: 37.7465, lng: 126.4871 },
    { region: "계양구", lat: 37.5399, lng: 126.7379 },
    { region: "남동구", lat: 37.4576, lng: 126.7216 },
    { region: "동구", lat: 37.4737, lng: 126.6432 },
    { region: "미추홀구", lat: 37.4635, lng: 126.6506 },
    { region: "부평구", lat: 37.507, lng: 126.7221 },
    { region: "서구", lat: 37.5446, lng: 126.6734 },
    { region: "연수구", lat: 37.4098, lng: 126.6722 },
    { region: "옹진군", lat: 37.448, lng: 126.6375 },
    { region: "중구", lat: 37.4735, lng: 126.6219 },
  ];

  // 제주
  const jeju = [
    { region: "서귀포시", lat: 33.2556, lng: 126.5623 },
    { region: "제주시", lat: 33.499, lng: 126.5312 },
  ];

  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    <div className={open ? "openModal mapmodal" : "mapmodal"}>
      {open ? (
        <div className="mapModalContainer">
          <div className="mapModalHeader">
            <b>&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;지역선택</b>
            <button
              className="mapModalBtn1"
              onClick={() => {
                setView(0); // city_name을 선택하고 나가기 후 지역선택하면 county_name 부터 나오는 현상 해결
                close();
              }}
            >
              &times;
            </button>
          </div>
          <div className="mapModalMain">
            {view === 0 && (
              <ul className="mapModalList">
                <li
                  onClick={() => {
                    setView(1);
                    setCitycheck1("서울특별시");
                    setCitycheck2(seoul);
                  }}
                >
                  서울특별시
                </li>
                <li
                  onClick={() => {
                    setView(1);
                    setCitycheck1("경기도");
                    setCitycheck2(gyeonggi);
                  }}
                >
                  경기도
                </li>
                <li
                  onClick={() => {
                    setView(1);
                    setCitycheck1("강원도");
                    setCitycheck2(gangwondo);
                  }}
                >
                  강원도
                </li>
                <li
                  onClick={() => {
                    setView(1);
                    setCitycheck1("충청북도");
                    setCitycheck2(chungbuk);
                  }}
                >
                  충청북도
                </li>
                <li
                  onClick={() => {
                    setView(1);
                    setCitycheck1("충청남도");
                    setCitycheck2(chungnam);
                  }}
                >
                  충청남도
                </li>
                <li
                  onClick={() => {
                    setView(1);
                    setCitycheck1("경상북도");
                    setCitycheck2(gyeongbuk);
                  }}
                >
                  경상북도
                </li>
                <li
                  onClick={() => {
                    setView(1);
                    setCitycheck1("경상남도");
                    setCitycheck2(gyeongnam);
                  }}
                >
                  경상남도
                </li>
                <li
                  onClick={() => {
                    setView(1);
                    setCitycheck1("전라북도");
                    setCitycheck2(jeonbuk);
                  }}
                >
                  전라북도
                </li>
                <li
                  onClick={() => {
                    setView(1);
                    setCitycheck1("전라남도");
                    setCitycheck2(jeonnam);
                  }}
                >
                  전라남도
                </li>
                <li
                  onClick={() => {
                    setView(1);
                    setCitycheck1("광주광역시");
                    setCitycheck2(gwangju);
                  }}
                >
                  광주광역시
                </li>
                <li
                  onClick={() => {
                    setView(1);
                    setCitycheck1("대구광역시");
                    setCitycheck2(daegu);
                  }}
                >
                  대구광역시
                </li>
                <li
                  onClick={() => {
                    setView(1);
                    setCitycheck1("대전광역시");
                    setCitycheck2(daejeon);
                  }}
                >
                  대전광역시
                </li>
                <li
                  onClick={() => {
                    setView(1);
                    setCitycheck1("부산광역시");
                    setCitycheck2(busan);
                  }}
                >
                  부산광역시
                </li>
                <li
                  onClick={() => {
                    setView(1);
                    setCitycheck1("울산광역시");
                    setCitycheck2(ulsan);
                  }}
                >
                  울산광역시
                </li>
                <li
                  onClick={() => {
                    setView(1);
                    setCitycheck1("인천광역시");
                    setCitycheck2(incheon);
                  }}
                >
                  인천광역시
                </li>
                <li
                  onClick={() => {
                    setView(1);
                    setCitycheck1("제주특별자치도");
                    setCitycheck2(jeju);
                  }}
                >
                  제주특별자치도
                </li>
                <li
                  onClick={() => {
                    setCity("세종특별자치시");
                    setLocation({
                      latitude: 36.485,
                      longitude: 127.2673,
                    });
                    setCounty("");
                    close();
                  }}
                >
                  세종특별자치시
                </li>
              </ul>
            )}
            {view === 1 && (
              <ul className="mapModalList">
                {citycheck2.map((a, i) => (
                  <li
                    key={i}
                    onClick={() => {
                      setView(0);
                      setCity(citycheck1);
                      setCounty(a.region);
                      if (maplevel === 6) {
                        setMaplevel(7);
                      } else {
                        setMaplevel(6);
                      }
                      setLocation({
                        latitude: a.lat,
                        longitude: a.lng,
                      });
                      close();
                    }}
                  >
                    {citycheck2[i].region}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="mapModalFooter">
            <button
              className="mapModalBtn2"
              onClick={() => {
                setView(0);
                close();
              }}
            >
              닫기
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Modal1;
