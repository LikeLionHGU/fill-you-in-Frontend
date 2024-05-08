import React from "react";
import styled from "styled-components";
import "../font/font.module.css";
import "../components/WriteActivity/FolderComponent";
import FolderComponent from "../components/WriteActivity/FolderComponent";
import AddBtnComponent from "../components/WriteActivity/AddBtnComponent";

const Wrapper = styled.div`
  display: flex;
`;

const NavigationBar = styled.div`
  border: 1px solid blue;
  width: 100vw;
  height: 17vh;
`;
const SideBar = styled.div`
  width: 20vw;
  min-height: 83vh;
  border: 1px solid black;
`;

const AddArea = styled.div`
  width: 80vw;
  border: solid 1px red;

  > p {
    margin-left: 5.8vw;
    margin-top: 3.5vh;
    font-family: "Pretendard-SemiBold";
    font-size: 20px;
  }
`;

export default function WriteActivityPage() {
  return (
    <>
      <NavigationBar />
      <Wrapper>
        <SideBar />
        <AddArea>
          <p> ***님, 안녕하세요!</p>
          <FolderComponent name="멋쟁이 사자처럼" date="2024.04.28" />
          <AddBtnComponent />
        </AddArea>
      </Wrapper>
    </>
  );
}
