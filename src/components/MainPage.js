import { useNavigate } from "react-router-dom";
import styles from "./MainPage.module.css";

import styled from "styled-components";

import profileSample from "../img/profileSample.png";
import { Link } from "react-scroll";
import { useEffect, useState } from "react";

const ProfilePicture = ({ src }) => {
  return (
    <>
      <img src={src} alt="profImg" />
    </>
  );
};

function MainPage() {
  const handleLogoutMsg = () => {
    ///// < = jwt를 백엔드로 계속 보내면서 확인해야할듯
    if (window.confirm("로그아웃 하시겠습니까?")) {
      localStorage.removeItem("loginToken"); // 로그인 토큰 제거
      navigate("/");
    }
  };
  const CheckLogin = () => {
    if (!localStorage.getItem("loginToken")) {
      alert("문제가 발생했습니다. 로그인 페이지로 이동합니다");
      localStorage.getItem("loginToken");
      navigate("/");
    }
  };
  useEffect(() => {
    console.log("CHECK LOGIN");
    CheckLogin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const navigate = useNavigate();
  const [post, setPost] = useState({
    firstName: "",
    lastName: "",
    semester: "",
    department: "",
    profileImageUrl: "",
    email: "",
  });

  const getProfile = async () => {
    const url =
      process.env.REACT_APP_BACK_URL +
      "/api/fillyouin/members/my-simple-profile-card"; // 백엔드 api url => 각 페이지에서 요구하는 api 주소에 맞게 바꿔써줘야함.

    try {
      const response = await fetch(url, {
        method: "GET", //(+ GET인지 POST인지 명세 확인)
        headers: {
          Authorization: "Bearer " + localStorage.getItem("loginToken"), // Bearer 토큰으로 요청
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP 에러 Status: ${response.status}`);
      }
      const responseData = await response.json();
      setPost({
        firstName: responseData.firstName,
        lastName: responseData.lastName,
        semester: responseData.semester,
        department: responseData.department,
        profileImageUrl: responseData.profileImageUrl,
        email: responseData.email,
      });
    } catch (error) {
      console.error("error", error);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <div className={styles.mainpage2}>
      <div className={styles.section1}>
        <div className={styles.flex1}>
          <div className="div1">
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
                <NavButton onClick={() => navigate("/Mypage")}>
                  마이페이지
                </NavButton>
                <NavButton onClick={handleLogoutMsg}>로그아웃</NavButton>
              </NavBar>
            </TopBackground>
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
        <div className={styles.profile}>
          <>
            <>
              {(!post?.profileImageUrl && post?.profileImageUrl === null) ||
              post?.profileImageUrl === undefined ? (
                <>
                  {console.log("no profile", post?.profileImageUrl)}
                  <ProfilePicture src={profileSample} />
                </>
              ) : (
                <>
                  <ProfilePicture src={post?.profileImageUrl} />
                </>
              )}
            </>
          </>
          <TextWrapper>
            <p className={styles.name}>
              {post.firstName} {post.lastName}
            </p>
            <p className={styles.academicInfo}>
              한동대학교 {post.department} {post.semester}학기
            </p>
            <p className={styles.academicInfo}>{post.email}</p>
          </TextWrapper>
        </div>
        <Link to="mainImg" spy={true} smooth={true}>
          <button className={styles.move}>
            <img src="img/move.png" alt="img" />
          </button>
        </Link>
      </div>

      <div className={styles.grid}>
        <div className={styles.announcement}>
          <h4>교내공지</h4>
          <div className={styles.flex2}>
            <div>
              <div className={styles.news}>
                <p>01</p>
                <p>2024 SW 페스티벌 개최 안내</p>
              </div>
              <div className={styles.news}>
                <p>02</p>
                <p>2024 SW 창업 경진 대회 안내</p>
              </div>
            </div>
            <div>
              <div className={styles.news}>
                <p>03</p>
                <p>THE CEO 공모전 안내</p>
              </div>
              <div className={styles.news}>
                <p>04</p>
                <p>제 2회 학생 주도형 SW 해커톤 경진 대회</p>
              </div>
            </div>
            <div>
              <div className={styles.news}>
                <p>05</p>
                <p>KT AIVLE School 4기 교육학교 추천</p>
              </div>
              <div className={styles.news}>
                <p>06</p>
                <p>대경권 SW 산학 프로젝트 경진대회</p>
              </div>
            </div>
            <div>
              <div className={styles.news}>
                <p>07</p>
                <p>제 10회 소개딩 안내</p>
              </div>
              <div className={styles.news}>
                <p>08</p>
                <p>트레이딩 머신 프로젝트</p>
              </div>
            </div>
          </div>
        </div>
        <img src="img/mainImg.png" alt="img" id="mainImg" />
      </div>
    </div>
  );
}

export default MainPage;
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

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > p {
    margin-bottom: 0px;
  }
`;
