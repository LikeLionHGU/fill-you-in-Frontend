import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import LoginScreen from "./components/LoginScreen";
import MainPage2 from "./components/MainPage2";
import MyPage from "./components/MyPage";
import TeamLounge from "./components/TeamLounge";
import ScrappedProfile from "./components/ScrappedProfile";
function RouteSet() {
  return (
    <Router>
      <Routes>
        <Route
          path="/TeamLounge/Scrapped"
          element={<ScrappedProfile />}
        ></Route>
        <Route path="/TeamLounge/Search" element={<TeamLounge />}></Route>
        <Route path="/MainPage" element={<MainPage2 />}></Route>
        <Route path="/MyPage" element={<MyPage />}></Route>
        <Route path="/" element={<LoginScreen />}></Route>
      </Routes>
    </Router>
  );
}

export default RouteSet;
