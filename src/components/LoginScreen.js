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
    /*  */
    height: 100%;
    /* overflow: hidden; */
    /*   오버플로우가 Hidden이면 그거 오른쪽에 있는 디자인들이 사라지게됨... 크기 줄여서 맞추던가 해야할듯*/
    position: relative;
    width: 100%;
  }
`;

const Header = styled.div`
  display: flex;
  /* align-items: center; */
  width: 100vw;
  height: 100px;
  /* border: 2px solid blue; */
  > img {
    margin-left: 3.8vw;
    margin-top: 1.67vw;
    /* left: 54px;
    position: absolute;
    top: 32px; */
    height: 62px;
    width: 232px;
  }
  > .fill-you-in-logo {
    //fill you in logo
    /* border: 2px solid red; */
  }
`;
const TextWrapper = styled.div`
  display: flex;
  color: #06b5b5;
  font-family: "Pretendard-Bold", Helvetica;
  font-size: 70px;
  font-weight: 700;
  /* margin-left: 10%;
  margin-top: 10%; */
  left: 103px;
  letter-spacing: 0;
  /* line-height: 120px; */
  position: absolute;
  /* top: 217px; */
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
  /* top: 498px; */
  /* top: 430px; */
  top: 380px;
  white-space: nowrap;
`;

const Bubbles = styled.div`
  /* height: 909px; */
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
    /* 
        top: 269px;
        height: 263px;
    width: 263px; */
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

    /*top: 551px;
     height: 358px;
    width: 358px; */
    /* top: 488px; */
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
    /* height: 459px;
    width: 459px; */
    /* height: 396px;
    width: 396px; */
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

    /* 
     top: 381px;
     height: 355px;
    width: 355px; */
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
    /* 
      left: 0;
     top: 381px;
     height: 225px;
    width: 225px; */
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
  /* top: 560px; */
  /* top: 525px; */
  top: 470px;
  width: 291px;

  > .overlap-group {
    background-color: #06b5b5;
    border-radius: 28px;
    height: 56px;
    position: relative;
    width: 289px;
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
          {/* <div className="text-wrapper"> */}
          채움이 있는 대학생활,
          <br />
          필유인 입니다.
          {/* </div> */}
        </TextWrapper>

        {/* <p className="p"> */}
        <ShortP>나의 이력을 관리하고 원하는 팀을 구성할 수 있어요.</ShortP>
        {/* <div className="overlap"> */}
        <Bubbles>
          <div className="ellipse" />
          <div className="ellipse-2" />
          <div className="ellipse-3" />
          <div className="ellipse-4" />
          <div className="ellipse-5" />
        </Bubbles>
        {/* </div> */}
        <LoginGroup>
          {/* <LoginGroup className="group"> */}
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
