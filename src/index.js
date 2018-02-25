import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

import "./css/index.css";

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);
registerServiceWorker();

// The BrowserRouter - uses the browser's histroy API to create real URLs.
// Router - is used here to render our App component - able to create routes needed inside the App component
