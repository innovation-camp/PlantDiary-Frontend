import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./app";
import { Provider } from "react-redux";
import store from "./redux/store";
import GlobalStyle from "./GlobalStyle";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <GlobalStyle />
      <App />
    </Provider>
  </React.StrictMode>
);
