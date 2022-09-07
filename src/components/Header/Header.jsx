import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import img_home from "../../imgs/logo.png";
import Button from "@mui/material/Button";
import LoginIcon from "@mui/icons-material/Login";
import CreateIcon from "@mui/icons-material/Create";
import PersonIcon from "@mui/icons-material/Person";
import Box from "@mui/material/Box";
import LogoutIcon from "@mui/icons-material/Logout";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../redux/modules/authSlice";

const Header = () => {
  const user = useSelector((store) => store.auth.user);
  const [username, setUsername] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      const { isAuthenticated, nickname } = user;
      if (isAuthenticated) {
        setUsername(nickname);
      } else {
        setUsername("");
      }
    }
  }, [user]);

  const login = () => {
    navigate("/login");
  };

  const post = () => {
    navigate("/post");
  };

  const onLogout = () => {
    if (window.confirm("로그아웃 하시겠습니까?")) {
      dispatch(logOut());
    } else {
    }
  };

  const goMypage = () => {
    navigate("/mypage");
  };

  const goHome = () => {
    window.location.replace("/");
  };

  return (
    <div>
      <HeaderContainer>
        <HomeImg src={img_home} onClick={goHome} />
        <Title>Plant Diary</Title>
        {!username ? (
          <Button
            onClick={login}
            variant="contained"
            color="success"
            endIcon={<LoginIcon />}
          >
            Log In
          </Button>
        ) : (
          <Box>
            <Button onClick={goMypage} variant="text" color="success">
              <PersonIcon />
            </Button>
            <Button
              onClick={post}
              variant="contained"
              color="success"
              endIcon={<CreateIcon />}
            >
              글쓰기
            </Button>
            <Button onClick={onLogout} variant="text" color="error">
              <LogoutIcon />
            </Button>
          </Box>
        )}
      </HeaderContainer>
      <Empty></Empty>
    </div>
  );
};

const HeaderContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2em 0 2em;
  border-bottom: 2px solid lightgray;
  background-color: #fff;
  z-index: 1;
`;

const Empty = styled.div`
  height: 80px;
`;

const Title = styled.h1`
  /* width: 100%; */
  position: fixed;
  left: 50%;
  transform: translate(-50%, 0);
`;

const HomeImg = styled.img`
  height: 2.5em;
  cursor: pointer;
`;

export default Header;
