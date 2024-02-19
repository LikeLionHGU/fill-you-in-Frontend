import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import LoginScreen from "./components/LoginScreen";
import MainPage from "./components/MainPage";
import MyPage from "./components/MyPage";
function RouteSet() {
  return (
    <Router>
      <Routes>
        <Route path="/MainPage" element={<MainPage />}></Route>
        <Route path="/MyPage" element={<MyPage />}></Route>
        <Route path="/" element={<LoginScreen />}></Route>
      </Routes>
    </Router>
  );
}

export default RouteSet;
