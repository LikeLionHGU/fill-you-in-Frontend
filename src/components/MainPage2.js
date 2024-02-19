import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./MainPage2.module.css";
import ModifyProfile from "./ModifyProfile";

import styled from "styled-components";

function MainPage2() {
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
            <NavButton>팀원 라운지</NavButton>
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
        <div></div>
        <div className={styles.announcement}>
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
        <div></div>
      </div>
      <div className={styles.section2}>
        <p>
          팀원이 찾기 막막할 땐<br /> 우리가 도와줄게
        </p>
        <p>
          필유인은 교내활동부터 교외활동까지 다양한 여정을 함께 할 최적의 팀원을
          찾아드립니다
        </p>
        <img src="img/fill-you-in-logo-blue.png" alt="logo" />
      </div>
      <div className={styles.section3}>
        <div className={styles.whiteCircle}>
          <img src="img/Line 122.png" alt="line" className={styles.line122} />
          <div className={styles.circle1}></div>
          <div className={styles.circle2}>
            <div className={styles.circle3}></div>
            <p className={styles.title}>
              채움이 있는
              <br />
              대학생활
            </p>
            <p className={styles.explanation}>
              이력관리의 불편함
              <br />
              팀원 모집과 대외활동 참여의 어려움
            </p>
          </div>
          <img src="img/Line 123.png" alt="line" className={styles.line123} />
        </div>

        <div className={styles.blueCircle}>
          <div className={styles.circle1}>
            <p className={styles.title}>필유인</p>
          </div>
          <p className={styles.explanation}>
            필유인과 함께 나에게 필요한 교내 및 교외활동을
            <br />
            원하는 사람들과 참여해보세요
          </p>
        </div>

        <div className={styles.frame}>
          <div className={styles.frame1}>
            <p className={styles.title}>나의 이력을 간편하게</p>
            <p className={styles.explanation}>
              필유인으로 수업 수강내역, 활동 및<br />
              수상내역을 쉽게 관리해보세요
            </p>
          </div>
          <div className={styles.frame2}>
            <p className={styles.title}>나의 활동을 가득차게</p>
            <p className={styles.explanation}>
              나에게 필요한 교내 및 교외활동을
              <br />
              원하는 사람들과 참여해보세요
            </p>
          </div>
          <div className={styles.frame3}>
            <p className={styles.title}>교내 네트워킹을 활발하게</p>
            <p className={styles.explanation}>
              교내 사람들의 프로필을 확인하고
              <br />
              직접 컨택하거나, 소통해보세요
            </p>
          </div>
        </div>

        <p className={styles.summary}>
          채움이 있는 대학생활,
          <br />
          필유인에서 경험할 수 있습니다
        </p>
        <button className={styles.findTeamMate}>나에게 맞는 팀원 찾기</button>
      </div>
      <div className={styles.footer}>
        <img src="img/fill-you-in-logo-blue.png" alt="logo" />
        <div className={styles.footerInfo}>
          <ul>
            <p>기업정보</p>
            <li>필유인 소개</li>
            <li>연혁</li>
            <li>Contact Us</li>
          </ul>
          <ul>
            <p>사업영역</p>
            <li>이용약관</li>
            <li>보호정책</li>
            <li>이용 규칙</li>
          </ul>
          <ul>
            <p>투자정보</p>
            <li>주식정보</li>
            <li>채무정보</li>
            <li>공시정보</li>
          </ul>
          <ul>
            <p>공지사항</p>
            <li>회사소식</li>
            <li>Q&A</li>
            <li>이용문의</li>
          </ul>
        </div>
        <div className={styles.footerInfo2}>
          <ul>
            <p>개인정보처리방침</p>
            <li>사이트맵</li>
            <li>제보하기</li>
          </ul>
        </div>
      </div>
      <div className={styles.modal}>
        <button onClick={showModal}>modal</button>
        {modalOpen && <ModifyProfile setModalOpen={setModalOpen} />}
      </div>
    </div>
  );
}

export default MainPage2;

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
