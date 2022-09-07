import React from "react";
import CommentList from "../components/CommentList/CommentList";
import Header from "../components/Header/Header";
import PostDetailForm from "../components/PostForm/PostDetailForm";

const PostDetail = () => {
  return (
    <>
      <Header />
      <PostDetailForm />
      <CommentList />
    </>
  );
};

export default PostDetail;
