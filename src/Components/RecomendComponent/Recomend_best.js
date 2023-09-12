import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "../../Styles/RecomendStyle.css";
import { BsEye, BsHandThumbsUp, BsPerson } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const Recomend_best = (props) => {
  const toBest = () => {
    window.location.href = "/recomend_best/`${props.id}`";
  };

  useEffect(() => {}, [props]);

  const defaultProfileImage = "/img/Default_profile.png"; // 기본 이미지 파일명
  return (
    <>
      <Card
        className="recommendCard"
        style={{ width: "18rem" }}
        // onClick={toBest}
      >
        <Link
          to={`/recomend_best?id=${props.id}`}
          key={props.id}
          style={{
            textDecoration: "none",
            color: "#252525",
            textAlign: "center",
            width: "auto",
            height: "auto",
          }}
          state={{ boardid: props.id, picture: props.picture }}
        >
          <Card.Img
            variant="top"
            src={props.picture}
            className="recommendCardImg"
            style={{
              width: "100%",
            }}
          />
          <Card.Body
            className="recommendCardBody"
            style={{
              width: "100%",
            }}
          >
            <Card.Title className="recommendCardTitle">
              {props.title}
            </Card.Title>
            <Card.Text className="recommendBestCardText">
              <p className="p_recommendWriter">
                {/* <BsPerson className="recommendIcon" /> */}

                {props.writerimg !== null &&
                props.writerimg !== undefined &&
                props.writerimg !== "" ? (
                  <>
                    <img
                      src={
                        props.writerimg !== null &&
                        props.writerimg !== "" &&
                        props.writerimg !== undefined
                          ? props.writerimg.includes("ssl.pstatic.net")
                            ? props.writerimg
                            : props.writerimg.includes("http://k.kakaocdn")
                            ? props.writerimg
                            : process.env.PUBLIC_URL +
                              "/uploadimgs/" +
                              props.writerimg
                          : null
                      }
                      alt=""
                      className="detailProfileImg"
                    />
                    &nbsp;
                    {props.writer}
                  </>
                ) : (
                  <>
                    <BsPerson className="recommendIcon" />
                    &nbsp;{props.writer}
                  </>
                )}
              </p>
              <BsEye className="recommendIcon" />
              &nbsp; {props.view} &nbsp;&nbsp;
              <BsHandThumbsUp className="recommendIcon" />
              &nbsp; {props.recommends}
            </Card.Text>
          </Card.Body>
        </Link>
      </Card>
    </>
  );
};

export default Recomend_best;
