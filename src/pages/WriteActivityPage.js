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

/////////// AddArea 부터 내가 구현해야 할 부분
const AddArea = styled.div`
  width: 80vw;
  border: solid 1px red;
  display: flex;
  flex-direction: column;

  > p {
    margin-left: 5.8vw;
    margin-top: 3.5vh;
    font-family: "Pretendard-SemiBold";
    font-size: 20px;
  }

  > .folderWrapper {
    padding-left: 70px;
    margin-top: 50px;
    display: flex;
    gap: 20px 5%; // 세로, 가로 -> Flex Item 행간(세로) 간격은 균일하고, 가로는 Container의 크기에 따라 유동적으로 변하는 레이아웃
    flex-wrap: wrap; // 복수의 행
  }
`;

export default function WriteActivityPage() {
  const [folderInfo, setFolderInfo] = useState([
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
    {
      name: "test1",
      date: "2000.01.01",
    },
  ]); // 폴더 이름과 생성 날짜를 관리하는 useState

  return (
    <>
      <NavigationBar />
      <Wrapper>
        <SideBar />
        <AddArea>
          <p> ***님, 안녕하세요!</p>
          <div className="folderWrapper">
            <FolderComponent folderInfo={folderInfo} />
          </div>
          <AddBtnComponent
            folderInfo={folderInfo}
            setFolderInfo={setFolderInfo}
          />
        </AddArea>
      </Wrapper>
    </>
  );
}
