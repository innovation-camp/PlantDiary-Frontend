import React from "react";
import styled from "styled-components";
import CommentList from "../components/CommentList/CommentList";
import HeaderContainer from "../components/Header/HeaderContainer";
import PostList from "../components/PostList/PostList";

const MainPage = (props) => (
  <MainContainer>
    <HeaderContainer />
    <PostList />
    <CommentList />
  </MainContainer>
);

const MainContainer = styled.div`
  height: 100vh;
`;

export default MainPage;
