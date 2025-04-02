import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "jsvectormap/dist/css/jsvectormap.css";
import React from "react";
import ReactDOM from "react-dom/client";
import "react-modal-video/css/modal-video.min.css";
import "react-quill/dist/quill.snow.css";
import { Provider } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import store from "./services";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
