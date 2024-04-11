import { useNavigate } from "react-router-dom";
import styles from "./MainPage.module.css";

import styled from "styled-components";

import profileSample from "../img/profileSample.png";
import HeaderComponent from "../components/MainPage/HeaderComponent";
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
            <HeaderComponent />
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
            {/* <Wrapper> */}
            <p className={styles.academicInfo1}>
              한동대학교 {post.department} {post.semester}학기
            </p>
            <p className={styles.academicInfo}>{post.email}</p>
            {/* </Wrapper> */}
          </TextWrapper>
        </div>
        <Link to="mainImg" spy={true} smooth={true}>
          <button className={styles.move} style={{ cursor: "pointer" }}>
            <img src="img/move.png" alt="img" />
          </button>
        </Link>
      </div>

      <div className={styles.grid}>
        <img src="img/mainImg2.png" alt="img" />
        <img src="img/mainImg.png" alt="img" id="mainImg" />
      </div>
      <NavigateBtn onClick={() => navigate("/TeamLounge/Search")}>
        나에게 맞는 팀원 찾기
      </NavigateBtn>
    </div>
  );
}

export default MainPage;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > p {
    margin-bottom: 0px;
  }
`;

// const Wrapper = styled.div`
//   margin-top: 10px;
// `;

const NavigateBtn = styled.button`
  font-family: "Pretendard-Regular";
  font-size: 19px;
  color: white;
  background-color: #06b5b5;
  border: none;
  border-radius: 40px;
  width: 18vw;
  height: 43px;
  cursor: pointer;
`;
