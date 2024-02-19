import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import WhiteNavBtns from "./WhiteNavBtns";

//

const Container = styled.div`
  display: flex;
  flex-direction: row;

  font-family: "Pretendard-SemiBold", Helvetica;
`;
const SideBar = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  /* border: 2px solid red; */
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  width: 240px; // 전체화면에서 퍼센트..
  height: 100vh;
  background-color: #04b1b1;
  color: white;
  padding-top: 100px;
`;
const SideBarButtons = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 35px;

  > .search-nav-button {
    display: flex;
    align-items: center;
    border-top-left-radius: 100px;
    border-bottom-left-radius: 100px;
    padding: 10px 25px;
    margin-left: 25px;
    color: #04b1b1;
    background-color: white;
    margin-bottom: 20px;

    &:hover {
      cursor: pointer;
    }
  }
  > .search-nav-button > .search-icon {
    /* color: white; */
    width: 22px;
    height: 22px;
    margin-right: 20px;
  }
  > .scrapped-nav-button {
    display: flex;
    align-items: center;
    border-top-left-radius: 100px;
    border-bottom-left-radius: 100px;
    padding: 10px 25px;
    margin-left: 25px;
    transition: 0.2s;
    /* background-color: black; */
    &:hover {
      background-color: rgb(28, 28, 28, 0.15);
      /* color: #04b1b1; */
      cursor: pointer;
      /* > .scrap-icon {

        //아이콘이 이미지 파일이어서 이미지 자체를 필터링해서 비슷한 색으로 바꿔줌...
        filter: invert(18%) sepia(95%) saturate(839%) hue-rotate(144deg)
          brightness(69%) contrast(97%);
      } */
    }
  }
  > .scrapped-nav-button > .scrap-icon {
    width: 22px;
    height: 22px;
    margin-right: 20px;
  }
`;

const MainContents = styled.div`
  display: flex;
  width: 100%;
`;
//

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  /* border: 2px solid blue; */
  width: 100%;
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  margin-left: 240px; // 전체화면에서 퍼센트.. 왼쪽 사이드바 부분을 margin으로 처리
  /* border: 3px solid limegreen; */
  padding-top: 20px;
  padding-left: 7%;
  padding-right: 7%;
`;

const ContentWrapoer = styled.div`
  display: flex;
  border: 2px solid black;
  flex-direction: column;
  width: 100%; // 위에서 좌우에 padding 7% 넣어서 너비를 100%해도 빈칸 생김.
`;
const ContentText = styled.div`
  // 팀원 찾아보세요 text //
  display: flex;
  align-items: center;
  height: 50px;
  font-size: 20px;
  border: 2px solid red;
`;

const ProfileSearch = styled.div`
  //검색창
  display: flex;
  height: 200px;
  border: 2px solid pink;
`;

const Profiles = styled.div`
  //프로필 넣기
  display: flex;
  height: 20px; // 임시
  border: 2px solid blue;
`;

function TeamLounge() {
  const navigate = useNavigate();
  //   const handleGoMainPage = () => {
  //     navigate("/MainPage");
  //   };

  return (
    <div>
      <Container>
        <SideBar>
          <SideBarButtons>
            <div
              className="search-nav-button"
              onClick={() => {
                window.location.reload("/TeamLounge/Search");
              }}
            >
              <img
                className="search-icon" // 푸른색 서치 아이콘
                alt="Group"
                src="https://cdn.animaapp.com/projects/65c5a7d8d4b749ab51e73dc0/releases/65d311206269ef486d8b65d3/img/group-6@2x.png"
              />
              팀원 검색하기
            </div>
            <div
              className="scrapped-nav-button"
              onClick={() => {
                navigate("/TeamLounge/Scrapped");
              }}
            >
              <img
                className="scrap-icon" // 하얀색 스크랩 아이콘
                alt="Vector"
                src="https://cdn.animaapp.com/projects/65c5a7d8d4b749ab51e73dc0/releases/65d311206269ef486d8b65d3/img/vector.svg"
              />
              스크랩한 프로필
            </div>
          </SideBarButtons>
        </SideBar>
        <MainContents>
          <MainContainer>
            <WhiteNavBtns /> {/* 흰색 nav 버튼들 */}
            <Content>
              {/* 팀원검색 or 스크랩한 프로필. 디폴트를 팀원검색으로 두고, 상태 변환해서 스크랩 프로필 내용 보여주기..  */}
              <SearchTeammates />
              {""}
              {/* <ScrappedTeammates /> */}

              {/*팀원검색 Or 스크랩한 프로필*/}
            </Content>
          </MainContainer>
        </MainContents>
      </Container>
    </div>
  );
}

const SearchTeammates = () => {
  return (
    <ContentWrapoer>
      <ContentText>000님, 팀원을 찾아보세요 !</ContentText>
      <ProfileSearch>검색창</ProfileSearch>
      <Profiles></Profiles>
    </ContentWrapoer>
  );
};

export default TeamLounge;
