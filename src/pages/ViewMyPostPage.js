import React from "react";
import "../../src/font/font.module.css";
import WhiteNavBtns from "../components/WhiteNavBtns";
import ArchiveTimelineSidebar from "../components/ArchiveTimelineSidebar";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  align-items: baseline;
`;

const Nav = styled.div`
  margin: 30px 50px 50px;
  padding-bottom: 15px;
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-bottom: 1px solid black;

  > h3 {
    font-family: "Pretendard-SemiBold";
  }
`;
export default function ViewMyPostPage() {
  return (
    <>
      <WhiteNavBtns img="blue" />
      <Wrapper>
        <ArchiveTimelineSidebar />
        <Nav>
          <button>뒤로가기</button>
          <h3>멋쟁이 사자처럼</h3>
          <button>추가하기</button>
        </Nav>
      </Wrapper>
    </>
  );
}
