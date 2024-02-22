import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./MainPage.module.css";
import ModifyProfile from "./ModifyProfile";

import styled from "styled-components";

function MainPage() {
  const handleLogoutMsg = () => {
    ///// < = jwt를 백엔드로 계속 보내면서 확인해야할듯
    if (window.confirm("로그아웃 하시겠습니까?")) {
      localStorage.removeItem("loginToken"); // 로그인 토큰 제거
      navigate("/");
    }
  };
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();
  const showModal = () => {
    setModalOpen(true);
  };
  return (
    <div className={styles.mainpage2}>
      <div className={styles.section1}>
        <div className={styles.flex1}>
          <img src="/img/fill-you-in-logo.png" alt="logo" />
          <NavBar>
            <NavButton>활동 찾기</NavButton>
            <NavButton onClick={() => navigate("/TeamLounge/Search")}>
              팀원 라운지
            </NavButton>
            <NavButton>팀 관리</NavButton>
            <NavButton onClick={() => navigate("/Mypage")}>
              마이페이지
            </NavButton>
            <NavButton onClick={handleLogoutMsg}>로그아웃</NavButton>
          </NavBar>
        </div>
        <div className={styles.phrases}>
          <p>
            채움이 있는 대학생활,
            <br />
            필유인 입니다.
          </p>
          <p>나의 이력을 관리하고 원하는 팀을 구성할 수 있어요</p>
        </div>
        <input placeholder="원하는 공모전, 대회 등을 입력해보세요" />
        <div className={styles.profile}>
          <img src="img/profileImgSample.jpeg" alt="profileImg" />
          <p className={styles.name}>석예슬</p>
          <p className={styles.academicInfo}>
            한동대학교 콘텐츠융합디자인 학부 8학기
          </p>
          <p className={styles.academicInfo}>tjsrb439@handong.ac.kr</p>
        </div>
      </div>

      <div className={styles.grid}>
        {/* <div className={styles.announcement}>
          <h4>교내공지</h4>
          <ol className={styles.flex2}>
            <div>
              <li>2024 SW 페스티벌 개최 안내</li>
              <li>2024 SW 창업 경진 대회 안내</li>
            </div>
            <div>
              <li>THE CEO 공모전 안내</li>
              <li>제 2회 학생 주도형 SW 해커톤 경진 대회</li>
            </div>
            <div>
              <li>KT AIVLE School 4기 교육학교 추천</li>
              <li>대경권 SW 산학 프로젝트 경진대회</li>
            </div>
            <div>
              <li>제 10회 소개딩 안내</li>
              <li>트레이딩 머신 프로젝트</li>
            </div>
          </ol>
        </div>
        <div></div> */}
        <img src="img/mainImg.png" alt="img" />
      </div>
    </div>
  );
}

export default MainPage;

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
