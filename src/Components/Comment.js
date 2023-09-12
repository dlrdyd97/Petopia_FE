import "../Styles/Comment.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";

const Comment = (props) => {
  const [replyMode, setReplyMode] = useState(0);

  const clickWriteReplyBtn = () => {
    if (replyMode === 0) {
      setReplyMode(1);
    } else if (replyMode === 1) {
      setReplyMode(0);
    }
  };

  return (
    <>
      <div className="commentDiv">
        <div className="commentProfileDiv">
          <img
            className="commentProfileImg"
            src={props.commentProfile}
            alt=""
          />
        </div>
        <div className="commentContentDiv">
          <p className=" commentNickname">{props.commentWriter}</p>

          <span className="commentDate">{props.commentTime}</span>
          <br />
          <p className="comment">{props.commentContent}</p>
          <br />
          <p
            className="writeReply"
            onClick={() => {
              clickWriteReplyBtn();
            }}
          >
            답글 작성
          </p>
        </div>
      </div>

      {replyMode === 1 ? (
        <div className="writeCommentDiv">
          <Form.Group className="mb-3 writeFormContent">
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="답글을 입력하세요"
              className="writeCommentTextarea writeReplyTextarea"
            />
            <Button
              className="btn-sm writeCommentBtn writeReplyBtn"
              variant="primary"
            >
              답글 달기
            </Button>
          </Form.Group>
        </div>
      ) : null}
    </>
  );
};

export default Comment;
