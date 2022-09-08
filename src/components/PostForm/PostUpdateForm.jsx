import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { updatePost, uploadThumbnail } from "../../redux/modules/postSlice";
import { useLocation, useNavigate } from "react-router-dom";

const PostUpdateForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //   const user = useSelector((store) => store.auth.user); // 로그인 한 사용자 정보 가져옴

  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const [thumbnail, setThumbnail] = useState();

  const {
    state: { id, preTitle, preContent, preThumbnail },
  } = useLocation();

  const loadFile = async (event) => {
    const file = { images: event.target.files[0] };
    const uploaded = await dispatch(uploadThumbnail(file)).then(
      (res) => res.payload.thumbnail
    );
    setThumbnail(uploaded);
  };

  useState(() => {
    setTitle(preTitle);
    setContent(preContent);
    setThumbnail(preThumbnail);
  }, []);

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

  const upDate = () => {
    if (!title || !content) {
      alert("제목과 내용 모두 입력하세요");
      return;
    }
    console.log("thumbnail > ", thumbnail);
    dispatch(updatePost({ id, title, content, thumbnail }));
    alert("수정이 완료되었습니다.");
    navigate("/");
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
            defaultValue={preTitle}
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
          defaultValue={preContent}
          sx={{ mb: 2 }}
          onChange={onChange}
        />
        <Button onClick={upDate} variant="contained" color="success">
          수정 완료
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
  margin-top: 1em;
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
export default PostUpdateForm;
