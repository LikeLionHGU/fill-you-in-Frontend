import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <App />
    <link // 이 링크 넣어줘야 editor 사용가능
      rel="stylesheet"
      href="https://unpkg.com/react-quill@1.3.3/dist/quill.snow.css"
    />
    ;
  </>
);

// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );
