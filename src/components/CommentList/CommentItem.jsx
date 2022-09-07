import React, { useState } from "react";
import styled from "styled-components";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CreateIcon from "@mui/icons-material/Create";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useDispatch, useSelector } from "react-redux";
import { deleteComment, updateComment } from "../../redux/modules/commentSlice";

const CommentItem = ({ comment }) => {
  const { id, content, writer } = comment;
  const { nickname } = writer;
  const [open, setOpen] = useState(false);
  const [newComment, setNewComment] = useState("");

  const dispatch = useDispatch();

  const user = useSelector((store) => store.auth.user); // 로그인 한 사용자 정보 가져옴

  const onUpdate = () => {
    setOpen(true);
  };

  const getNewComment = (event) => {
    const text = event.target.value;
    setNewComment(text);
  };

  // TODO:
  const update = () => {
    // json db 사용 위해 아래 형식으로 데이터를 만들었지만,
    // 실제 서버에 보낼때는 id와 content 만 있으면 됨.
    const sendData = {
      id: id,
      content: newComment,
      writer: {
        nickname: user.nickname,
      },
    };
    dispatch(updateComment(sendData));
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const remove = () => {
    if (window.confirm("삭제 하시겠습니까?")) {
      dispatch(deleteComment(id));
    } else {
    }
  };

  return (
    <>
      <ItemContainer>
        <Content>{content}</Content>

        {nickname && nickname === user.nickname ? (
          <>
            <IconButton onClick={onUpdate}>
              <CreateIcon color="success" />
            </IconButton>
            <IconButton onClick={remove}>
              <DeleteForeverIcon color="error" />
            </IconButton>
          </>
        ) : (
          ""
        )}
        <Writer>{nickname}</Writer>
      </ItemContainer>

      <div>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>댓글을 수정 하겠습니까?</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              onChange={getNewComment}
              fullWidth
              required
              sx={{ width: 300 }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>취소</Button>
            <Button onClick={update}>수정</Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
};

const ItemContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0.1em;
  padding: 0.8em;
  height: 2em;
  &:hover {
    background-color: oldlace;
  }
`;

const Content = styled.div`
  width: 100%;
`;

const Writer = styled.div``;

export default CommentItem;
