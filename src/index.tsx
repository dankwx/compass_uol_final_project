import React from "react";
import ReactDOM from "react-dom/client";
import "./reset.css";
import "./index.css";
import Login from "./pages/Login";
import Home from "pages/Home";
import Time from "pages/Home/Header/Time";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <body>
      <Home />
    </body>
  </React.StrictMode>
);
