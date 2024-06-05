import styled from "styled-components";
import "../font/font.module.css";
import "../components/AddFolder/FolderComponent";
import FolderComponent from "../components/AddFolder/FolderComponent";
import AddBtnComponent from "../components/AddFolder/AddBtnComponent";
import Sidebar from "../components/ArchiveTimelineSidebar";
import RenameModalComponent from "../components/AddFolder/RenameModalComponent";
import DeleteModalComponent from "../components/AddFolder/DeleteModalComponent";
import WhiteNavBtns from "../components/WhiteNavBtns";

const Wrapper = styled.div`
  display: flex;
  /* margin-top: 30px; */
`;

/////////// AddArea 부터 내가 구현해야 할 부분
const AddArea = styled.div`
  width: 80vw;
  display: flex;
  flex-direction: column;
  position: relative;
  min-height: 83vh;
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
    gap: 40px 5.5%; // 세로, 가로 -> Flex Item 행간(세로) 간격은 균일하고, 가로는 Container의 크기에 따라 유동적으로 변하는 레이아웃
    flex-wrap: wrap; // 복수의 행
  }
`;

export default function AddFolderPage() {
  return (
    <>
      <WhiteNavBtns />
      <Wrapper>
        <Sidebar />
        <AddArea>
          <p> 한선규 님, 안녕하세요!</p>
          <div className="folderWrapper">
            <AddBtnComponent />
            <FolderComponent />
          </div>
        </AddArea>
      </Wrapper>
      <RenameModalComponent />
      <DeleteModalComponent />
    </>
  );
}
