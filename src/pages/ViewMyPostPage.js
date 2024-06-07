import React, { useEffect, useState } from "react";
import "../../src/font/font.module.css";
import WhiteNavBtns from "../components/WhiteNavBtns";
import ArchiveTimelineSidebar from "../components/ArchiveTimelineSidebar";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import loginScreen from "../img/loginPageChara.svg";
import { useRecoilState } from "recoil";
import { eventInfoState } from "../components/atom";
import EventComponent from "../components/ViewMyPost/EventComponent";
import WritePostModal from "../components/WritePostModal";

export default function ViewMyPostPage() {
  const [eventInfo, setEventInfo] = useRecoilState(eventInfoState);
  const { id } = useParams();
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const showModal = () => {
    setModalOpen(true);
  };
  const getEventInfo = async () => {
    const url =
      process.env.REACT_APP_BACK_URL + `/api/fillyouin/folders/${id}/events`;

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
      const variable = responseData.events.map((item) => ({
        id: item.id,
        title: item.title,
        createdDate: item.createdDate,
        mainText: item.mainText,
        imageUrl: item.imageUrl,
      }));
      setEventInfo(variable);
      console.log(variable);
    } catch (error) {
      console.error("error", error);
    }
  };

  useEffect(() => {
    getEventInfo();
  }, []);
  return (
    <>
      <WhiteNavBtns img="blue" />
      <Wrapper>
        <Sidebar>
          <ArchiveTimelineSidebar />
        </Sidebar>
        <ViewListContainer>
          <Nav>
            {modalOpen && <WritePostModal setModalOpen={setModalOpen} />}
            <button onClick={() => navigate(`/AddFolderPage?${categoryId}`)}>
              뒤로가기
            </button>
            <h3>멋쟁이 사자처럼</h3>
            <button onClick={showModal}>추가하기</button>
          </Nav>
          <EventComponent />
          <ListWrapper>
            <Post>
              <PostThumbnail>
                <img src={loginScreen} alt="thumbnail" />
              </PostThumbnail>
              <PostTextsBox>
                <PostTitle>멋쟁이사자 아이디어톤, 본선 진출!</PostTitle>
                <PostContent>
                  홀리데이 해커톤에서 사이드 프로젝트를 했습니다! 저는
                  기획자로서 멋쟁이 사자처럼에서 ...
                </PostContent>
                <PostDate>2023.06.03</PostDate>
              </PostTextsBox>
            </Post>
            <Post>
              <PostThumbnail>
                <img src={loginScreen} alt="thumbnail" />
              </PostThumbnail>
              <PostTextsBox>
                <PostTitle>멋쟁이사자 아이디어톤, 본선 진출!</PostTitle>
                <PostContent>
                  홀리데이 해커톤에서 사이드 프로젝트를 했습니다! 저는
                  기획자로서 멋쟁이 사자처럼에서 ...
                </PostContent>
                <PostDate>2023.06.03</PostDate>
              </PostTextsBox>
            </Post>
            <Post>
              <PostThumbnail>
                <img src={loginScreen} alt="thumbnail" />
              </PostThumbnail>
              <PostTextsBox>
                <PostTitle>멋쟁이사자 아이디어톤, 본선 진출!</PostTitle>
                <PostContent>
                  홀리데이 해커톤에서 사이드 프로젝트를 했습니다! 저는
                  기획자로서 멋쟁이 사자처럼에서 ...
                </PostContent>
                <PostDate>2023.06.03</PostDate>
              </PostTextsBox>
            </Post>
          </ListWrapper>
        </ViewListContainer>
      </Wrapper>
    </>
  );
}
const Sidebar = styled.div`
  display: flex;
  border: 2px solid purple;
`;
const ViewListContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  border: 2px solid pink;
  padding-left: 5%;
  padding-right: 5%;
  /* height: 100%; */
`;
const ListWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;
  height: 100%;
  /* border: 2px solid green; */
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
  border: 2px solid red;
`;

const Nav = styled.div`
  display: flex;
  flex-direction: row;
  /* margin: 30px 50px 50px; */
  padding-bottom: 15px;
  width: 100%;

  justify-content: space-around;
  align-items: center;
  border-bottom: 2px solid black;
  /* border: 2px solid blue; */

  > h3 {
    font-family: "Pretendard-SemiBold";
  }
`;

const Post = styled.div`
  display: flex;
  justify-content: space-between;
  width: 47%;
  /* border: 2px solid gold; */
  border-bottom: 2px solid lightgray;
  padding-top: 20px;
  padding-bottom: 20px;
`;

const PostThumbnail = styled.div`
  display: flex;
  width: 90px;
  height: 90px;
  padding: 10px 10px;
  border: 2px solid gray;
`;
const PostTextsBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  /* border: 2px solid red; */
  margin-top: 6px;
`;
const PostTitle = styled.div`
  display: flex;
  font-weight: bold;
  font-size: 14px;
  height: 22%;
  /* border: 2px solid orange; */
`;
const PostContent = styled.div`
  display: flex;
  align-items: center;
  color: gray;
  font-size: 13px;
  height: 60%;
  /* border: 2px solid cyan; */
`;
const PostDate = styled.div`
  display: flex;
  align-items: end;
  color: gray;
  font-size: 12px;
  height: 19%;
  margin-bottom: 0px;

  /* border: 1px solid black; */
`;
