import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../redux/modules/postSlice";
import styled from "styled-components";
import PostItem from "./PostItem";

const PostList = () => {
  const postList = useSelector((store) => store.post.posts);
  const [posts, setPosts] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [postList]);

  useEffect(() => {
    setPosts(postList);
  }, [postList]);

  return (
    <PostContainer>
      {posts &&
        posts.map((post) => {
          return <PostItem post={post} key={post.id} />;
        })}
    </PostContainer>
  );
};

const PostContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 600px;
  justify-content: center;
  padding-top: 1em;
  margin: auto;
`;

export default PostList;
