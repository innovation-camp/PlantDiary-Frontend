import React from "react";
import { useParams } from "react-router-dom";
import CommentList from "../components/CommentList/CommentList";
import Header from "../components/Header/Header";
import PostDetailForm from "../components/PostForm/PostDetailForm";

const PostDetail = () => {
  const params = useParams();
  return (
    <>
      <Header />
      <PostDetailForm />
      <CommentList id={params.id} />
    </>
  );
};

export default PostDetail;
