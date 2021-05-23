import React from "react";
import ReactDOM from "react-dom";
import "@progress/kendo-theme-material/dist/all.css";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

/* Instantiate CORS-Anywhere server code */
// import cors_proxy from "cors-anywhere";

// let host = process.env.HOST || "0.0.0.0";
// let port = process.env.PORT || 8000;

// // set up cors-anywhere proxy server
// cors_proxy
//   .createServer({
//     requireHeader: ["origin", "x-requested-with"],
//     removeHeaders: ["cookie", "cookie2"],
//   })
//   .listen(port, host, () => {
//     console.log(`Running CORS Anywhere on ${host}: ${port}`);
//   });

// render main application
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
