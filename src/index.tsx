import React from "react";
import ReactDOM from "react-dom";
import ReactGA from "react-ga";

import App from "./App";
import "./index.scss";

ReactGA.initialize("UA-186090362-1");
// ReactGA.initialize("G-230YFEX4MF");
ReactGA.pageview(window.location.pathname + window.location.search);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
