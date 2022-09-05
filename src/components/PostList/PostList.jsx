import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../redux/modules/authSlice";
import styled from "styled-components";
import PostItem from "./PostItem";

const PostList = () => {
  const postList = useSelector((store) => store.auth.posts);
  const [posts, setPosts] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, []);

  useEffect(() => {
    setPosts(postList);
  }, [postList]);

  return (
    <PostContainer>
      {posts &&
        Array.from(posts).map((post) => {
          return <PostItem post={post} key={post.id} />;
        })}
    </PostContainer>
  );
};

const PostContainer = styled.div`
  /* height: 100vh; */
  display: flex;
  flex-wrap: wrap;
  max-width: 900px;
  justify-content: center;
  padding: 2em;
  margin: auto;
`;

export default PostList;
