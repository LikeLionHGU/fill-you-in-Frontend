import React from "react";
import styles from "./MainPage2.module.css";

function MainPage2() {
  return (
    <div className={styles.mainpage2}>
      <div className={styles.section1}>
        <div className={styles.flex1}>
          <img src="/img/fill-you-in-logo.png" alt="logo" />
          <div className={styles.navigation}>
            <a href="#">활동찾기</a>
            <a href="#">팀원 라운지</a>
            <a href="#">팀 관리</a>
            <a href="#">마이페이지</a>
            <button>로그아웃</button>
          </div>
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
      </div>
      <div className={styles.profile}>
        <img src="img/profileImgSample.jpeg" alt="profileImg" />
        <p className={styles.name}>석예슬</p>
        <p className={styles.academicInfo}>
          한동대학교 콘텐츠융합디자인 학부 8학기
        </p>
        <div className={styles.info}>
          <p>
            <span className={styles.subHeading}>관심분야</span>
            <span>UX/UI 디자이너</span>
          </p>
          <p>
            <span className={styles.subHeading}>희망직무</span>
            <span>프로덕트 디자이너</span>
          </p>
          <p>
            <span className={styles.subHeading}>자기소개</span>
            <span>
              열정을 가지고 매 순간 최선을 다하는 디자이너 입니다. 많은 관심
              부탁 드려요
            </span>
          </p>
        </div>
      </div>
      <div className={styles.announcement}>교내공지</div>
      <div className={styles.section2}>
        팀원이 찾기 막막할 땐 우리가 도와줄게
      </div>
    </div>
  );
}

export default MainPage2;
