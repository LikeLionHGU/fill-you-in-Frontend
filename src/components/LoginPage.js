import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import GetKey from "./GetKey";
import MainPage from "./MainPage";
//06B5B5
// function LoginPage() {
//   return (
//     <div>
//       <a href="https://accounts.google.com/o/oauth2/v2/auth?response_type=code&amp;redirect_uri=https://localhost:3000;scope=https://www.googleapis.com/auth/userinfo.email">
//         구글로 계속하기
//       </a>
//       <div>LoginPage </div>
//     </div>
//   );
// }
// export default LoginPage;

function LoginPage() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/get-key" element={<GetKey />} />
          <Route path="/" element={<MainPage />} />
        </Routes>
      </Router>
    </div>
  );
}
export default LoginPage;
