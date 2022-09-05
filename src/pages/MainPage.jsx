import React from "react";
import styled from "styled-components";
import HeaderContainer from "../components/Header/HeaderContainer";

const MainPage = (props) => (
  <AppContainer>
    <HeaderContainer />
  </AppContainer>
);

const AppContainer = styled.div`
  height: 100vh;
`;

export default MainPage;
