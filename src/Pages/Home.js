import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "../Styles/Home.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Header from "../Components/Header.js";
import Footer from "../Components/Footer.js";
import BgLeft from "../Components/BgLeft.js";
import Board from "../Components/HomeBestBoard/Board";
import { NavLink, Link } from "react-router-dom";
import Kakao from "../Map/Kakao.js";
import axios from "axios";
import RecommendCard from "../Components/RecomendComponent/RecommendCard";
import "bootstrap/dist/css/bootstrap.css";
import styled from "styled-components";
import RecommendBest from "../Components/RecomendComponent/Recomend_best";
import { BsHandThumbsUp } from "react-icons/bs";

const NoticeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 95%;
`;

const BoardWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
  width: 100%;
`;

const slides = [
  {
    id: 1,
    image: "/img/Petopia_slide1.png",
  },
  {
    id: 2,
    image: "/img/Petopia_slide2.png",
  },
  {
    id: 3,
    image: "/img/Petopia_slide3.png",
  },
  {
    id: 4,
    image: "/img/Petopia_slide4.png",
  },
];

const Home = () => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000, // 4초 간격
    dots: true, // 점 표시 활성화
    arrows: false, // 좌우 화살표 비활성화
  };

  // 카테고리 분류 useState
  const [maplist1, setMaplist1] = useState([]);
  const [maplist2, setMaplist2] = useState([]);
  const [maplist3, setMaplist3] = useState([]);
  const [maplist4, setMaplist4] = useState([]);
  const [maplist5, setMaplist5] = useState([]);
  const [maplist6, setMaplist6] = useState([]);
  const [maplist7, setMaplist7] = useState([]);
  const [maplist8, setMaplist8] = useState([]);
  const [maplist9, setMaplist9] = useState([]);
  const [maplist10, setMaplist10] = useState([]);
  const [maplist11, setMaplist11] = useState([]);
  const [maplist12, setMaplist12] = useState([]);

  // DB로부터 특정지역의 카테고리(업소)를 불러오기 위한 useState
  const [city, setCity] = useState("서울특별시"); // 지역1 DB 컬럼 city_name에 해당
  const [county, setCounty] = useState("강남구"); // 지역2 DB 컬럼 county_name에 해당

  useEffect(() => {
    getMapList(); // 메인페이지 랜더링시 DB데이터 받아오는 함수 호출 ( 지역 선택시 )
  }, [city, county]);

  // DB로부터 장소 받아오기
  const getMapList = () => {
    axios
      .get("/maplist", {})
      .then((res) => {
        const { data } = res;
        const category1 = []; // 동물병원
        const category2 = []; // 동물약국
        const category3 = []; // 문예회관
        const category4 = []; // 미술관
        const category5 = []; // 미용
        const category6 = []; // 박물관
        const category7 = []; // 반려동물용품
        const category8 = []; // 식당
        const category9 = []; // 여행지
        const category10 = []; // 위탁관리
        const category11 = []; // 카페
        const category12 = []; // 펜션

        // db로부터 데이터 받아올 때 카테고리 분류하는 작업
        for (var i = 0; i < data.length; i++) {
          if (
            data[i].category3 === "동물병원" &&
            data[i].city_name === city &&
            data[i].county_name === county
            // data[i].category3 === "여행지"
          ) {
            category1.push(data[i]);
          } else if (
            data[i].category3 === "동물약국" &&
            data[i].city_name === city &&
            data[i].county_name === county
          ) {
            category2.push(data[i]);
          } else if (
            // 문예회관 데이터 1000개이하 county_name선택 무관 전체출력
            data[i].category3 === "문예회관" &&
            data[i].city_name === city
          ) {
            category3.push(data[i]);
          } else if (
            // 미술관 데이터 1000개이하 county_name선택 무관 전체출력
            data[i].category3 === "미술관" &&
            data[i].city_name === city
          ) {
            category4.push(data[i]);
          } else if (
            data[i].category3 === "미용" &&
            data[i].city_name === city &&
            data[i].county_name === county
          ) {
            category5.push(data[i]);
          } else if (
            data[i].category3 === "박물관" &&
            data[i].city_name === city &&
            data[i].county_name === county
          ) {
            category6.push(data[i]);
          } else if (
            data[i].category3 === "반려동물용품" &&
            data[i].city_name === city &&
            data[i].county_name === county
          ) {
            category7.push(data[i]);
          } else if (data[i].category3 === "식당") {
            // 식당 데이터는 14개 지역선택 무관 전체출력
            category8.push(data[i]);
          } else if (
            // 여행지 데이터 1000개이하 county_name선택 무관 전체출력
            data[i].category3 === "여행지" &&
            data[i].city_name === city
          ) {
            category9.push(data[i]);
          } else if (data[i].category3 === "위탁관리") {
            // 위탁관리 데이터 100개이하 지역선택 무관 전체출력
            category10.push(data[i]);
          } else if (
            // 카페 데이터 1000개이하 county_name선택 무관 전체출력
            data[i].category3 === "카페" &&
            data[i].city_name === city
          ) {
            category11.push(data[i]);
          } else if (
            // 펜션 데이터 1000개이하 county_name선택 무관 전체출력
            data[i].category3 === "펜션" &&
            data[i].city_name === city
          ) {
            category12.push(data[i]);
          }
        }

        setMaplist1(category1);
        setMaplist2(category2);
        setMaplist3(category3);
        setMaplist4(category4);
        setMaplist5(category5);
        setMaplist6(category6);
        setMaplist7(category7);
        setMaplist8(category8);
        setMaplist9(category9);
        setMaplist10(category10);
        setMaplist11(category11);
        setMaplist12(category12);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const [travelBestData, setTravelBestData] = useState([
    { id: 0, likes: 0, title: "", author: { profileImage: "" } },
  ]);

  useEffect(() => {
    callTravelBest();
  }, []);

  const callTravelBest = () => {
    axios
      .post("/travelboard/travelbest5", {
        category: "TRAVEL",
      })
      .then((res) => {
        setTravelBestData(res.data);
      })
      .catch((err) => console.log(err));
  };
  const imagePath = "/uploadimgs/";
  const MAX_BESTTITLE_LENGTH = 37;
  const MAX_TITLE_LENGTH = 11;
  return (
    <>
      <BgLeft />
      <main>
        <Header />
        <section>
          <div className="homeSlider">
            <Slider {...settings}>
              {slides.map((slide) => (
                <div key={slide.id}>
                  <img className="homeSlideImg" src={slide.image} />
                </div>
              ))}
            </Slider>
          </div>

          {/*지도 코드 들어갈 위치 */}
          <div className="containerIh">
            <div className="mapContainer">
              <Kakao
                maplist1={maplist1}
                maplist2={maplist2}
                maplist3={maplist3}
                maplist4={maplist4}
                maplist5={maplist5}
                maplist6={maplist6}
                maplist7={maplist7}
                maplist8={maplist8}
                maplist9={maplist9}
                maplist10={maplist10}
                maplist11={maplist11}
                maplist12={maplist12}
                city={city}
                setCity={setCity}
                county={county}
                setCounty={setCounty}
              />
            </div>
          </div>

          {/* 여행지 추천 div */}

          <div className="recommendation">
            <div style={{ marginTop: "10px" }}></div>
            {/* <span className="bestcrown">👑</span> */}
            <div className="recommendation-title" style={{ width: "89%" }}>
              <p>👑 이번 주 Best 👑</p>
            </div>
            {/* <NavLink to="/recomend_best" className="home-recommend-link">
              <div className="image-wrapper">
                <img src="img/recommend_best2.png" alt="image" />
              </div>
              <div className="boardTitle">
                <h7>양양 여행코스 추천!!</h7>
              </div>
              <div className="image-map-go">
                <p>자세히 보기</p>
              </div>
              <div className="stars-wrapper">
                <span className="star">&#9733;</span>
                <span className="star">&#9733;</span>
                <span className="star">&#9733;</span>
                <span className="star">&#9733;</span>
                <span className="star">&#9733;</span>
              </div>
            </NavLink> */}

            {travelBestData.length !== 0 &&
            travelBestData[0].id !== undefined ? (
              <RecommendBest
                id={
                  travelBestData[0].id !== undefined
                    ? travelBestData[0].id
                    : null
                }
                picture={
                  travelBestData[0].thumbnailImage !== undefined
                    ? imagePath + travelBestData[0].thumbnailImage
                    : null
                }
                title={
                  travelBestData[0].title.length > MAX_BESTTITLE_LENGTH
                    ? travelBestData[0].title.slice(0, MAX_BESTTITLE_LENGTH) +
                      "..."
                    : travelBestData[0].title
                }
                recommends={travelBestData[0].recommends}
                writerimg={travelBestData[0].author.profileImage}
                writer={travelBestData[0].author.nickname}
                view={travelBestData[0].views}
                like={travelBestData[0].likes}
              />
            ) : null}
          </div>

          {/* <div className="homebestthumbsupDiv">
            <div>
              <BsHandThumbsUp className="homebestthumbsup" />
            </div>

            <div className="bubble">
              <span>
                {travelBestData[0].likes !== undefined
                  ? travelBestData[0].likes
                  : null}
              </span>
            </div>
          </div> */}

          {/* 커뮤니티 게시글 div */}
          <div className="recommendation">
            <div className="recommendation-title">
              <p>이번 주 인기 게시글</p>
            </div>
            {/* <Board /> */}
            <NoticeContainer>
              <BoardWrapper>
                {travelBestData.map((travelalldata) => {
                  return (
                    <StyledLink
                      to={`/recomend_best?id=${travelalldata.id}`}
                      key={travelalldata.id}
                      state={{ boardid: travelalldata.id }}
                    >
                      <RecommendCard
                        picture={
                          travelalldata.thumbnailImage !== undefined
                            ? imagePath + travelalldata.thumbnailImage
                            : null
                        }
                        title={
                          travelalldata.title.length > MAX_TITLE_LENGTH
                            ? travelalldata.title.slice(0, MAX_TITLE_LENGTH) +
                              "..."
                            : travelalldata.title
                        }
                        recommends={travelalldata.recommends}
                        writerimg={travelalldata.author.profileImage}
                        writer={travelalldata.author.nickname}
                        view={travelalldata.views}
                        like={travelalldata.likes}
                        createdat={travelalldata.createdAt}
                      />
                    </StyledLink>
                  );
                })}
              </BoardWrapper>
            </NoticeContainer>
          </div>
        </section>
        <Footer />
      </main>
    </>
  );
};

export default Home;
