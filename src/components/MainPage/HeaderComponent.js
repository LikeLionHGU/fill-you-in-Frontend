import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const TopBackground = styled.div`
  /* 배너 배경.. */
  /* background-color: #04b1b1; */
  height: 43vh;
  width: 100vw;
`;

const Header = styled.div`
  display: flex;
  left: 2.8%;
  position: absolute;
  top: 4.65%;
  padding: 2px;

  > img {
    width: 37.9%;
    margin: 0px;
  }
  > img:hover {
    cursor: pointer;
  }
`;
const NavBar = styled.div`
  //헤더 바
  display: flex;
  flex-direction: row;
  justify-content: right;
  padding: 30px 20px;
`;

const NavButton = styled.div`
  display: flex;
  justify-content: center;
  /* width: 80px; */
  padding: 11px 16px;
  margin-left: 10px;

  //navbar 버튼 스타일
  background-color: #04b1b1;
  color: white;
  font-family: "Pretendard-SemiBold", Helvetica;
  font-size: 15px;
  font-weight: 400;
  transition: 0.3s;

  &:hover {
    /* nav 버튼들 */
    background-color: rgb(28, 28, 28, 0.15);
    color: white;
    font-weight: 500;
    cursor: pointer;
    border-radius: 5px;
  }
`;

function HeaderComponent() {
  const navigate = useNavigate();

  const handleLogoutMsg = () => {
    ///// < = jwt를 백엔드로 계속 보내면서 확인해야할듯
    if (window.confirm("로그아웃 하시겠습니까?")) {
      localStorage.removeItem("loginToken"); // 로그인 토큰 제거
      navigate("/");
    }
  };
  return (
    <div>
      <TopBackground>
        <Header>
          <img
            onClick={() => {
              window.location.reload("/MainPage");
            }}
            alt="LogoImage"
            src="https://cdn.animaapp.com/projects/65c5a7d8d4b749ab51e73dc0/releases/65cde3ba568da0c025605028/img/--@2x.png"
          />
        </Header>
        <NavBar>
          <NavButton>활동 찾기</NavButton>
          <NavButton onClick={() => navigate("/TeamLounge/Search")}>
            팀원 라운지
          </NavButton>
          <NavButton>팀 관리</NavButton>
          <NavButton onClick={() => navigate("/Mypage")}>마이페이지</NavButton>
          <NavButton onClick={handleLogoutMsg}>로그아웃</NavButton>
        </NavBar>
      </TopBackground>
    </div>
  );
}

export default HeaderComponent;
