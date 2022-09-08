import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import loginImg from "../../imgs/login_img.png";
import { useDispatch } from "react-redux";
import { logIn } from "../../redux/modules/authSlice";
import { useNavigate } from "react-router-dom";
import { AltRoute } from "@mui/icons-material";

const LoginForm = (props) => {
  const REGEX_EMAIL =
    /^[-A-Za-z0-9_]+[-A-Za-z0-9_.]*[@]{1}[-A-Za-z0-9_]+[-A-Za-z0-9_.]*[.]{1}[A-Za-z]{1,5}$/;
  const REGEX_PASSWORD = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState(false);

  const [isEmail, setIsEmail] = useState(false);
  const [isPassword, setIsPassword] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (login) {
      const result = await dispatch(logIn({ email, password })).then(
        (res) => res.payload
      );
      if (result.success) {
        console.log("로그인 성공!");
        navigate("/");
        return;
      } else {
        alert("로그인이 실패 했습니다.");
      }
    }
  };

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    switch (name) {
      case "email":
        return setEmail(value);
      case "password":
        return setPassword(value);
      default:
    }
  };

  const validation = (text, regex) => {
    const helperText = regex.test(text) ? false : true;
    return text ? helperText : false;
  };

  const validation_email = useCallback(() => {
    return validation(email, REGEX_EMAIL);
  }, [email, REGEX_EMAIL]);

  const validation_password = useCallback(() => {
    return validation(password, REGEX_PASSWORD);
  }, [password, REGEX_PASSWORD]);

  useEffect(() => {
    email && validation_email() === false
      ? setIsEmail(true)
      : setIsEmail(false);
  }, [email, validation_email]);

  useEffect(() => {
    password && validation_password() === false
      ? setIsPassword(true)
      : setIsPassword(false);
  }, [password, validation_password]);

  useEffect(() => {
    if (isEmail && isPassword) {
      setLogin(true);
    } else {
      setLogin(false);
    }
  }, [isEmail, isPassword]);

  return (
    <BoxContainer>
      <Boxs>
        <Box>
          <LoginImg src={loginImg} alt="login"></LoginImg>
        </Box>
        <Box component="form" onSubmit={handleSubmit} sx={{ ml: 2 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            value={email}
            label="Email Address"
            name="email"
            autoFocus
            onChange={onChange}
            error={validation_email()}
            helperText={validation_email() ? "이메일 형식이 아닙니다." : ""}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            value={password}
            name="password"
            label="Password"
            type="text"
            // autoComplete="current-password"
            onChange={onChange}
            error={validation_password()}
            helperText={
              validation_password() ? "8자리 이상 영문, 숫자만 입력하세요." : ""
            }
          />
          <Button
            fullWidth
            type="submit"
            variant="contained"
            color="success"
            endIcon={<ArrowForwardIcon />}
          >
            Log In
          </Button>
          <LinkBox>
            <Link href="/join">Sign Up</Link>
          </LinkBox>
        </Box>
      </Boxs>
    </BoxContainer>
  );
};

const BoxContainer = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
`;

const Boxs = styled.div`
  max-width: 600px;
  /* height: 400px; */
  display: flex;
  align-items: center;
  border: 0.5px solid gainsboro;
  margin: auto;
  padding: 2em;
  border-radius: 1em;
`;

const LoginImg = styled.img`
  max-width: 300px;
`;

const LinkBox = styled.div`
  text-align: right;
  margin-top: 0.5em;
`;

export default LoginForm;
