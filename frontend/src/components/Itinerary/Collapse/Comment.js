import React, { useRef, useState } from "react";
import { connect } from "react-redux";
import usersActions from "../../../redux/actions/usersActions";
import EditDeleteButtons from "./EditDeleteButtons";

const Comment = ({ comm, id, userId, ...props }) => {
  const [com, setCom] = useState(comm.comment);
  const [comment, setComment] = useState(comm.comment);
  const [editConfirm, setEditConfirm] = useState(false);
  let commentRef = useRef();
  let componentRef = useRef();

  const editConfirmButton = (e) => {
    commentRef.current.disabled = editConfirm;
    commentRef.current.className = editConfirm
      ? "inputUser text-start my-2 px-2"
      : "inputComment text-start my-2 px-2";
    !editConfirm && setComment(com);
    editConfirm && props.comment(id, "update", comment, com);
    setEditConfirm(!editConfirm);
  };
  const deleteComment = (e) => {
    commentRef.current.className = "d-none";
    componentRef.current.className = "d-none";
    props.comment(id, "delete", com);
  };

  return (
    <div ref={componentRef} className="my-2">
      {comm && (
        <div className="avatar d-flex">
          <div
            className="avatarImg"
            style={{
              backgroundImage: `url(${comm.user.img})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              height: "45px",
              width: "45px",
            }}
          ></div>
          <span className="px-2 fs-5 fw-bold">
            {comm.user.first_name + " " + comm.user.last_name}
          </span>
        </div>
      )}
      <div className="w-100 d-flex align-items-center">
        <div className="col-9 col-lg-10">
          <input
            type="text"
            className={`${
              userId === comm.user._id ? "inputUser" : "inputComment"
            } text-start my-2 px-2`}
            disabled
            ref={commentRef}
            value={com}
            onChange={() => setCom(commentRef.current.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                e.target.disabled = true;
                e.target.className = "inputUser text-start my-2 px-2";
                props.comment(id, "update", comment, com);
              }
            }}
          />
        </div>
        <div className="col-3 col-lg-2">
          <EditDeleteButtons
            authorized={comm.user._id === userId}
            functions={[editConfirmButton, deleteComment]}
          />
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = {
  comment: usersActions.comment,
  getId: usersActions.getId,
};

export default connect(null, mapDispatchToProps)(Comment);
