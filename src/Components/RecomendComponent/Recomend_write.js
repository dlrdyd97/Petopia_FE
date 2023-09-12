import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import { useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";
import { BsTrash3 } from "react-icons/bs";
import RadioButton from "../../Components/RecomendComponent/RadioButton";
import "../../Styles/BoardWrite.css";
import "../../Styles/RecomendStyle.css";
import { Link, useNavigate } from "react-router-dom";

const Recomend_write = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);

  let fileList = []; // 업로드 할 파일 리스트 저장

  const handleFileInputChange = (event) => {
    const uploadFiles = Array.prototype.slice.call(event.target.files); // 파일 이름을 배열 형태로 저장
    console.log("uploadFiles => " + uploadFiles);

    // 파일 이름을 하나씩 저장
    uploadFiles.forEach((uploadFile) => {
      console.log(uploadFile);
      fileList.push(uploadFile);
    });

    setSelectedFiles([...selectedFiles, ...event.target.files]);
  };

  const handleRemoveImage = (index) => {
    const newFiles = [...selectedFiles];
    newFiles.splice(index, 1);
    setSelectedFiles(newFiles);
  };

  const handleUploadClick = () => {
    checkBoard();
  };

  const handleClick = () => {
    inputRef.current.click();
  };

  const [placeOption, setPlaceOption] = useState("");

  const options = [
    { value: "RESTAURANT", label: "#식당" },
    { value: "CAFE", label: "#카페" },
    { value: "PARK", label: "#공원" },
    { value: "ACCOMMODATION", label: "#숙소" },
  ];

  const handleOptionChange = (newValue) => {
    setPlaceOption(newValue);
  };

  const inputRef = useRef(null);
  const writeTitleText = useRef(null);
  const writeContentTextArea = useRef();
  const [writeContentText, setWriteContentText] = useState(0); //글자수
  const [checkboxes, setCheckboxes] = useState([]);

  const handleCheckboxChange = (event) => {
    const { id, checked } = event.target;

    if (checked) {
      setCheckboxes((prevCheckboxes) => [...prevCheckboxes, id]);
    } else {
      setCheckboxes((prevCheckboxes) =>
        prevCheckboxes.filter((checkbox) => checkbox !== id)
      );
    }
  };

  const checkBoard = () => {
    if (
      writeTitleText.current.value.length <= 0 ||
      writeContentTextArea.current.value.length <= 0 ||
      placeOption === "" ||
      checkboxes.length <= 0 ||
      selectedFiles.length <= 0
    ) {
      alert("모든 항목을 작성해 주세요.");
    } else {
      submitTravelRecommend();
    }
  };

  const navigate = useNavigate();

  const [boardid, setBoardid] = useState(null);

  const submitTravelRecommend = () => {
    const formData = new FormData();
    selectedFiles.forEach((file) => {
      formData.append("uploadfiles", file);
    });

    axios
      .post("/board/write", {
        author: { email: sessionStorage.getItem("email") },
        title: writeTitleText.current.value,
        content: writeContentTextArea.current.value,
        thumbnailImage: selectedFiles[0].name,
        category: "TRAVEL",
      })
      .then((res) => {
        setBoardid(res.data);
        submitTravelInfo(res.data);
        console.log(boardid);
      })
      .catch((e) => {
        console.error(e);
      })
      .then(() => {
        axios
          .post("/board/uploadfiles", formData)
          .then((res) => {
            console.log(boardid);
            navigate("/routetrip");
          })
          .catch((e) => {
            console.error(e);
          });
      })
      .then(() => {
        navigate("/routetrip");
      });
  };

  const submitTravelInfo = (boardid) => {
    axios
      .post("/travel/writeinfo", {
        post: { id: boardid },
        placeName: "장소이름 지정 기능 아직 없음",
        category: placeOption,
        petProvisions: JSON.stringify(checkboxes),
      })
      .then((res) => {})
      .catch((e) => {
        console.error(e);
      });
  };

  return (
    <>
      <div className="writeForm">
        <Form>
          <Form.Group className="mb-3">
            <Form.Label></Form.Label>
            <Form.Control
              className="writeTitle"
              type="email"
              placeholder="글 제목을 입력하세요"
              ref={writeTitleText}
              maxLength={255}
            />
          </Form.Group>
          <Form.Group className="mb-3 writeFormContent">
            <Form.Label></Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="글 내용을 입력하세요"
              className="contentForm"
              ref={writeContentTextArea}
              maxLength={3000}
              onChange={() => {
                setWriteContentText(writeContentTextArea.current.value.length);
              }}
            />
          </Form.Group>
          <p className="writeContentTextP">{writeContentText}/3000</p>

          <div>
            <p className="recomendP" style={{ marginTop: "15px" }}>
              1. 어떤 종류의 장소인가요? *{" "}
            </p>
            <div className="radioBtnDiv">
              <RadioButton options={options} clickPlace={handleOptionChange} />
              {/* <p>{placeOption}</p> */}
            </div>
          </div>

          {/* <div>
            <ListGroup>
              <ListGroup.Item>No style</ListGroup.Item>
              <ListGroup.Item action variant="primary">
                Primary
              </ListGroup.Item>
            </ListGroup>
          </div> */}

          <p className="recomendP">2. 반려견 동반시 유의사항 * </p>
          <div className="recomendCheckDiv">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="PET_SUPPLIES_PROVIDED"
                // id="flexCheckDefault"
                checked={checkboxes.includes("PET_SUPPLIES_PROVIDED")}
                onChange={handleCheckboxChange}
              />
              <label className="form-check-label" htmlFor="flexCheckDefault">
                펫 방석 혹은 담요를 제공해요
              </label>
            </div>

            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="PET_SNACK"
                checked={checkboxes.includes("PET_SNACK")}
                onChange={handleCheckboxChange}
              />
              <label className="form-check-label" htmlFor="flexCheckDefault">
                펫 간식을 제공해요
              </label>
            </div>

            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="PET_MANNER_BELT"
                checked={checkboxes.includes("PET_MANNER_BELT")}
                onChange={handleCheckboxChange}
              />
              <label className="form-check-label" htmlFor="flexCheckDefault">
                매너벨트 착용 필수에요
              </label>
            </div>

            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="NO_LARGE_DOG_ALLOWED"
                checked={checkboxes.includes("NO_LARGE_DOG_ALLOWED")}
                onChange={handleCheckboxChange}
              />
              <label className="form-check-label" htmlFor="flexCheckDefault">
                15 kg 이상 대형견은 입장할 수 없어요
              </label>
            </div>
          </div>
        </Form>
      </div>

      <div>
        <div>
          <div className="uploadBtn">
            <Button
              variant="outline-secondary"
              className=""
              onClick={handleClick}
            >
              <img className="uploadBtnImg" src="img/uploading.png" alt="" />
            </Button>
          </div>

          <input
            className="uploadInput"
            type="file"
            multiple
            onChange={handleFileInputChange}
            ref={inputRef}
          />
        </div>

        <div className="uploadImgDiv">
          <ListGroup>
            {selectedFiles.map((file, index) => (
              <ListGroup.Item className="listGroupItem" id="listGroupItemId">
                <div key={index}>
                  <img
                    className="uploadImg"
                    src={URL.createObjectURL(file)}
                    alt={`${file.name}`}
                  />
                  <p className="imgTitle">{file.name}</p>
                  <div className="imgDeleteBtnDiv">
                    <button
                      className="imgDeleteBtn"
                      onClick={() => handleRemoveImage(index)}
                    >
                      <BsTrash3 />
                    </button>
                  </div>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </div>
        <div className="btns">
          <button
            className="btn btn-sm btn-outline-primary submit"
            onClick={handleUploadClick}
          >
            작성 완료
          </button>
          <Link to="/routetrip">
            <button
              type="button"
              className="btn btn-sm btn-outline-primary boardListBtn"
            >
              글목록
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Recomend_write;
