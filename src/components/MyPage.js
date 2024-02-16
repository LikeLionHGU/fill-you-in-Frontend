import React from "react";

import styled from "styled-components";

const TopBackground = styled.div`
  /* 배너 배경.. */
  background-color: #04b1b1;
  height: 43vh;
  width: 100vw;
`;
const Header = styled.div`
  display: flex;
  left: 2.8%;
  position: absolute;
  top: 3%;
  padding: 2px;
  > img {
    width: 37.9%;
  }
  > img:hover {
    cursor: pointer;
  }
`;
const NavBar = styled.div`
  //헤더 바
  display: flex;
  flex-direction: row;
  justify-content: right;
  padding: 30px 20px;
`;
const NavButton = styled.div`
  display: flex;
  justify-content: center;
  /* width: 80px; */
  padding: 11px 16px;
  margin-left: 10px;

  //navbar 버튼 스타일
  background-color: #04b1b1;
  color: white;
  font-family: "Pretendard-SemiBold", Helvetica;
  font-size: 15px;
  font-weight: 400;
  transition: 0.3s;

  &:hover {
    /* nav 버튼들 */
    background-color: rgb(28, 28, 28, 0.15);
    color: white;
    font-weight: 500;
    cursor: pointer;
    border-radius: 5px;
  }
`;

const Index = styled.div`
  background-color: #ffffff;
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;

  > .div1 {
    background-color: #ffffff;
    position: relative;
    height: 100vh;
    width: 100vw;
  }
`;
const ProfilePic = styled.div`
  background-color: #e8e8e8;
  border-radius: 145px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden; //

  position: absolute;
  left: 6vw;
  top: 30vh;
  height: 210px;
  width: 210px;
  /* border: 2px solid red; */
`;
const EditIcon = styled.div`
  img {
    height: 26px;
    width: 26px;
  }
  > .edit-icon-profile-pic {
    position: absolute;
    /* border: 2px solid green; */
    left: 22vw;
    top: 38vh;
  }
  > .edit-icon-profile-pic:hover {
    cursor: pointer;
  }
`;

const EditIconImg = styled.img``;

const BottomBackground = styled.div`
  // 화면의 아래쪽 흰색 배경 container
  display: block;
  background-color: white;
`;
const ContentContainer = styled.div`
  display: flex;
  /* border: 2px solid red; */
  padding: 30px 30px;
`;

const Sidebar = styled.div`
  display: flex;
  flex-direction: column;

  /* border: 2px solid purple; */
  border-right: 2px solid #e1e1e1;
  width: 500px;
  padding-top: 10px;
  padding-left: 5px;
  padding-right: 5px;
  height: auto;

  > .profile-contents {
    display: flex;
    justify-content: center;

    flex-direction: column;
    border: 2px solid white;
    margin-top: 85px;
    /* padding: 20px; */
  }
  > .profile-contents > .club-technique {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    height: 40px;
    width: 90%;
    border-radius: 20px;
    background-color: #f4f4f4;
    color: #005f5f;
    font-family: "Pretendard-SemiBold", Helvetica;
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 30px;
  }
  > .profileInfo > .club-technique > div {
    border: 2px solid black;
  }

  > .profile-contents > .club-technique-list {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    /* border: 2px solid black; */
    margin-right: 10px;
  }
  > .profile-contents > .club-technique-list > div {
    display: flex;
    flex-direction: row;
    /* border: 2px solid orange; */
  }

  > .profile-contents > .profile-contents-name {
    display: flex;
    justify-content: left;
  }
  > .profile-contents > .profile-contents-name > .edit-icon-content {
    /* border: 2px solid black; */
    height: 20px;
    width: 20px;
  }

  > .profile-contents > .profile-contents-name > .edit-icon-content:hover {
    cursor: pointer;
  }
  > .profile-contents > .profileInfo {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  > .profile-contents > .profileInfo > .email {
    display: flex;

    color: black;
  }
  > .profile-contents > .email > span {
    color: black;
  }
`;

const Username = styled.div`
  display: flex;
  justify-content: center;

  color: #1b1b1b;
  font-family: "Pretendard-SemiBold", Helvetica;
  font-size: 18px;
  font-weight: 600;
  height: 30px;
  margin-bottom: 10px;
  letter-spacing: 0;
  line-height: normal;
  width: 70%;
  /* border: 2px solid black; */
`;

const PageContent = styled.div`
  display: flex;
  flex-direction: column;

  align-items: center;
  width: 100%;
  padding: 20px 50px;
  background-color: white;
`;
const IntroduceBox = styled.div`
  display: flex;
  background-color: #f4f4f4;
  border-radius: 25px;
  padding: 20px 20px; // textbox
  height: 120px;
  width: 100%;

  margin-bottom: 45px;
`;
const ContentBar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  background-color: #f4f4f4;
  /* border: 2px solid purple; */
  border-radius: 39.5px;
  width: 100%;
  height: 40px;
  padding: 5px 10px;
  position: relative;
