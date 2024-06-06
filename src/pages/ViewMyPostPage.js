import React from "react";
import "../../src/font/font.module.css";
import WhiteNavBtns from "../components/WhiteNavBtns";
import ArchiveTimelineSidebar from "../components/ArchiveTimelineSidebar";
import styled from "styled-components";
import loginScreen from "../img/loginPageChara.svg";
export default function ViewMyPostPage() {
  return (
    <>
      <WhiteNavBtns img="blue" />
      <Wrapper>
        <Sidebar>
          <ArchiveTimelineSidebar />
        </Sidebar>
        <ViewListContainer>
          <Nav>
            <button>뒤로가기</button>
            <h3>멋쟁이 사자처럼</h3>
            <button>추가하기</button>
          </Nav>
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
