import axios from "axios";

export const instance = axios.create({
  baseURL: "http://localhost:8080", // TODO: 서버 api 로 수정 .env 에 수정해서 변수를 가져오기
  withCredentials: true,
});

export const imageClient = axios.create({
  baseURL: "http://localhost:8080", // TODO: 서버 api 로 수정 .env 에 수정해서 변수를 가져오기
  withCredentials: true,
  headers: { "Content-Type": "multipart/form-data" },
});

export default instance;
