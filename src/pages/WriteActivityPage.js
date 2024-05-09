import React, { useState } from "react";
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
  // const [folderInfo, setFolderInfo] = useState({
  //   name: "",
  //   date: "",
  // }); // 폴더 이름과 생성 날짜를 관리하는 useState

  return (
    <>
      <NavigationBar />
      <Wrapper>
        <SideBar />
        <AddArea>
          <p> ***님, 안녕하세요!</p>
          <FolderComponent FolderInfo={FolderInfo} />
          <AddBtnComponent />
        </AddArea>
      </Wrapper>
    </>
  );
}

const FolderInfo = [
  {
    name: "멋쟁이사자처럼",
    date: "2024.04.26",
  },
  {
    name: "YMC",
    date: "2024.05.05",
  },
  {
    name: "PARD",
    date: "2024.03.09",
  },
];
