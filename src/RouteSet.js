import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginScreen from "./components/LoginScreen";
import MainPage from "./components/MainPage";
import MyPage from "./components/MyPage";
import TeamLounge from "./components/TeamLounge";
import ScrappedProfile from "./components/ScrappedProfile";
import OtherPersonProfile from "./components/OtherPersonProfile";
function RouteSet() {
  return (
    <Router>
      <Routes>
        <Route path="/MainPage" element={<MainPage />}></Route>
        <Route
          path="/TeamLounge/Scrapped"
          element={<ScrappedProfile />}
        ></Route>
        <Route path="/TeamLounge/Search" element={<TeamLounge />}></Route>
        <Route path="/MyPage" element={<MyPage />}></Route>
        <Route path="/" element={<LoginScreen />}></Route>
        <Route
          path="/OtherPage/:id/:isScrapped"
          element={<OtherPersonProfile />}
        ></Route>
      </Routes>
    </Router>
  );
}

export default RouteSet;
