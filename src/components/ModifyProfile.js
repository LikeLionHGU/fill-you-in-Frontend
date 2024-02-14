import React from "react";
import styled from "styled-components";

const ModalBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(5px);
`;

const Container = styled.div`
  width: 67vw;
  height: 65vh;
  z-index: 100;
  position: absolute;
  top: 500px;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  border: 1px solid black;
  border-radius: 80px;
`;

const Title = styled.p`
  font-weight: bold;
  font-size: 28px;
  text-align: center;
  color: #005f5f;
`;

const Section1 = styled.div`
  width: 16vw;
  height: 11.5vh;
  border: solid 1px black;
`;

function ModifyProfile() {
  return (
    <ModalBackground>
      <Container>
        <Title>프로필 수정</Title>
        <Section1>이름</Section1>
      </Container>
    </ModalBackground>
  );
}

export default ModifyProfile;