`;
const BarTitle = styled.div`
  /* border: 2px solid brown; */
  color: #1b1b1b;
  font-family: "Pretendard-SemiBold", Helvetica;
  font-size: 17px;
  font-weight: 600;
  width: 30%;
`;

const TableCol = styled.div`
  display: flex;
  margin-bottom: 10px;
  padding: 5px 5px;
  > span {
    display: flex;
    align-items: center;
    color: #a5a5a5;
    font-family: "Pretendard-SemiBold", Helvetica;
    font-size: 16px;
    font-weight: 600;
    width: 60px;
    height: 24px;
    margin-right: 10px;

    /* border: 2px solid red; */
  }
  > .table-email {
    color: #1b1b1b;
    font-family: "Pretendard-SemiBold", Helvetica;
    font-size: 16px;
    font-weight: 600;

    letter-spacing: 0;
    line-height: normal;
    margin-top: 3px;
    white-space: nowrap;
  }
  > .table-list {
    display: flex;
    flex-direction: column;
  }
  > .table-list > div {
    display: flex;
    align-items: center;
    height: 24px;

    color: #1b1b1b;
    font-family: "Pretendard-SemiBold", Helvetica;
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 5px;

    /* border: 2px solid red; */
  }
`;

const SchoolMajor = styled.div`
  /* border: 2px solid red; */
  padding: 5px 5px;
`;

const CareerBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  width: 100%;
  padding: 60px 10px;
  font-size: 20px;
  font-weight: bold;
  /* border: 2px solid red; */
  color: #005f5f;
`;

const MakeProfileModal = () => {
  return (
    <div>
      <div className="view-wrapper">
        <div className="view">
          <div className="overlap-2">
            <div className="view-2">
              <div className="overlap-group-wrapper">
                <div className="div-wrapper">
                  <div className="text-wrapper-11">프로필 작성하기</div>
                </div>
              </div>
              <div className="text-wrapper-12">나중에 작성하기</div>
            </div>
            <div className="text-wrapper-13">프로필을 입력해보세요 !</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const MyPage = () => {
  return (
    <Index>
      {/* <MakeProfileModal /> */}
      <div className="div1">
        <TopBackground>
          <Header>
            <img
              alt="LogoImage"
              src="https://cdn.animaapp.com/projects/65c5a7d8d4b749ab51e73dc0/releases/65cde3ba568da0c025605028/img/--@2x.png"
            />
          </Header>
          <NavBar>
            <NavButton>활동 찾기</NavButton>
            <NavButton>팀원 라운지</NavButton>
            <NavButton>팀 관리</NavButton>
            <NavButton>로그아웃</NavButton>
          </NavBar>
        </TopBackground>
        <ProfilePic>프로필 이미지</ProfilePic>
        <EditIcon>
          <img
            className="edit-icon-profile-pic"
            alt="editIcon"
            src="https://cdn.animaapp.com/projects/65c5a7d8d4b749ab51e73dc0/releases/65cde3ba568da0c025605028/img/vector.svg"
          />
        </EditIcon>

        <BottomBackground>
          <ContentContainer>
            <Sidebar>
              <div className="profile-contents">
                <div className="profile-contents-name">
                  <EditIconImg
                    className="edit-icon-content"
                    alt="editIcon"
                    src="https://cdn.animaapp.com/projects/65c5a7d8d4b749ab51e73dc0/releases/65cde3ba568da0c025605028/img/vector.svg"
                  />
                  <Username>석예슬</Username>
                </div>
                <SchoolMajor>한동대학교 콘텐츠융합디자인과 4학년</SchoolMajor>
                <div className="profileInfo">
                  <TableCol>
                    <span>메일</span>
                    <div className="table-email">yeseul.ove@handong.ac.kr</div>
                  </TableCol>
                  <TableCol>
                    <span>희망분야</span>
                    <div className="table-list">
                      <div>없음</div>
                      <div>없음</div>
                    </div>
                  </TableCol>
                  <TableCol>
                    <span>관심직무</span>
                    <div className="table-list">
                      <div>없음</div>
                      <div>없음</div>
                    </div>
                  </TableCol>
                </div>

                <div className="club-technique">
                  <div>소속 학회 및 동아리</div>
                  <div>보유 기술</div>
                </div>
                <div className="club-technique-list">
                  <div>없음</div>
                  <div>
                    포토샵 <br /> 피그마
                  </div>
                </div>
              </div>
            </Sidebar>
            <PageContent>
              {/* 화면 오른쪽 콘텐츠 */}

              <IntroduceBox>
                <p>자기소개란 텍스트 박스</p>
              </IntroduceBox>

              <ContentBar>
                <BarTitle>수업 수강내역</BarTitle>
                <BarTitle>활동 내역</BarTitle>
                <BarTitle>수상 내역</BarTitle>
              </ContentBar>
              <CareerBox> 이력을 관리해보세요.</CareerBox>
            </PageContent>{" "}
          </ContentContainer>
        </BottomBackground>
      </div>
    </Index>
  );
};

export default MyPage;
