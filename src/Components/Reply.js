import "../Styles/Comment.css";

const Reply = (props) => {
  return (
    <>
      <div className="commentDiv replyDiv">
        <div className="commentProfileDiv">
          <img className="commentProfileImg" src={props.replyProfile} alt="" />
        </div>
        <div className="replyContentDiv">
          <p className=" commentNickname">{props.replyWriter}</p>

          <span className="commentDate">{props.replyTime}</span>
          <br />
          <p className="comment">{props.replyContent}</p>
          <br />
        </div>
      </div>
    </>
  );
};

export default Reply;
