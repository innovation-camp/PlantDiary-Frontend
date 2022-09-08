import axios from "axios";

export default function setAuthorizationToken(accessToken, refreshToken) {
  if (accessToken || refreshToken) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
    axios.defaults.headers.common["refreshTocken"] = `${refreshToken}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
    delete axios.defaults.headers.common["refreshTocken"];
  }
}
