import React from "react";
import Header from "../components/Header/Header";
import PostForm from "../components/PostForm/PostForm";
import styled from "styled-components";

import ImageUploader from "../service/image_uploader";
import ImageFileInput from "../components/ImageFileInput/ImageFileInput";

const imageUploader = new ImageUploader();
const FileInput = (props) => (
  <ImageFileInput {...props} imageUploader={imageUploader} />
);

const Post = () => {
  return (
    <PostContainer>
      <div>
        <Header />
      </div>
      <FormContainer>
        <PostForm />
      </FormContainer>
    </PostContainer>
  );
};

const PostContainer = styled.div`
  height: 100vh;
  overflow-y: scroll;
`;

const FormContainer = styled.div`
  margin-top: 1em;
`;

export default Post;
