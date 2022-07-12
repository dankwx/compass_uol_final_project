import React from "react";
import ReactDOM from "react-dom/client";
import "./reset.css";
import "./index.css";
import Login from "./pages/Login";
import RightScreen from "./pages/RightScreen";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <body>
      <Login />
      <RightScreen />
    </body>
  </React.StrictMode>
);
