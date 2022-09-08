import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import loginImg from "../../imgs/login_img.png";
import { useDispatch } from "react-redux";
import {
  signUp,
  emailConfirm,
  nicknameConfirm,
} from "../../redux/modules/authSlice";
import { useNavigate } from "react-router-dom";

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

  const [availableEmail, setAvailableEmail] = useState("");
  const [availableNickname, setAvailableNickname] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    const pwd_check = password_check();
    if (pwd_check !== true) {
      return;
    }
    if (email !== availableEmail) {
      alert("이메일 중복체크를 해주세요.");
      return;
    }
    if (nickname !== availableNickname) {
      alert("닉네임 중복체크를 해주세요.");
      return;
    }
    if (signup) {
      try {
        dispatch(signUp({ email, nickname, password, passwordConfirm }));
        navigate("/login");
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

  const emailCheck = async () => {
    // 값 받아와서 true 면? available email 에 현재 email 넣기
    const result = await dispatch(emailConfirm(email)).then(
      (res) => res.payload.success
    );
    if (result) {
      alert("사용 가능한 이메일입니다.");
      setAvailableEmail(email);
    } else {
      alert("다른 이메일을 사용하세요.");
    }
  };

  const nicknameCheck = async () => {
    const result = await dispatch(nicknameConfirm(nickname)).then(
      (res) => res.payload.success
    );
    if (result) {
      alert("사용 가능한 닉네임입니다.");
      setAvailableNickname(nickname);
    } else {
      alert("사용할 수 없는 닉네임입니다.");
    }
  };

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
            value={email}
            label="Email Address"
            name="email"
            autoFocus
            onChange={onChange}
            error={validation_email()}
            helperText={validation_email() ? "이메일 형식이 아닙니다." : ""}
          />
          <Button
            variant="outlined"
            disabled={isEmail ? false : true}
            sx={{ mt: 3, ml: 0.9 }}
            onClick={emailCheck}
          >
            중복확인
          </Button>
          <TextField
            margin="normal"
            required
            value={nickname}
            label="Nick Name"
            name="nickname"
            onChange={onChange}
            error={validation_nickname()}
            helperText={
              validation_nickname() ? "한글만 입력할 수 있습니다." : ""
            }
          />
          <Button
            variant="outlined"
            disabled={isNickname ? false : true}
            sx={{ mt: 3, ml: 0.9 }}
            onClick={nicknameCheck}
          >
            중복확인
          </Button>
          <TextField
            margin="normal"
            required
            fullWidth
            value={password}
            name="password"
            label="Password"
            type="text"
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
          />
          <Button
            fullWidth
            type="submit"
            variant="contained"
            color="success"
            endIcon={<ArrowForwardIcon />}
          >
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
