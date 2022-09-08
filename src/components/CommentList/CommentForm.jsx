import React, { useState } from "react";
import InputAdornment from "@mui/material/InputAdornment";
import styled from "styled-components";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { postComment } from "../../redux/modules/commentSlice";

const CommentForm = ({ id }) => {
  const user = useSelector((store) => store.auth.user); // 로그인 한 사용자 정보 가져옴
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const commentBoxText = user && user.nickname + " 님, 댓글을 남겨 보세요!";

  const add = () => {
    const sendData = {
      postId: id,
      content: comment,
    };
    dispatch(postComment(sendData));
    setComment("");
  };

  const onChange = (event) => {
    return setComment(event.target.value);
  };

  return (
    <FormContainer>
      <TextField
        label={commentBoxText}
        id="outlined-start-adornment"
        name="comment"
        value={comment}
        fullWidth
        onChange={onChange}
        InputProps={{
          startAdornment: <InputAdornment position="start">🌱</InputAdornment>,
        }}
      />
      <Button variant="outlined" sx={{ p: 0, ml: 1 }} onClick={add}>
        댓글 달기
      </Button>
    </FormContainer>
  );
};

const FormContainer = styled.div`
  display: flex;
  margin-bottom: 0.2em;
`;

export default CommentForm;
