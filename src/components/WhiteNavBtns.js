import React from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";

function WhiteNavBtns({ img }) {
  const navigate = useNavigate();
  const blueLogo =
    "https://cdn.builder.io/api/v1/image/assets/TEMP/da499762202f994dca54ca969adb1ef5319c49ef9d16de21ea1a331e2cdf55f0?";
  const whiteLogo =
    "https://cdn.animaapp.com/projects/65c5a7d8d4b749ab51e73dc0/releases/65d311206269ef486d8b65d3/img/--@2x.png";
  const handleLogoutMsg = () => {
    ///// < = jwt를 백엔드로 계속 보내면서 확인해야할듯
    if (window.confirm("로그아웃 하시겠습니까?")) {
      localStorage.removeItem("loginToken"); // 로그인 토큰 제거
      navigate("/");
    }
  };
  const handleGoMainPage = () => {
    navigate("/MainPage");
  };

  const location = useLocation();
  const handleNavigate = (path) => {
    if (location.pathname !== path) {
      navigate(path);
    }
  };
  return (
    <NavBar>
      <LogoImg>
        {img === "blue" ? (
          <img
            className="blueLogo"
            alt="logoImg"
            src={blueLogo}
            onClick={handleGoMainPage}
          />
        ) : (
          <img
            className="whiteLogo"
            alt="logoImg"
            src={whiteLogo}
            onClick={handleGoMainPage}
          />
        )}
      </LogoImg>
      <NavButton onClick={() => handleNavigate("/AddFolderPage")}>
        활동 다이어리
      </NavButton>
      <NavButton
        onClick={() => {
          handleNavigate("/TeamLounge/Search");
        }}
      >
        팀원 라운지
      </NavButton>
      <NavButton
        onClick={() => {
          handleNavigate("/MyPage");
        }}
      >
        마이페이지
      </NavButton>
      <NavButton onClick={handleLogoutMsg}>로그아웃</NavButton>
    </NavBar>
  );
}

export default WhiteNavBtns;
const NavBar = styled.div`
  //헤더 바
  display: flex;
  flex-direction: row;
  justify-content: right;
  background-color: white;
  padding: 30px 20px;
  /* border: 2px solid green; */
`;
const NavButton = styled.div`
  display: flex;
  justify-content: center;
  /* width: 80px; */
  padding: 11px 16px;
  margin-left: 10px;

  //navbar 버튼 스타일
  background-color: white;
  color: #04b1b1;
  font-family: "Pretendard-SemiBold", Helvetica;
  font-size: 15px;
  font-weight: 400;
  transition: 0.3s;

  &:hover {
    /* nav 버튼들 */
    background-color: rgb(28, 28, 28, 0.15);
    font-weight: 500;
    cursor: pointer;
    border-radius: 5px;
  }
`;
const LogoImg = styled.div`
  display: flex;
  z-index: 1500; // 로고 이미지를 아예 맨 위로 올려서 한 위치에 고정시킴
  left: 2.8%;
  position: absolute;
  top: 3%;
  padding: 2px;
  cursor: pointer;
  > .whiteLogo {
    width: 37.9%;
  }

  > .blueLogo {
    width: 80%;
  }
`;
