import React, { useEffect, useState } from "react";
import {
  Map,
  MapMarker,
  MarkerClusterer,
  CustomOverlayMap,
} from "react-kakao-maps-sdk";
import "./Kakao.css";
import MapModal from "../Modal/MapModal";
import "../Modal/MapModal.css";
import { useNavigate } from "react-router-dom";

const Kakao = ({
  maplist1,
  maplist2,
  maplist3,
  maplist4,
  maplist5,
  maplist6,
  maplist7,
  maplist8,
  maplist9,
  maplist10,
  maplist11,
  maplist12,
  city,
  setCity,
  county,
  setCounty,
}) => {
  const navigate = useNavigate();

  // -----모달창 관련 코드 시작
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };
  // -----모달창 구현 끝

  // -----현재 위치 받아오기 시작-----

  const [maplevel, setMaplevel] = useState(5); // 지역 클릭시 지도레벨 초기화를 위한 useState

  const [location, setLocation] = useState({
    latitude: 37.498004414546934,
    longitude: 127.02770621963765,
  }); // 현재 위치를 저장할 useState , default 위치는 37, 127

  // useEffect(() => {
  //   navigator.geolocation.getCurrentPosition(successHandler, errorHandler); // 성공시 successHandler, 실패시 errorHandler 함수가 실행된다.
  // }, []);

  // const successHandler = (response) => {
  //   console.log(response); // coords: GeolocationCoordinates {latitude: 위도, longitude: 경도, …} timestamp: 1673446873903
  //   const { latitude, longitude } = response.coords;
  //   setLocation({ latitude, longitude });
  // };

  // const errorHandler = (error) => {
  //   console.log(error);
  // };
  // -----현재 위치 받아오기 종료-----

  const markerImageSrc = "http://localhost:3000/mapimg/maker.png";

  const imageSize = { width: 22, height: 26 };
  const spriteSize = { width: 36, height: 98 };

  const makerOrigin = { x: 10, y: 0 };

  const [info, setInfo] = useState(); // infowindow를 관리하기 위한 useState
  const [selectedCategory, setSelectedCategory] = useState("hospital"); // 카테고리별 로직 구현을 위한 useState
  const [place, setPlace] = useState(makerOrigin); // 카테고리별 마커 이미지를 지도에 표시하기 위한 useState
  const [makerimg, setMakerimg] = useState(
    // 카테고리별 마커 이미지 표시를 위한 useState
    // "http://localhost:3000/mapimg/hospital.png"
    markerImageSrc
  );

  useEffect(() => {
    setInfo(false); // 다른 카테고리를 누르고 다시 원래 카테고리를 눌렀을때 infowindow 가 켜져있는 버그 해결
    const hospitalMenu = document.getElementById("hospitalMenu");
    const pharmacyMenu = document.getElementById("pharmacyMenu");
    const culturalCenterMenu = document.getElementById("culturalCenterMenu");
    const artmuseumMenu = document.getElementById("artmuseumMenu");
    const beautyMenu = document.getElementById("beautyMenu");
    const museumMenu = document.getElementById("museumMenu");
    const petGoodsMenu = document.getElementById("petGoodsMenu");
    const restaurantMenu = document.getElementById("restaurantMenu");
    const travelMenu = document.getElementById("travelMenu");
    const managementMenu = document.getElementById("managementMenu");
    const cafeMenu = document.getElementById("cafeMenu");
    const pensionMenu = document.getElementById("pensionMenu");

    if (selectedCategory === "hospital") {
      // 마커 이미지를 병원으로 변경하고
      // setMakerimg("http://localhost:3000/mapimg/hospital.png");
      // 병원 카테고리를 선택된 스타일로 변경하고
      hospitalMenu.className = "menu_selected";

      // 병원을 제외한 카테고리는 선택되지 않은 스타일로 바꿉니다
      pharmacyMenu.className = "";
      culturalCenterMenu.className = "";
      artmuseumMenu.className = "";
      beautyMenu.className = "";
      museumMenu.className = "";
      petGoodsMenu.className = "";
      restaurantMenu.className = "";
      travelMenu.className = "";
      managementMenu.className = "";
      cafeMenu.className = "";
      pensionMenu.className = "";
    } else if (selectedCategory === "pharmacy") {
      // 마커 이미지를 약국으로 변경하고
      // setMakerimg("http://localhost:3000/mapimg/pharmacy.png");

      // 약국을 제외한 카테고리는 선택되지 않은 스타일로 바꿉니다
      hospitalMenu.className = "";
      pharmacyMenu.className = "menu_selected";
      culturalCenterMenu.className = "";
      artmuseumMenu.className = "";
      beautyMenu.className = "";
      museumMenu.className = "";
      petGoodsMenu.className = "";
      restaurantMenu.className = "";
      travelMenu.className = "";
      managementMenu.className = "";
      cafeMenu.className = "";
      pensionMenu.className = "";
    } else if (selectedCategory === "culturalCenter") {
      // 마커 이미지를 문예회관으로 변경하고
      // setMakerimg("http://localhost:3000/mapimg/culturalCenter.png");

      // 문예회관을 제외한 카테고리는 선택되지 않은 스타일로 바꿉니다
      hospitalMenu.className = "";
      pharmacyMenu.className = "";
      culturalCenterMenu.className = "menu_selected";
      artmuseumMenu.className = "";
      beautyMenu.className = "";
      museumMenu.className = "";
      petGoodsMenu.className = "";
      restaurantMenu.className = "";
      travelMenu.className = "";
      managementMenu.className = "";
      cafeMenu.className = "";
      pensionMenu.className = "";
    } else if (selectedCategory === "artmuseum") {
      // 마커 이미지를 미술관으로 변경하고
      // setMakerimg("http://localhost:3000/mapimg/artmuseum.png");

      // 미술관을 제외한 카테고리는 선택되지 않은 스타일로 바꿉니다

      hospitalMenu.className = "";
      pharmacyMenu.className = "";
      culturalCenterMenu.className = "";
      artmuseumMenu.className = "menu_selected";
      beautyMenu.className = "";
      museumMenu.className = "";
      petGoodsMenu.className = "";
      restaurantMenu.className = "";
      travelMenu.className = "";
      managementMenu.className = "";
      cafeMenu.className = "";
      pensionMenu.className = "";
    } else if (selectedCategory === "beauty") {
      // 마커 이미지를 미용으로 변경하고
      // setMakerimg("http://localhost:3000/mapimg/beauty.png");

      // 미용을 제외한 카테고리는 선택되지 않은 스타일로 바꿉니다

      hospitalMenu.className = "";
      pharmacyMenu.className = "";
      culturalCenterMenu.className = "";
      artmuseumMenu.className = "";
      beautyMenu.className = "menu_selected";
      museumMenu.className = "";
      petGoodsMenu.className = "";
      restaurantMenu.className = "";
      travelMenu.className = "";
      managementMenu.className = "";
      cafeMenu.className = "";
      pensionMenu.className = "";
    } else if (selectedCategory === "museum") {
      // 마커 이미지를 박물관으로 변경하고
      // setMakerimg("http://localhost:3000/mapimg/museum.png");

      // 박물관을 제외한 카테고리는 선택되지 않은 스타일로 바꿉니다
      hospitalMenu.className = "";
      pharmacyMenu.className = "";
      culturalCenterMenu.className = "";
      artmuseumMenu.className = "";
      beautyMenu.className = "";
      museumMenu.className = "menu_selected";
      petGoodsMenu.className = "";
      restaurantMenu.className = "";
      travelMenu.className = "";
      managementMenu.className = "";
      cafeMenu.className = "";
      pensionMenu.className = "";
    } else if (selectedCategory === "petGoods") {
      // 마커 이미지를 애완용품으로 변경하고
      // setMakerimg("http://localhost:3000/mapimg/petGoods.png");

      // 애완용품을 제외한 카테고리는 선택되지 않은 스타일로 바꿉니다

      hospitalMenu.className = "";
      pharmacyMenu.className = "";
      culturalCenterMenu.className = "";
      artmuseumMenu.className = "";
      beautyMenu.className = "";
      museumMenu.className = "";
      petGoodsMenu.className = "menu_selected";
      restaurantMenu.className = "";
      travelMenu.className = "";
      managementMenu.className = "";
      cafeMenu.className = "";
      pensionMenu.className = "";
    } else if (selectedCategory === "restaurant") {
      // 마커 이미지를 식당으로 변경하고
      // setMakerimg("http://localhost:3000/mapimg/restaurant.png");

      // 식당을 제외한 카테고리는 선택되지 않은 스타일로 바꿉니다

      hospitalMenu.className = "";
      pharmacyMenu.className = "";
      culturalCenterMenu.className = "";
      artmuseumMenu.className = "";
      beautyMenu.className = "";
      museumMenu.className = "";
      petGoodsMenu.className = "";
      restaurantMenu.className = "menu_selected";
      travelMenu.className = "";
      managementMenu.className = "";
      cafeMenu.className = "";
      pensionMenu.className = "";
    } else if (selectedCategory === "travel") {
      // 마커 이미지를 여행지로 변경하고
      // setMakerimg("http://localhost:3000/mapimg/travel.png");

      // 여행지를 제외한 카테고리는 선택되지 않은 스타일로 바꿉니다

      hospitalMenu.className = "";
      pharmacyMenu.className = "";
      culturalCenterMenu.className = "";
      artmuseumMenu.className = "";
      beautyMenu.className = "";
      museumMenu.className = "";
      petGoodsMenu.className = "";
      restaurantMenu.className = "";
      travelMenu.className = "menu_selected";
      managementMenu.className = "";
      cafeMenu.className = "";
      pensionMenu.className = "";
    } else if (selectedCategory === "management") {
      // 마커 이미지를 위탁관리로 변경하고
      // setMakerimg("http://localhost:3000/mapimg/management.png");

      // 위탁관리 제외한 카테고리는 선택되지 않은 스타일로 바꿉니다
      hospitalMenu.className = "";
      pharmacyMenu.className = "";
      culturalCenterMenu.className = "";
      artmuseumMenu.className = "";
      beautyMenu.className = "";
      museumMenu.className = "";
      petGoodsMenu.className = "";
      restaurantMenu.className = "";
      travelMenu.className = "";
      managementMenu.className = "menu_selected";
      cafeMenu.className = "";
      pensionMenu.className = "";
    } else if (selectedCategory === "cafe") {
      // 마커 이미지를 카페로 변경하고
      // setMakerimg("http://localhost:3000/mapimg/cafe.png");

      // 카페를 제외한 카테고리는 선택되지 않은 스타일로 바꿉니다

      hospitalMenu.className = "";
      pharmacyMenu.className = "";
      culturalCenterMenu.className = "";
      artmuseumMenu.className = "";
      beautyMenu.className = "";
      museumMenu.className = "";
      petGoodsMenu.className = "";
      restaurantMenu.className = "";
      travelMenu.className = "";
      managementMenu.className = "";
      cafeMenu.className = "menu_selected";
      pensionMenu.className = "";
    } else if (selectedCategory === "pension") {
      // 마커 이미지를 펜션으로 변경하고
      // setMakerimg("http://localhost:3000/mapimg/pension.png");

      // 펜션을 제외한 카테고리는 선택되지 않은 스타일로 바꿉니다

      hospitalMenu.className = "";
      pharmacyMenu.className = "";
      culturalCenterMenu.className = "";
      artmuseumMenu.className = "";
      beautyMenu.className = "";
      museumMenu.className = "";
      petGoodsMenu.className = "";
      restaurantMenu.className = "";
      travelMenu.className = "";
      managementMenu.className = "";
      cafeMenu.className = "";
      pensionMenu.className = "menu_selected";
    }
  }, [selectedCategory]);

  // 마커 표시를 위한 함수
  const EventMarkerContainer = ({ position }) => {
    return (
      <>
        {/* ----- 마커 표시 시작 ----- */}
        <MapMarker
          position={position} // 마커를 표시할 위치
          onClick={() => {
            setInfo(position);
          }} // 마커 클릭시 infowindow 출력
          image={{
            // 마커 이미지 옵션
            src: makerimg,
            size: imageSize,
            options: {
              spriteSize: spriteSize,
              spriteOrigin: place,
            },
          }}
          zIndex={-1} // 마커가 infoWindow 보다 위에 찍히는 상황 방지
        />
        {/* ----- 마커 표시 종료 ----- */}

        {/* ----- infowindow 창 시작 ----- */}
        {/* 기존 마커의 infowindow가 열린 상태에서 다른 마커를 누르면 기존 마커의 infowindow 종료 */}
        {info &&
          info.lat === position.lat &&
          info.lng === position.lng && ( // infowindow 같이켜지는 현상 해결 하기 위해 겹칠수 없는 데이터(좌표)를 조건문에 할당
            /* 마커위에 infowindow 표시 */
            <CustomOverlayMap position={position}>
              <div
                className="mapwrapinfo"
                onClick={() => {
                  navigate(`/reviewpage/${position.id}`);
                  //리뷰 페이지 or 업소 상세페이지 이동 or 모달창 보여주기
                }}
              >
                <div className="mapinfo">
                  <div className="maptitle">
                    <div className="infoellipsis">{position.facility_name}</div>
                    <div
                      className="mapclose"
                      onClick={(e) => {
                        e.stopPropagation(); // 버블링 해결
                        setInfo(false);
                      }}
                      title="닫기"
                    ></div>
                  </div>
                  <div className="mapbody">
                    <div className="infoellipsis">{position.road_address}</div>
                    <div className="jibun infoellipsis">
                      (우) {position.postal_code} (지번) {position.town_name}
                      {position.address_number}
                    </div>
                    <div>
                      {position.homepage !== "정보없음" ? (
                        position.homepage.indexOf("http") === 0 ? (
                          <>
                            <a
                              href={position.homepage}
                              target="_blank"
                              className="maplink"
                              rel="noreferrer"
                              onClick={(e) => {
                                e.stopPropagation();
                              }}
                            >
                              홈페이지
                            </a>
                          </>
                        ) : (
                          <a
                            href={"http://" + position.homepage}
                            target="_blank"
                            className="maplink"
                            rel="noreferrer"
                            onClick={(e) => {
                              e.stopPropagation();
                            }}
                          >
                            홈페이지
                          </a>
                        )
                      ) : (
                        <a
                          href="a"
                          className="maplink"
                          rel="noreferrer"
                          onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                          }}
                        >
                          홈페이지 정보없음
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </CustomOverlayMap>
          )}
        {/* ----- infowindow 창 종료 ----- */}
      </>
    );
  };

  return (
    <>
      <div id="mapwrap">
        <Map // 지도를 표시할 Container
          id={`map`}
          center={{ lat: location.latitude, lng: location.longitude }}
          style={{
            // 지도의 크기
            width: "100%",
            height: "450px",
          }}
          level={maplevel} // 지도의 확대 레벨
        >
          {/* -----병원----- */}
          {/* -----마커 클러스터화 시작----- */}
          <MarkerClusterer
            averageCenter={true} // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
            minLevel={10} // 클러스터 할 최소 지도 레벨
            minClusterSize={1}
            onClustered={() => {
              // infowindow 가 켜진 상태로 클러스터링이 발생할 때 infowindow 까지 마커로 취급하는 오류 해결
              setInfo(false);
            }}
          >
            {selectedCategory === "hospital" &&
              maplist1.map((position, index) => (
                <>
                  <EventMarkerContainer position={position} key={index} />
                </>
              ))}
          </MarkerClusterer>
          {/* -----마커 클러스터화 종료----- */}

          {/* -----약국----- */}
          {/* -----마커 클러스터화 시작----- */}
          <MarkerClusterer
            averageCenter={true}
            minLevel={10}
            minClusterSize={1}
          >
            {selectedCategory === "pharmacy" &&
              maplist2.map((position, index) => (
                <>
                  <EventMarkerContainer position={position} key={index} />
                </>
              ))}
          </MarkerClusterer>
          {/* -----마커 클러스터화 종료----- */}

          {/* -----문예회관----- */}
          {/* -----마커 클러스터화 시작----- */}
          <MarkerClusterer
            averageCenter={true}
            minLevel={10}
            minClusterSize={1}
          >
            {selectedCategory === "culturalCenter" &&
              maplist3.map((position, index) => (
                <EventMarkerContainer position={position} key={index} />
              ))}
          </MarkerClusterer>
          {/* -----마커 클러스터화 종료----- */}

          {/* -----미술관----- */}
          {/* -----마커 클러스터화 시작----- */}
          <MarkerClusterer
            averageCenter={true}
            minLevel={10}
            minClusterSize={1}
          >
            {selectedCategory === "artmuseum" &&
              maplist4.map((position, index) => (
                <EventMarkerContainer position={position} key={index} />
              ))}
          </MarkerClusterer>

          {/* -----미용----- */}
          {/* -----마커 클러스터화 시작----- */}
          <MarkerClusterer
            averageCenter={true}
            minLevel={10}
            minClusterSize={1}
          >
            {selectedCategory === "beauty" &&
              maplist5.map((position, index) => (
                <EventMarkerContainer position={position} key={index} />
              ))}
          </MarkerClusterer>

          {/* -----박물관----- */}
          {/* -----마커 클러스터화 시작----- */}
          <MarkerClusterer
            averageCenter={true}
            minLevel={10}
            minClusterSize={1}
          >
            {selectedCategory === "museum" &&
              maplist6.map((position, index) => (
                <EventMarkerContainer position={position} key={index} />
              ))}
          </MarkerClusterer>
          {/* -----마커 클러스터화 종료----- */}

          {/* -----애완용품----- */}
          {/* -----마커 클러스터화 시작----- */}
          <MarkerClusterer
            averageCenter={true}
            minLevel={10}
            minClusterSize={1}
          >
            {selectedCategory === "petGoods" &&
              maplist7.map((position, index) => (
                <EventMarkerContainer position={position} key={index} />
              ))}
          </MarkerClusterer>
          {/* -----마커 클러스터화 종료----- */}

          {/* -----식당----- */}
          {/* -----마커 클러스터화 시작----- */}
          <MarkerClusterer
            averageCenter={true}
            minLevel={10}
            minClusterSize={1}
          >
            {selectedCategory === "restaurant" &&
              maplist8.map((position, index) => (
                <EventMarkerContainer position={position} key={index} />
              ))}
          </MarkerClusterer>
          {/* -----마커 클러스터화 종료----- */}

          {/* -----여행지----- */}
          {/* -----마커 클러스터화 시작----- */}
          <MarkerClusterer
            averageCenter={true}
            minLevel={10}
            minClusterSize={1}
          >
            {selectedCategory === "travel" &&
              maplist9.map((position, index) => (
                <EventMarkerContainer position={position} key={index} />
              ))}
          </MarkerClusterer>
          {/* -----마커 클러스터화 종료----- */}

          {/* -----위탁관리----- */}
          {/* -----마커 클러스터화 시작----- */}
          <MarkerClusterer
            averageCenter={true}
            minLevel={10}
            minClusterSize={1}
          >
            {selectedCategory === "management" &&
              maplist10.map((position, index) => (
                <EventMarkerContainer position={position} key={index} />
              ))}
          </MarkerClusterer>
          {/* -----마커 클러스터화 종료----- */}

          {/* -----카페----- */}
          {/* -----마커 클러스터화 시작----- */}
          <MarkerClusterer
            averageCenter={true}
            minLevel={10}
            minClusterSize={1}
          >
            {selectedCategory === "cafe" &&
              maplist11.map((position, index) => (
                <EventMarkerContainer position={position} key={index} />
              ))}
          </MarkerClusterer>
          {/* -----마커 클러스터화 종료----- */}

          {/* -----펜션----- */}
          {/* -----마커 클러스터화 시작----- */}
          <MarkerClusterer
            averageCenter={true}
            minLevel={10}
            minClusterSize={1}
          >
            {selectedCategory === "pension" &&
              maplist12.map((position, index) => (
                <EventMarkerContainer position={position} key={index} />
              ))}
          </MarkerClusterer>
          {/* -----마커 클러스터화 종료----- */}
        </Map>

        {/* 지도 위에 표시될 마커 카테고리 선택 리스트 */}
        <div className="mapcategory">
          <ul>
            {/* 병원 */}
            <li
              id="hospitalMenu"
              onClick={() => setSelectedCategory("hospital")}
            >
              <span className="ico_comm ico_hospital"></span>
              병원
            </li>
            {/* 약국 */}
            <li
              id="pharmacyMenu"
              onClick={() => setSelectedCategory("pharmacy")}
            >
              <span className="ico_comm ico_pharmacy"></span>
              약국
            </li>
            {/* 문예회관 */}
            <li
              id="culturalCenterMenu"
              onClick={() => setSelectedCategory("culturalCenter")}
            >
              <span className="ico_comm ico_culturalCenter"></span>
              문예회관
            </li>
            {/* 미술관 */}
            <li
              id="artmuseumMenu"
              onClick={() => setSelectedCategory("artmuseum")}
            >
              <span className="ico_comm ico_artmuseum"></span>
              미술관
            </li>
            {/* 미용 */}
            <li id="beautyMenu" onClick={() => setSelectedCategory("beauty")}>
              <span className="ico_comm ico_beauty"></span>
              미용
            </li>
            {/* 박물관 */}
            <li id="museumMenu" onClick={() => setSelectedCategory("museum")}>
              <span className="ico_comm ico_museum"></span>
              박물관
            </li>
          </ul>
        </div>
        <div className="mapcategory2">
          <ul>
            {/* 애완용품 */}
            <li
              id="petGoodsMenu"
              onClick={() => setSelectedCategory("petGoods")}
            >
              <span className="ico_comm ico_petGoods"></span>
              애완용품
            </li>
            {/* 식당 */}
            <li
              id="restaurantMenu"
              onClick={() => setSelectedCategory("restaurant")}
            >
              <span className="ico_comm ico_restaurant"></span>
              식당
            </li>
            {/* 여행지 */}
            <li id="travelMenu" onClick={() => setSelectedCategory("travel")}>
              <span className="ico_comm ico_travel"></span>
              여행지
            </li>
            {/* 위탁관리 */}
            <li
              id="managementMenu"
              onClick={() => setSelectedCategory("management")}
            >
              <span className="ico_comm ico_management"></span>
              위탁관리
            </li>
            {/* 카페 */}
            <li id="cafeMenu" onClick={() => setSelectedCategory("cafe")}>
              <span className="ico_comm ico_cafe"></span>
              카페
            </li>
            {/* 펜션 */}
            <li id="pensionMenu" onClick={() => setSelectedCategory("pension")}>
              <span className="ico_comm ico_pension"></span>
              펜션
            </li>
          </ul>
        </div>

        {/* 지역선택 박스 */}
        <div className="mapbox">
          <ul>
            <li onClick={() => openModal()}>
              <span className="ico_comm"></span>
              지역
            </li>
          </ul>
        </div>
      </div>
      {/* 지역 선택 모달창 */}
      <MapModal
        open={modalOpen}
        close={closeModal}
        setCity={setCity}
        setCounty={setCounty}
        setLocation={setLocation}
        maplevel={maplevel}
        setMaplevel={setMaplevel}
      />
    </>
  );
};

export default Kakao;
