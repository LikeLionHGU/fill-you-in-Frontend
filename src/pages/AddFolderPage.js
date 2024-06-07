import styled from "styled-components";
import "../font/font.module.css";
import "../components/AddFolder/FolderComponent";
import FolderComponent from "../components/AddFolder/FolderComponent";
import AddBtnComponent from "../components/AddFolder/AddBtnComponent";
import Sidebar from "../components/ArchiveTimelineSidebar";
import RenameModalComponent from "../components/AddFolder/RenameModalComponent";
import DeleteModalComponent from "../components/AddFolder/DeleteModalComponent";
import WhiteNavBtns from "../components/WhiteNavBtns";
import { useRecoilState } from "recoil";
import { folderInfoState, categoryIDState } from "../components/atom";
import { useEffect } from "react";
import { GetFirstInfo } from "../components/AddFolder/Api";
import { useParams } from "react-router-dom";

const Wrapper = styled.div`
  display: flex;
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
  const [folderInfo, setFolderInfo] = useRecoilState(folderInfoState);
  const [categoryID, setCategoryID] = useRecoilState(categoryIDState);

  const { categoryId } = useParams();

  const userName = localStorage.getItem("userName");

  const getFolderInfo = async () => {
    if (!categoryID) return;
    const url =
      process.env.REACT_APP_BACK_URL +
      `/api/fillyouin/categories/${categoryID}/folders`; //id는 recoil로 쓰기..?

    try {
      const response = await fetch(url, {
        method: "GET", //(+ GET인지 POST인지 명세 확인)
        headers: {
          Authorization: "Bearer " + localStorage.getItem("loginToken"), // Bearer 토큰으로 요청
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP Error! Status: ${response.status}`);
      }
      const responseData = await response.json();
      const variable = responseData.folders.map((item) => ({
        name: item.name,
        id: item.id,
      }));
      setFolderInfo(variable);
    } catch (error) {
      console.error("error", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const firstCategoryID = await GetFirstInfo();
      if (firstCategoryID) {
        setCategoryID(firstCategoryID);
      }
    };
    if (categoryId === undefined) {
      fetchData();
    }
  }, []);

  useEffect(() => {
    getFolderInfo();
  }, [categoryID]);

  if (!categoryID)
    return (
      <div>
        {/* <div
          style={{
            display: "flex",
            width: "100%",
            height: "100%",
            fontSize: "50px",
            textAlign: "center",
            textJustify: "center",
          }}
        >
          Loading...
        </div> */}
      </div>
    );

  return (
    <>
      <WhiteNavBtns img="blue" />
      <Wrapper>
        <Sidebar />
        <AddArea>
          <p>{userName} 님, 안녕하세요!</p>
          <div className="folderWrapper">
            <AddBtnComponent />
            <FolderComponent categoryId={categoryID} />
          </div>
        </AddArea>
      </Wrapper>
      <RenameModalComponent />
      <DeleteModalComponent />
    </>
  );
}
