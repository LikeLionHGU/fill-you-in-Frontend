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
        throw new Error(`HTTP Error! Status: ${response.status}`);
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
      console.log("Server Response", responseData); // 받아온 데이터를 콘솔로 확인
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
              {/* <img src={post.profileImageUrl} alt="img" /> */}
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
        <img src="img/mainImg.png" alt="img" id="mainImg" />
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

const ImgContainer = styled.div`
  display: flex;

  justify-content: center;
  width: 25.2vw;
  height: 47vh;
  position: absolute;
  top: 22%;
  left: 4%;
  background-color: white;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;

  box-shadow: 0px 0px 10px gray;
`;
const ImageWrapper = styled.div`
  display: flex;
  width: 160px;
  height: 160px;
  margin-top: 50px;
  border: 2px solid red;
  background-color: #e8e8e8;
  border-radius: 145px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden; //

  > img {
    width: 150px;
    height: 150px;
    border-radius: 150px;
    margin: 0px;
  }
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
