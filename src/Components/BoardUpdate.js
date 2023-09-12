import "bootstrap/dist/css/bootstrap.css";
import "../Styles/BoardWrite.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useEffect, useState, useRef } from "react";
import { BsTrash3 } from "react-icons/bs";
import ListGroup from "react-bootstrap/ListGroup";

const BoardUpdate = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const inputRef = useRef(null);

  const handleFileInputChange = (event) => {
    setSelectedFiles([...selectedFiles, ...event.target.files]);
  };

  const handleRemoveImage = (index) => {
    const newFiles = [...selectedFiles];
    newFiles.splice(index, 1);
    setSelectedFiles(newFiles);
  };

  const handleUploadClick = () => {
    console.log(selectedFiles);
  };

  const handleClick = () => {
    inputRef.current.click();
  };

  const writeContentTextArea = useRef();
  const [writeContentText, setWriteContentText] = useState(0); //글자수

  return (
    <>
      <h2 className="h2_BoardUpdate">게시글 수정</h2>
      <div className="writeForm">
        <Form>
          <Form.Group className="mb-3">
            <Form.Label></Form.Label>
            <Form.Control
              className="writeTitle"
              type="email"
              placeholder="수정할 글 제목을 입력하세요"
            />
          </Form.Group>
          <Form.Group className="mb-3 writeFormContent">
            <Form.Label></Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="수정할 글 내용을 입력하세요"
              className="contentForm"
              ref={writeContentTextArea}
              maxLength={3000}
              onChange={() => {
                setWriteContentText(writeContentTextArea.current.value.length);
              }}
            />
          </Form.Group>
          <p className="writeContentTextP">{writeContentText}/3000</p>
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
            수정 완료
          </button>
          <button
            type="button"
            className="btn btn-sm btn-outline-primary boardListBtn"
          >
            글목록
          </button>
        </div>
      </div>
    </>
  );
};

export default BoardUpdate;
