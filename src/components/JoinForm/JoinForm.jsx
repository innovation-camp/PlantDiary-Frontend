import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import loginImg from "../../imgs/login_img.png";
import { useDispatch } from "react-redux";
import { SignUp } from "../../redux/modules/authSlice";

const JoinForm = (props) => {
  const REGEX_EMAIL =
    /^[-A-Za-z0-9_]+[-A-Za-z0-9_.]*[@]{1}[-A-Za-z0-9_]+[-A-Za-z0-9_.]*[.]{1}[A-Za-z]{1,5}$/;
  const REGEX_NICKNAME = /[ㄱ-ㅎ|가-힣]+$/;
  const REGEX_PASSWORD = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [signup, setSignup] = useState(false);

  const [isEmail, setIsEmail] = useState(false);
  const [isNickname, setIsNickname] = useState(false);
  const [isPassword, setIsPassword] = useState(false);

  const dispatch = useDispatch();
  //TODO: 이메일, 닉네임 중복 확인 버튼 추가
  const handleSubmit = (event) => {
    event.preventDefault();
    const pwd_check = password_check();
    if (pwd_check !== true) {
      return;
    }
    if (signup) {
      alert("회원가입 가능!");
      try {
        dispatch(SignUp({ email, nickname, password }));
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("회원가입 안돼!");
    }
  };

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    switch (name) {
      case "email":
        return setEmail(value);
      case "nickname":
        return setNickname(value);
      case "password":
        return setPassword(value);
      case "passwordConfirm":
        return setPasswordConfirm(value);
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

  const validation_nickname = useCallback(() => {
    return validation(nickname, REGEX_NICKNAME);
  }, [nickname, REGEX_NICKNAME]);

  const validation_password = useCallback(() => {
    return validation(password, REGEX_PASSWORD);
  }, [password, REGEX_PASSWORD]);

  useEffect(() => {
    email && validation_email() === false
      ? setIsEmail(true)
      : setIsEmail(false);
  }, [email, validation_email]);

  useEffect(() => {
    nickname && validation_nickname() === false
      ? setIsNickname(true)
      : setIsNickname(false);
  }, [nickname, validation_nickname]);

  useEffect(() => {
    password && validation_password() === false
      ? setIsPassword(true)
      : setIsPassword(false);
  }, [password, validation_password]);

  useEffect(() => {
    if (isEmail && isNickname && isPassword) {
      setSignup(true);
    } else {
      setSignup(false);
    }
  }, [isEmail, isNickname, isPassword]);

  const password_check = () => {
    if (password === passwordConfirm) {
      return true;
    } else {
      alert("비밀번호가 일치하지 않습니다.");
      setPasswordConfirm("");
      return false;
    }
  };

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
            value={nickname}
            label="Nick name"
            name="nickname"
            onChange={onChange}
            error={validation_nickname()}
            helperText={
              validation_nickname() ? "한글만 입력할 수 있습니다." : ""
            }
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
          <TextField
            margin="normal"
            required
            fullWidth
            value={passwordConfirm}
            name="passwordConfirm"
            label="Password Confirm"
            type="text"
            onChange={onChange}
            // autoComplete="current-password"
          />
          <Button fullWidth type="submit" variant="contained">
            Sign Up
          </Button>
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

export default JoinForm;
