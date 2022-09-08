import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getPost, deletePost } from "../../redux/modules/postSlice";
import styled from "styled-components";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CreateIcon from "@mui/icons-material/Create";

const PostDetailForm = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [post, SetPost] = useState({});
  const [nickname, setNickname] = useState("");
  // const user = useSelector((store) => store.auth.user); // 로그인 한 사용자 정보 가져옴

  const loginNickname = localStorage.getItem("nickname");

  // TODO:
  useEffect(() => {
    // dispatch(getPost(params.id)).then((res) => SetPost(res.payload.data));
    dispatch(getPost(params.id)).then((res) => SetPost(res.payload));
  }, []);

  // 작성 날짜 받는다면 받아서 화면에 뿌려주기
  const { id, title, thumbnail, content, writer } = post;

  useEffect(() => {
    if (writer) {
      setNickname(writer.nickname);
    }
  }, [writer]);

  const onUpdate = () => {
    // TODO: 정보 가지고 수정 페이지로
    navigate(`/post/update/${id}`, {
      state: {
        id,
        preTitle: title,
        preContent: content,
        preThumbnail: thumbnail,
      },
    });
  };

  const remove = () => {
    if (window.confirm("삭제 하시겠습니까?")) {
      dispatch(deletePost(params.id));
      navigate("/");
    } else {
    }
  };

  const defaultImg =
    "https://res.cloudinary.com/dozq0lpef/image/upload/v1662544379/ektkcu58eevdmbwbntqw.jpg";

  return (
    <DetailContainer>
      <Form>
        <FormHeader thumbnail={thumbnail ? thumbnail : defaultImg}>
          <FormWriter>{loginNickname}</FormWriter>
          <FormTitle>{title}</FormTitle>
          <FormBtn>
            {loginNickname && nickname === loginNickname ? (
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
          </FormBtn>
        </FormHeader>
        <TextField
          id="outlined-multiline-static"
          multiline
          rows={15}
          fullWidth
          value={content}
          defaultValue="Default Value"
        />
      </Form>
    </DetailContainer>
  );
};

const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 600px;
  margin: 1em auto 1em auto;
`;

const FormHeader = styled.div`
  height: 6em;
  background-image: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.3)),
    url(${(props) => props.thumbnail});
  color: white;
  padding: 0.4em;
`;

const FormTitle = styled.div`
  font-size: 2em;
  line-height: 2em;
`;
const FormWriter = styled.div`
  font-size: 1em;
  text-align: right;
  padding-top: 0.2em;
`;

const FormBtn = styled.div`
  /* background-color: aqua; */
  text-align: right;
  position: relative;
  top: -1.5em;
`;

const Form = styled.div``;

export default PostDetailForm;
