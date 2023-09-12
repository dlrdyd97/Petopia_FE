import React, { useState, useRef, useEffect } from "react";
import RatingSection from "../RatingSection";
import Form from "react-bootstrap/Form";
import "../../Styles/Review.css";
import { BsTrash3 } from "react-icons/bs";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import axios from "axios";

const MapReviewWrite = ({ setReviewAction, placedata, getPlaceReview }) => {
  // ratingIndex = 받을 평점
  const [ratingIndex, setRatingIndex] = useState(0); // 1. 리뷰 점수

  // 4. 비용
  const medicalCost = useRef(); // 진료비
  const surgeryCost = useRef(); // 수술비
  const totalCost = useRef(); // 총 비용

  const [compareOption, setCompareOption] = useState("0"); // 2. 가격 대비(1 : 저렴한 편, 2 : 보통, 3 : 비싼 편)
  const [priceOption, setPriceOption] = useState("0"); // 체크박스 렌더링 문제 해결을 위한 useState

  const handleConpareOptionChange = (e) => {
    setCompareOption(e.target.value); // 선택된 값을 상태에 저장
  };

  const handleUploadClick = () => {
    if (ratingIndex === 0) {
      alert("리뷰 점수를 선택해 주세요.");
    } else if (compareOption === "0") {
      alert("가격 대비를 선택해 주세요.");
    } else {
      consoleUpWrite();
    }

    // console.log(selectedFiles);
  };

  // 글 쓰기 컴포넌트 -----------------------------------------------------------------

  const [selectedFiles, setSelectedFiles] = useState([]);

  const inputRef = useRef(null);

  const reviewWriteContentTextArea = useRef();
  const [reviewWriteContentText, setReviewWriteContentText] = useState(0); // 리뷰 글자수

  const handleFileInputChange = (event) => {
    const files = event.target.files;
    const remainingSlots = 4 - selectedFiles.length;
    if (files.length <= remainingSlots) {
      setSelectedFiles((prevFiles) => [...prevFiles, ...Array.from(files)]);
    } else if (selectedFiles.length < 4) {
      const newFiles = Array.from(files).slice(0, remainingSlots);
      setSelectedFiles((prevFiles) => [...prevFiles, ...newFiles]);
      alert("최대 4개의 파일만 선택할 수 있습니다.");
    } else {
      alert("이미 네 장의 사진이 선택되어 있습니다.");
    }
    // console.log(files.length);
  };

  const handleRemoveImage = (index) => {
    const newFiles = [...selectedFiles];
    newFiles.splice(index, 1);
    setSelectedFiles(newFiles);
  };

  const handleClick = () => {
    inputRef.current.click();
  };

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    const regex = /^[0-9\b]+$/; // 숫자만 입력 받도록 정규식 패턴

    if (!regex.test(inputValue)) {
      e.target.value = inputValue.replace(/[^0-9]/g, ""); // 숫자 이외의 값을 제거
    }
  };

  const consoleUpWrite = () => {
    if (
      reviewWriteContentTextArea.current.value === null ||
      reviewWriteContentTextArea.current.value === "" ||
      reviewWriteContentTextArea.current.value === undefined
    ) {
      alert("리뷰 내용을 입력해 주세요.");
      reviewWriteContentTextArea.current.focus();
    } else {
      alert("리뷰 업로드");

      if (medicalCost.current.value === "") {
        medicalCost.current.value = 0;
      }
      if (surgeryCost.current.value === "") {
        surgeryCost.current.value = 0;
      }
      if (totalCost.current.value === "") {
        totalCost.current.value = 0;
      }

      axios
        .post("/mapReviewWrite", {
          username: sessionStorage.getItem("email"),
          rating: ratingIndex,
          content: reviewWriteContentTextArea.current.value,
          medicalCost: medicalCost.current.value,
          surgeryCost: surgeryCost.current.value,
          cost: totalCost.current.value,
          priceLevel: priceOption,
          mapid: placedata.id,
        })
        .then((res) => {
          if (selectedFiles.length !== 0) {
            const formData = new FormData(); // <form></form> 형식의 데이터를 전송하기 위해 주로 사용
            selectedFiles.forEach((file) => {
              formData.append("uploadfiles", file);
            });

            axios
              .post("/mapReviewImgUpload", formData)
              .then((res) => {})
              .catch((e) => {
                console.error(e);
              });
          }
          getPlaceReview();
          setReviewAction(0);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  useEffect(() => {
    // ratingIndex 값이 변경될 때마다 실행
  }, [ratingIndex]);

  // ---------------------------------------------------------------------------------

  return (
    <>
      {/* <p className="reviewRatingP">리뷰 작성</p> */}
      <div className="signUpForm reviewWriteForm">
        <p className="reviewTd">* 리뷰 점수</p>
        <div className="reviewRatingComponent">
          <RatingSection
            ratingIndex={ratingIndex}
            setRatingIndex={setRatingIndex}
          />
        </div>

        <Form className="mb-3 reviewWriteRadioBoxDiv">
          <div className="">
            <p className="reviewWriteRadioBoxP reviewTd">* 가격 대비</p>
            <div>
              <Form.Check
                inline
                label="저렴한 편이에요"
                type="radio"
                name="radiogroup1"
                id="radioBox1"
                value="CHEAP"
                checked={compareOption === "CHEAP"} // 첫 번째 옵션이 선택되었을 때 checked 값은 true
                onChange={handleConpareOptionChange}
                onClick={() => {
                  setPriceOption("CHEAP");
                }}
                className="reviewWriteCompareOptionForm"
              />
              <Form.Check
                inline
                label="보통이에요"
                type="radio"
                name="radiogroup2"
                id="radioBox2"
                value="MODERATE"
                checked={compareOption === "MODERATE"} //
                onChange={handleConpareOptionChange}
                onClick={() => {
                  setPriceOption("MODERATE");
                }}
                className="reviewWriteCompareOptionForm"
              />
              <Form.Check
                inline
                label="비싼 편이에요"
                type="radio"
                name="radiogroup3"
                id="radioBox3"
                value="EXPENSIVE"
                checked={compareOption === "EXPENSIVE"} //
                onChange={handleConpareOptionChange}
                onClick={() => {
                  setPriceOption("EXPENSIVE");
                }}
                className="reviewWriteCompareOptionForm"
              />
            </div>
          </div>
        </Form>

        <div>
          {placedata.category3 === "동물병원" ? (
            <div>
              <table className="reviewWriteTable">
                <tbody>
                  <tr>
                    <td className="reviewTd">&nbsp; 진료비</td>
                    <td>
                      <Form.Control
                        className="writeTitle reportReasonWrite reviewCostInputFormControl review-number"
                        type="text"
                        placeholder="숫자만입력"
                        name="reportReasonContent"
                        defaultValue={0}
                        ref={medicalCost}
                        onInput={handleInputChange}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="reviewTd">&nbsp; 수술비</td>
                    <td>
                      <Form.Control
                        className="writeTitle reportReasonWrite reviewCostInputFormControl review-number"
                        type="text"
                        placeholder="숫자만입력"
                        name="reportReasonContent"
                        defaultValue={0}
                        ref={surgeryCost}
                        onInput={handleInputChange}
                      ></Form.Control>
                    </td>
                  </tr>
                  <tr>
                    <td className="reviewTd">* 총 비용</td>
                    <td>
                      <Form.Control
                        className="writeTitle reportReasonWrite reviewCostInputFormControl review-number"
                        type="text"
                        placeholder="숫자만입력"
                        name="reportReasonContent"
                        defaultValue={0}
                        ref={totalCost}
                        onInput={handleInputChange}
                        required
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          ) : (
            <div>
              <table className="reviewWriteTable">
                <tbody>
                  <tr>
                    <td>
                      <Form.Control
                        className="writeTitle reportReasonWrite reviewCostInputFormControl review-number"
                        type="hidden"
                        placeholder="숫자만입력"
                        name="reportReasonContent"
                        defaultValue={0}
                        ref={medicalCost}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <Form.Control
                        className="writeTitle reportReasonWrite reviewCostInputFormControl review-number"
                        type="hidden"
                        placeholder="숫자만입력"
                        name="reportReasonContent"
                        defaultValue={0}
                        ref={surgeryCost}
                      />
                    </td>
                  </tr>

                  <tr>
                    <td className="reviewTd">* 총 비용</td>
                    <td>
                      <div>
                        <Form.Control
                          className="writeTitle reportReasonWrite reviewCostInputFormControl review-number"
                          type="text"
                          placeholder="숫자만입력"
                          name="reportReasonContent"
                          defaultValue={0}
                          ref={totalCost}
                          onInput={handleInputChange}
                          required
                        />
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
              {/* <div className="whiteSpace"></div> */}
            </div>
          )}
        </div>

        {/* 글쓰기 컴포넌트 -----------------------------------------------------------------------------------*/}
        <div className="reviewWriteContentForm">
          <Form>
            <Form.Group className="mb-3 writeFormContent">
              <Form.Label></Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="리뷰를 입력해 주세요."
                className="contentForm reviewContentForm"
                ref={reviewWriteContentTextArea}
                maxLength={500}
                style={{ resize: "none" }}
                onChange={() => {
                  setReviewWriteContentText(
                    reviewWriteContentTextArea.current.value.length
                  );
                }}
              />
            </Form.Group>
          </Form>
          <p className="reviewWriteContentTextP">
            {reviewWriteContentText}/500
          </p>
        </div>
      </div>

      {/* <div className="whiteSpace"></div>  --------------------------------------------------- white space */}
      <div className="boardWriteDiv">
        {/* <BoardWrite /> */}

        <div className="reviewWriteBtnsDiv">
          <div>
            <div className="uploadBtn">
              <Button
                variant="outline-secondary"
                className=""
                onClick={handleClick}
              >
                <img className="uploadBtnImg" src="/img/uploading.png" alt="" />
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

          <div className="uploadImgDiv reviewWriteUploadImgDiv">
            <ListGroup>
              {selectedFiles.map((file, index) => (
                <ListGroup.Item
                  className="listGroupItem"
                  id="listGroupItemId"
                  key={index}
                >
                  <div>
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
              className="btn btn-sm btn-outline-primary submit reviewWriteSubmit"
              onClick={handleUploadClick}
            >
              작성
            </button>
            <button
              className="btn btn-sm btn-outline-primary submit reviewWriteSubmit"
              onClick={() => {
                setReviewAction(0);
              }}
            >
              돌아가기
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default MapReviewWrite;
