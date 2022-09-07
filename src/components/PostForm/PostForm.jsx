import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { addPost } from "../../redux/modules/postSlice";

const PostForm = () => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const [thumbnail, setThumbnail] = useState("");

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    switch (name) {
      case "title":
        return setTitle(value);
      case "content":
        return setContent(value);
      default:
    }
  };

  const loadFile = (event) => {
    const file = event.target.files[0];
    setThumbnail(file);
  };

  const post = () => {
    if (!title || !content) {
      alert("제목과 내용 모두 입력하세요");
      return;
    }
    console.log("thumbnail > ", thumbnail);
    dispatch(addPost({ title, content, thumbnail }));
    setThumbnail("");
  };

  return (
    <DetailContainer>
      <Form>
        <FormHeader>
          <TextField
            id="outlined-multiline-static"
            multiline
            rows={1}
            name="title"
            placeholder="제목"
            fullWidth
            onChange={onChange}
            sx={{ mr: 1 }}
          />
          <FileInput
            type="file"
            name="chooseFile"
            accept="image/*"
            onChange={loadFile}
          />
        </FormHeader>
        <TextField
          id="outlined-multiline-static"
          multiline
          rows={20}
          name="content"
          fullWidth
          placeholder="여러분의 식물을 맘껏 자랑하세요! 🌱"
          sx={{ mb: 2 }}
          onChange={onChange}
        />
        <Button onClick={post} variant="contained" color="success">
          작성 완료
        </Button>
      </Form>
    </DetailContainer>
  );
};

const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  max-width: 600px;
  margin: auto;
`;

const Form = styled.div``;

const FormHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1em;
`;

const FileInput = styled.input`
  width: 50%;
  padding-left: 1em;
`;
export default PostForm;
