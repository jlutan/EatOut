import React from "react";
import ReactDOM from "react-dom";
import "@progress/kendo-theme-material/dist/all.css";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

// render main application
ReactDOM.render(
  <React.Fragment>
    <App />
  </React.Fragment>,
  document.getElementById("root")
);

reportWebVitals(console.log); // send web analytics to console
