import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import WhiteNavBtns from "./WhiteNavBtns";
import sampleProfileImg from "../img/profileSample.png";
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
  width: 240px; // 전체화면에서 퍼센트로 하는게 나을듯..
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
    margin-bottom: 20px;
    transition: 0.2s;

    &:hover {
      background-color: rgb(28, 28, 28, 0.15);
      cursor: pointer;
    }
  }
  > .search-nav-button > .search-icon {
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
    color: #04b1b1;
    background-color: white;
    &:hover {
      cursor: pointer;
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

const ContentWrapper = styled.div`
  display: flex;
  /* border: 2px solid black; */
  flex-direction: column;
  width: 100%; // 위에서 좌우에 padding 7% 넣어서 너비를 100%해도 빈칸 생김.
`;
const ContentText = styled.div`
  // 팀원 찾아보세요 text //
  display: flex;
  align-items: center;
  height: 80px;
  font-size: 20px;
  /* border: 2px solid red; */
`;

// const ProfileSearch = styled.div`
//   //검색창
//   display: flex;
//   height: 200px;
//   border: 2px solid pink;
// `;

// const Profiles = styled.div`
//   //프로필 넣기
//   display: flex;
//   height: 20px; // 임시
//   border: 2px solid blue;
// `;

function ScrappedProfile() {
  const navigate = useNavigate();

  return (
    <div>
      <Container>
        <SideBar>
          <SideBarButtons>
            <div
              className="search-nav-button"
              onClick={() => {
                navigate("/TeamLounge/Search");
              }}
            >
              <img
                className="search-icon" // 하얀색 서치 아이콘
                alt="Group"
                src="https://cdn.animaapp.com/projects/65c5a7d8d4b749ab51e73dc0/releases/65d311206269ef486d8b65d3/img/group-6-2@2x.png"
              />
              팀원 검색하기
            </div>
            <div
              className="scrapped-nav-button"
              onClick={() => {
                window.location.reload("/TeamLounge/Scrapped");
              }}
            >
              <img
                className="scrap-icon" // 초록색 스크랩 아이콘
                alt="Vector"
                src="https://cdn.animaapp.com/projects/65c5a7d8d4b749ab51e73dc0/releases/65d311206269ef486d8b65d3/img/vector-19.svg"
              />
              스크랩한 프로필
            </div>
          </SideBarButtons>
        </SideBar>
        <MainContents>
          <MainContainer>
            <WhiteNavBtns />
            {/* 흰색 nav 버튼들 */}

            <Content>
              {/* 팀원검색 or 스크랩한 프로필. 디폴트를 팀원검색으로 두고, 상태 변환해서 스크랩 프로필 내용 보여주기..  */}
              <ScrappedTeammates />

              {/* <ScrappedTeammates /> */}

              {/*팀원검색 Or 스크랩한 프로필*/}
            </Content>
          </MainContainer>
        </MainContents>
      </Container>
    </div>
  );
}

const Profiles = styled.div`
  //프로필 넣기
  display: flex;
  flex-wrap: wrap;
  height: 600px; // 임시
  width: 100%;

  padding-left: 5px;
  padding-top: 5px;
  overflow: scroll;

  > .profiles-container {
    display: flex;
    flex-wrap: wrap;
    height: 100%; // 임시

    /* border: 2px solid blue; */
  }
`;

const ProfileCard = styled.div`
  display: flex;

  /* border: 2px solid goldenrod; */
  box-shadow: 0 0 8px 1px #0000002a; // drop-down shadow 모달 그림자
  padding: 15px;
  width: 200px;
  height: 310px;
  font-family: "Pretendard-SemiBold", Helvetica;
  margin-right: 30px;
  margin-bottom: 30px;
`;
const ScrapIcon = styled.div`
  /* z-index: 3000; */
  position: absolute; // 스크랩 아이콘 고정...
  > .scrap-Btn {
    > img {
      position: relative;
      top: 5px;
      left: 180px;
      z-index: 3500;
      width: 20px;
      transition: 0.3s;
      cursor: pointer;
    }
  }
`;
const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
  /* border: 2px solid black; */
  position: relative;
`;

const ProfileNScrap = styled.div`
  display: flex;
  width: 100px;
  height: 100px;
  border: 2px solid green;
  > img {
    // 프로필 이미지
    width: 100px;
    height: 100px;
  }
  padding: 5px;
`;

const Name = styled.div`
  display: flex;
  padding: 5px;
`;
const SchoolInfo = styled.div`
  display: flex;
  font-size: 12px;
  padding: 5px;
`;
const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 13px;
  padding: 5px;
  width: 100%;

  > .content-row {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 30px;

    padding-left: 30px;

    /* border: 2px solid gold; */
  }
  > .content-row > .content-row-title {
    color: lightgray;
    font-size: 13px;
    margin-right: 20px;
    /* border: 2px solid blue; */
  }

  > .content-row > .content-row-content {
    /* border: 2px solid green; */
  }
`;

const CardButtons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  width: 100%;
  /* border: 2px solid blue; */
  padding-top: 5px;
  padding-bottom: 5px;
  > .invite-button {
    background-color: #04b1b1;
    color: white;
    border: none;
    border-radius: 20px;
    /* padding: 2px 5px; */
    height: 30px;
    width: 90px;
    cursor: pointer;
    &:hover {
      background-color: #008888;
    }
  }
  > .visit-button {
    background-color: white;
    border: 2px solid #04b1b1;
    color: #04b1b1;
    border-radius: 20px;
    /* padding: 2px 5px; */
    height: 30px;
    width: 90px;
    cursor: pointer;

    &:hover {
      background-color: rgb(28, 28, 28, 0.15);
    }
  }
`;

const ScrappedTeammates = () => {
  // 프로파일 설정하고 받아오는 부분
  const [profile, setProfile] = useState([]);
  const [userName, setUserName] = useState([]);
  const [loading, setLoading] = useState(false);
  const getProfiles = async () => {
    const url =
      process.env.REACT_APP_BACK_URL +
      "/api/fillyouin/members/scrap-profile-card"; // 백엔드 api url => 각 페이지에서 요구하는 api 주소에 맞게 바꿔써줘야함.

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
      console.log("Server Response 스크랩 카드:", responseData); // 받아온 데이터를 콘솔로 확인

      setProfile(responseData); // useState로 쓰기 위해서 받아온 데이터를 profile에 설정
    } catch (error) {
      console.error("error", error);
    }
  };

  const getUserName = async () => {
    const url = process.env.REACT_APP_BACK_URL + "/api/fillyouin/my-profile"; // 백엔드 api url => 각 페이지에서 요구하는 api 주소에 맞게 바꿔써줘야함.
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
      console.log("Server Response 유저이름:", responseData); // 받아온 데이터를 콘솔로 확인
      setUserName(responseData); // useState로 쓰기 위해서 받아온 데이터를 profile에 설정
      setLoading(false);
    } catch (error) {
      console.error("error", error);
    }
  };

  useEffect(() => {
    getProfiles();
  }, []);

  useEffect(() => {
    getUserName();
  }, []);
  //
  //
  //

  return (
    <>
      {loading === true ? (
        <Loading>로딩중....</Loading>
      ) : (
        <ContentWrapper>
          <ContentText>
            {userName.lastName} {userName.firstName}님, 스크랩한 프로필이에요 !
          </ContentText>
          {/* <ProfileSearch>검색창</ProfileSearch> */}
          <Profiles>
            <div className="profiles-container">
              <div> {profile?.profileCards?.firstName}</div>
              <>
                {profile?.profileCards &&
                  profile?.profileCards?.map((card) => (
                    <ProfileCardExample
                      lastName={card.lastName}
                      firstName={card.firstName}
                      department={card.department}
                      semester={card.semester}
                      field={card.field}
                      job={card.job}
                      skill={card.skill}
                      isScrapped={card.isScrapped}
                      profilePic={card.profileImageUrl}
                    />
                  ))}
              </>
            </div>
          </Profiles>
        </ContentWrapper>
      )}
    </>
  );
};

export default ScrappedProfile;

const ProfileCardExample = ({
  lastName,
  firstName,
  department,
  semester,
  field,
  job,
  skill,
  isScrapped,
  profilePic,
}) => {
  return (
    <ProfileCard>
      <ScrapIcon>
        <div
          className="scrap-Btn"
          type="button"
          // type 명시하지 않을시 button 클릭하면 submit
          // type을 button으로 해야 클릭 시 submit 되지 않음
          onClick={() => {
            console.log("버튼 누르기 전: ", isScrapped);
            isScrapped = !isScrapped;
            console.log("버튼 누른 후: ", isScrapped);
          }}
        >
          {isScrapped === true ? (
            <>
              <img
                src="https://cdn.animaapp.com/projects/65c5a7d8d4b749ab51e73dc0/releases/65d632d0ac491d2252e1292a/img/---@2x.png"
                alt="scrapIcon"
                className="scrap"
              />
            </>
          ) : (
            <>
              <img
                src="https://cdn.animaapp.com/projects/65c5a7d8d4b749ab51e73dc0/releases/65d311206269ef486d8b65d3/img/vector-19.svg"
                alt="scrapIcon"
                className="scrap"
              />
            </>
          )}
        </div>

        {/* <img
          className="scrap-icon" // 초록색 스크랩 아이콘
          alt="Vector"
          src="https://cdn.animaapp.com/projects/65c5a7d8d4b749ab51e73dc0/releases/65d632d0ac491d2252e1292a/img/---@2x.png"
          // src="https://cdn.animaapp.com/projects/65c5a7d8d4b749ab51e73dc0/releases/65d311206269ef486d8b65d3/img/vector-19.svg"
        /> */}
      </ScrapIcon>
      <CardContainer>
        <ProfileNScrap>
          {profilePic === null ? (
            <img src={sampleProfileImg} alt="profileImg" />
          ) : (
            <img src={profilePic} alt="profileImg" />
          )}
        </ProfileNScrap>
        <Name>
          {lastName} {firstName}
        </Name>
        <SchoolInfo>
          한동대학교 {department} {semester}학기
        </SchoolInfo>
        <ContentContainer>
          <div className="content-row">
            <div className="content-row-title">희망분야</div>
            <div className="content-row-content">{field}</div>
          </div>
          <div className="content-row">
            <div className="content-row-title">관심직무</div>
            <div className="content-row-content">{job}</div>
          </div>
          <div className="content-row">
            <div className="content-row-title">보유기술</div>
            <div className="content-row-content">{skill}</div>
          </div>
        </ContentContainer>
        <CardButtons>
          <button className="invite-button">팀 초대</button>
          <button className="visit-button">프로필 방문</button>
        </CardButtons>
      </CardContainer>
    </ProfileCard>
  );
};

const Loading = styled.div`
  font-family: "Pretendard-SemiBold", Helvetica;
  font-size: 30px;
`;
