import React from "react";
import ReactDOM from "react-dom/client";
import Form from "./sendOTPemail.jsx";
import App from "./App.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App>
      <Form/>
    </App>
  </React.StrictMode>
);
