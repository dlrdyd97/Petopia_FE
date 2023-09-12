import ListGroup from "react-bootstrap/ListGroup";
import Pagination from "react-bootstrap/Pagination";
import "../../Styles/RecomendStyle.css";
import Card from "react-bootstrap/Card";
import { BsEye, BsHandThumbsUp, BsPerson } from "react-icons/bs";

const Recomend_Viewall = () => {
  const pagination = () => {
    for (let i = 2; i <= 10; i++) {
      <Pagination.Item>{i}</Pagination.Item>;
    }
  };

  return (
    <div className="listGroup">
      <ListGroup className="listGroup">
        <ListGroup.Item className="w-80 recommendListItem">
          <div className="recommendViewallImgDiv">
            <img className="listGroupImg" src="img/recommend_best1.png" />
          </div>

          <div className="recommendViewallDiv">
            <p className="listGroupText">fasd fasd</p>
            <Card.Text className="recommendBestCardText">
              <p className="p_recommendWriter">
                <BsPerson className="recommendIcon" /> petopia
              </p>
              <BsEye className="recommendIcon" />
              &nbsp; 1 &nbsp;&nbsp;
              <BsHandThumbsUp className="recommendIcon" />
              &nbsp; 1
            </Card.Text>
          </div>
        </ListGroup.Item>
        <ListGroup.Item className="w-80 recommendListItem">
          <div className="recommendViewallImgDiv">
            <img className="listGroupImg" src="img/recommend_best1.png" />
          </div>

          <div className="recommendViewallDiv">
            <p className="listGroupText">fasd fasd</p>
            <Card.Text className="recommendBestCardText">
              <p className="p_recommendWriter">
                <BsPerson className="recommendIcon" /> petopia
              </p>
              <BsEye className="recommendIcon" />
              &nbsp; 1 &nbsp;&nbsp;
              <BsHandThumbsUp className="recommendIcon" />
              &nbsp; 1
            </Card.Text>
          </div>
        </ListGroup.Item>
        <ListGroup.Item className="w-80 recommendListItem">
          <div className="recommendViewallImgDiv">
            <img className="listGroupImg" src="img/recommend_best1.png" />
          </div>

          <div className="recommendViewallDiv">
            <p className="listGroupText">여행 코스 추천합니다. 이 지역은...</p>
            <Card.Text className="recommendBestCardText">
              <p className="p_recommendWriter">
                <BsPerson className="recommendIcon" /> petopia
              </p>
              <BsEye className="recommendIcon" />
              &nbsp; 1 &nbsp;&nbsp;
              <BsHandThumbsUp className="recommendIcon" />
              &nbsp; 1
            </Card.Text>
          </div>
        </ListGroup.Item>
        <ListGroup.Item className="w-80 recommendListItem">
          <div className="recommendViewallImgDiv">
            <img className="listGroupImg" src="img/recommend_best1.png" />
          </div>

          <div className="recommendViewallDiv">
            <p className="listGroupText">fasd</p>
            <Card.Text className="recommendBestCardText">
              <p className="p_recommendWriter">
                <BsPerson className="recommendIcon" /> petopia
              </p>
              <BsEye className="recommendIcon" />
              &nbsp; 1 &nbsp;&nbsp;
              <BsHandThumbsUp className="recommendIcon" />
              &nbsp; 1
            </Card.Text>
          </div>
        </ListGroup.Item>
        <ListGroup.Item className="w-80 recommendListItem">
          <div className="recommendViewallImgDiv">
            <img className="listGroupImg" src="img/recommend_best1.png" />
          </div>

          <div className="recommendViewallDiv">
            <p className="listGroupText">fasd fasd</p>
            <Card.Text className="recommendBestCardText">
              <p className="p_recommendWriter">
                <BsPerson className="recommendIcon" /> petopia
              </p>
              <BsEye className="recommendIcon" />
              &nbsp; 1 &nbsp;&nbsp;
              <BsHandThumbsUp className="recommendIcon" />
              &nbsp; 1
            </Card.Text>
          </div>
        </ListGroup.Item>
      </ListGroup>

      <div className="pagination">
        <Pagination className="pagenation">
          <Pagination.First />
          <Pagination.Prev />

          <Pagination.Item active>1</Pagination.Item>
          <Pagination.Item>2</Pagination.Item>
          <Pagination.Item>3</Pagination.Item>
          <Pagination.Item>4</Pagination.Item>
          <Pagination.Item>5</Pagination.Item>

          <Pagination.Next />
          <Pagination.Last />
        </Pagination>
      </div>
    </div>
  );
};

export default Recomend_Viewall;
