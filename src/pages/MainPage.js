import { useNavigate } from "react-router-dom";
import styles from "../components/MainPage.module.css";
import styled from "styled-components";

import HeaderComponent from "../components/MainPage/HeaderComponent";
import { ProfileComponent } from "../components/MainPage/ProfileComponent";
import { Link } from "react-scroll";
import { useEffect, useState } from "react";

export default function MainPage() {
  const CheckLogin = () => {
    if (!localStorage.getItem("loginToken")) {
      alert("문제가 발생했습니다. 로그인 페이지로 이동합니다");
      localStorage.getItem("loginToken");
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

      localStorage.setItem("userName", responseData.lastName);
    } catch (error) {
      console.error("error", error);
    }
  };

  useEffect(() => {
    CheckLogin();
    getProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
          <p>나의 경험을 기록하고 다양한 사람들과 소통을 할 수 있어요</p>
        </div>
        <input placeholder="공모전, 대회 등 다양한 경험을 입력해보세요" />
        <Link to="mainImg" spy={true} smooth={true}>
          <button className={styles.move} style={{ cursor: "pointer" }}>
            <img src="img/move.png" alt="img" />
          </button>
        </Link>
      </div>
      <ProfileComponent post={post} />
      <div className={styles.grid} style={{ position: "relative" }}>
        <img src="img/mainUpper.jpg" alt="img" />
        <NavigateBtn onClick={() => navigate("/TeamLounge/Search")}>
          나에게 맞는 팀원 찾기
        </NavigateBtn>
        <img src="img/mainDown.jpg" alt="img" id="mainImg" />
      </div>
    </div>
  );
}

// const Wrapper = styled.div`
//   margin-top: 10px;
// `;

const NavigateBtn = styled.button`
  position: absolute;
  left: 50%;
  bottom: 10%;
  transform: translate(-50%, -50%);
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
