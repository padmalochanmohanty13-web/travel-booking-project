// ============================================================
// src/index.js - React App Entry Point
// This is the starting file - mounts React app into index.html
// ============================================================

import React from "react";
import ReactDOM from "react-dom/client";
import "./App.css";
import App from "./App";

// Mount the React application into the <div id="root"> in index.html
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
