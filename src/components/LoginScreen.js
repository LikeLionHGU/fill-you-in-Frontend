import React from "react";
import styled from "styled-components";

const Container = styled.div`
  background-color: #ffffff;
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;

  > div {
    background-color: #ffffff;
    height: 100%;
    /* overflow: hidden; */
    position: relative;
    width: 100%;
  }
`;

const Header = styled.div`
  display: flex;

  width: 100vw;
  height: 100px;

  > img {
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

const Bubbles = styled.div`
  height: 660px;
  overflow: hidden;
  width: 52%;
  display: flex; //
  left: 50%;
  position: absolute;
  top: 12vw;

  > .ellipse {
    // bubble 1
    background: linear-gradient(
      180deg,
      rgb(9, 186, 186) 0%,
      rgba(14, 158, 158, 0.19) 96%
    );
    border-radius: 131.5px;

    left: 131px;
    position: absolute;

    transform: rotate(-125.11deg);
    overflow: hidden;
    top: 206px;
    height: 200px;
    width: 200px;
  }
  > .ellipse-2 {
    background: linear-gradient(
      180deg,
      rgb(9, 186, 186) 0%,
      rgba(14, 158, 158, 0.19) 96%
    );
    border-radius: 179px;
    left: 220px;
    position: absolute;
    top: 425px;
    height: 295px;
    width: 295px;
  }
  > .ellipse-3 {
    background: linear-gradient(
      180deg,
      rgb(9, 186, 186) 0%,
      rgba(14, 158, 158, 0.19) 96%
    );
    border-radius: 229.5px;

    left: 411px;
    position: absolute;
    top: 10px;
    height: 370px;
    width: 370px;
  }
  > .ellipse-4 {
    -webkit-backdrop-filter: blur(20px) brightness(100%);
    backdrop-filter: blur(20px) brightness(100%);
    background-color: #d9d9d91a;
    border-radius: 299px;
    box-shadow: inset -28.4px 28.4px 20px #ffffff1a, 0px 4px 20px #0000001a;

    left: 399px;
    position: absolute;

    top: 318px;
    height: 292px;
    width: 292px;
  }
  > .ellipse-5 {
    -webkit-backdrop-filter: blur(20px) brightness(100%);
    backdrop-filter: blur(20px) brightness(100%);
    background-color: #d9d9d91a;
    border-radius: 299px;
    box-shadow: inset -28.4px 28.4px 20px #ffffff1a, 0px 4px 20px #0000001a;
    position: absolute;
    left: 63px;
    top: 300px;
    height: 162px;
    width: 162px;
  }
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
  return (
    <Container className="index">
      <div>
        {/* <div className="div"> */}
        <Header>
          <img
            className="fill-you-in-logo"
            alt="Image"
            src="https://cdn.animaapp.com/projects/65c5a7d8d4b749ab51e73dc0/releases/65c5a8a67211e272ff217379/img/--@2x.png"
          />
        </Header>

        <TextWrapper>
          채움이 있는 대학생활,
          <br />
          필유인 입니다.
        </TextWrapper>
        <ShortP>나의 이력을 관리하고 원하는 팀을 구성할 수 있어요.</ShortP>
        <Bubbles>
          <div className="ellipse" />
          <div className="ellipse-2" />
          <div className="ellipse-3" />
          <div className="ellipse-4" />
          <div className="ellipse-5" />
        </Bubbles>
        <LoginGroup onClick={googleButton}>
          <div className="overlap-group">
            <div className="text-wrapper-2">Google로 로그인</div>
            <img
              className="google-logo"
              alt="Element"
              src="https://cdn.animaapp.com/projects/65c5a7d8d4b749ab51e73dc0/releases/65c5a8a67211e272ff217379/img/-------2-500-1.png"
            />
          </div>
        </LoginGroup>
      </div>
    </Container>
  );
};
export default LoginScreen;
