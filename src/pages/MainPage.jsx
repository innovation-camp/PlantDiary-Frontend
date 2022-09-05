import React from "react";
import styled from "styled-components";
import HeaderContainer from "../components/Header/HeaderContainer";
import PostList from "../components/PostList/PostList";

const MainPage = (props) => (
  <MainContainer>
    <HeaderContainer />
    <PostList />
  </MainContainer>
);

const MainContainer = styled.div`
  height: 100vh;
`;

export default MainPage;
