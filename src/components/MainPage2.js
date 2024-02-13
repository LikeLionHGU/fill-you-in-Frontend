import React from "react";
import styles from "./MainPage2.module.css";

function MainPage2() {
  return (
    <div className={styles.mainpage2}>
      <div className={styles.section1}>
        <div className={styles.flex1}>
          <img src="/img/fill-you-in-logo.png" alt="logo" />
          <div className={styles.navigation}>
            <a href="#!">활동찾기</a>
            <a href="#!">팀원 라운지</a>
            <a href="#!">팀 관리</a>
            <a href="#!">마이페이지</a>
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
      <div className={styles.announcement}>
        <h4>교내공지</h4>
        <ol className={styles.flex2}>
          <div>
            <li>2024 SW 페스티벌 개최 안내</li>
            <li>2024 SW 창업 경진 대회 안내</li>
            <li>실전! 머신러닝 문제해결 캠프 안내</li>
          </div>
          <div>
            <li>THE CEO 공모전 안내</li>
            <li>제 2회 학생 주도형 SW 해커톤 경진 대회</li>
            <li>트레이딩 머신 프로젝트</li>
          </div>
          <div>
            <li>KT AIVLE School 4기 교육학교 추천</li>
            <li>대경권 SW 산학 프로젝트 경진대회</li>
            <li>제 10회 소개팅 안내</li>
          </div>
        </ol>
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
    </div>
  );
}

export default MainPage2;
