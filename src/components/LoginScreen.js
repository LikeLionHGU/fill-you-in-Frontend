import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { GoogleOAuthProvider } from "@react-oauth/google";

import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google"; // login    버튼
import loginScreen from "../img/loginPageChara.svg";

const Container = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
`;

const SecondContainer = styled.div`
  background-color: #ffffff;
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 55vw;

  > div {
    background-color: #ffffff;
    height: 100%;

    position: relative;
    width: 100%;
  }
  > div > .google-login-btn {
    // 구글버튼 디자인 이미 주어져서 아직
    height: 200px;
    background-color: black;
    position: absolute;
    /* left: 1000px; */
  }
`;
const ContainerNonImg = styled.div`
  display: flex;
`;
const ContainerImg = styled.div`
  display: flex;
  justify-content: end;
  align-items: end;
`;

const LoginImg = styled.div`
  display: flex;

  /* border: 2px solid green; */
  > img {
    width: 100%;
  }
`;
const Header = styled.div`
  display: flex;

  width: 100vw;

  height: 100px;

  > img {
    // 로고 이미지
    margin-left: 3.8vw;
    margin-top: 1.67vw;
    height: 62px;
    width: 232px;
  }
`;
const TextWrapper = styled.div`
  display: flex;
  color: #06b5b5;
  font-family: "Pretendard-Bold", Helvetica;
  font-size: 70px;
  font-weight: 700;

  left: 103px;
  letter-spacing: 0;

  position: absolute;

  top: 182px;
`;

const ShortP = styled.p`
  color: #06b5b5;
  font-family: "Pretendard-SemiBold", Helvetica;
  font-size: 25px;
  font-weight: 600;
  height: 30px;
  left: 103px;
  letter-spacing: 0;
  line-height: normal;
  position: absolute;

  top: 380px;
  white-space: nowrap;
`;

const LoginGroup = styled.div`
  height: 56px;
  left: 98px;
  position: absolute;

  top: 470px;
  width: 291px;
  &:hover {
    cursor: pointer;
  }

  > .overlap-group {
    background-color: #06b5b5;
    border-radius: 28px;
    height: 56px;
    position: relative;
    width: 289px;
    transition: 0.2s;
    &:hover {
      background-color: black;
      cursor: pointer;
    }
  }
  > .overlap-group > .text-wrapper-2 {
    color: #ffffff;
    font-family: "Pretendard-SemiBold", Helvetica;
    font-size: 25px;
    font-weight: 600;
    height: 30px;
    left: 75px;
    letter-spacing: 0;
    line-height: normal;
    position: absolute;
    top: 13px;
    white-space: nowrap;
  }
  > .overlap-group > .google-logo {
    height: 36px;
    left: 27px;
    object-fit: cover;
    position: absolute;
    top: 10px;
    width: 36px;
  }
`;

const googleButton = () => {
  console.log("BUTTON CLICKEd");
};

export const LoginScreen = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const getLoginData = async (credentialIdToken) => {
    const url = process.env.REACT_APP_BACK_URL + "/api/fillyouin/auth/login"; // 백엔드 api url

    const token = credentialIdToken;

    const data = {
      googleIdToken: token, // 백으로 넘겨줄 credential 토큰
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error(`HTTP Error! Status: ${response.status}`);
      }

      const responseData = await response.json();

      if (responseData.jwt) {
        // console.log("jwt 존재함");
        localStorage.setItem("loginToken", responseData.jwt); // 로컬에 해당 Jwt를 저장해줌
      }
    } catch (error) {
      console.error("error", error);
      alert("로그인에 오류가 발생했습니다. 다시 시도해주세요");
      navigate("/");
    }
  };
  const navigate = useNavigate();
  let loginToken = localStorage.getItem("loginToken");
  const checkLogin = () => {
    if (loginToken) setLoggedIn(true);
    else setLoggedIn(false);
  };
  useEffect(() => {
    checkLogin();
  }, []);

  return loggedIn ? (
    navigate("/MainPage") // 만약 로그인 된 상태라면
  ) : (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENTID}>
      <Container>
        <SecondContainer className="index">
          <ContainerNonImg>
            <div>
              <Header>
                <img
                  className="fill-you-in-logo"
                  src="https://cdn.animaapp.com/projects/65c5a7d8d4b749ab51e73dc0/releases/65c5a8a67211e272ff217379/img/--@2x.png"
                  alt="logoImg"
                />
              </Header>
              <TextWrapper>
                채움이 있는 대학생활,
                <br />
                필유인 입니다.
              </TextWrapper>
              <ShortP>
                나의 이력을 관리하고 원하는 팀을 구성할 수 있어요.
              </ShortP>

              <LoginGroup onClick={googleButton}>
                <GoogleLogin
                  className="google-login-btn"
                  onSuccess={(credentialResponse) => {
                    getLoginData(credentialResponse.credential).then(() => {
                      navigate("/MainPage");
                    }); // 로그인 성공하면 유저 credential 정보를 넘겨줌
                  }}
                  onError={() => {
                    console.log("loginToken: ", loginToken);
                    alert("로그인에 실패했습니다. 다시 시도해주세요");
                    navigate("/");
                    console.log("Login Failed");
                  }}
                />
              </LoginGroup>
            </div>
          </ContainerNonImg>
        </SecondContainer>

        <ContainerImg>
          <LoginImg>
            <img src={loginScreen} alt="loginimg" />
          </LoginImg>
        </ContainerImg>
      </Container>
    </GoogleOAuthProvider>
  );
};
export default LoginScreen;
