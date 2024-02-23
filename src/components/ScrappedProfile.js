import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import WhiteNavBtns from "./WhiteNavBtns";
import sampleProfileImg from "../img/profileSample.png";
import scrap from "../img/Scrap.png";
import noScrap from "../img/noScrap.png";
import axios from "axios";
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

function ScrappedProfile() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState([]);
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
    getUserName();
  }, []);

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
              <ScrappedTeammates loading={loading} userName={userName} />
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
  position: relative; // 스크랩 아이콘 고정...
  > .scrap-Btn {
    padding-left: 2px;
    margin-right: 5px;
  }
  > button {
    border: none;
    background-color: white;
    position: absolute; // 스크랩 아이콘 고정...
    top: 3px;
    left: 180px;
    z-index: 3500;
    width: 25px;
    transition: 0.3s;
    cursor: pointer;
    > img {
      width: 20px;
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
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 100px;
  border-radius: 100px;
  overflow: hidden;

  > img {
    // 프로필 이미지
    width: 110px;
    height: 110px;
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

  > span {
    margin-left: 5px;
    color: lightgray;
  }
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
    > span {
      color: lightgray;
    }
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

const ScrappedTeammates = ({ loading, userName }) => {
  // 프로파일 설정하고 받아오는 부분
  const [profile, setProfile] = useState([]);

  // const [loading, setLoading] = useState(false);
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

  useEffect(() => {
    getProfiles();
  }, []);

  //
  /////////스크랩 delete
  //
  return (
    <>
      {loading === true ? (
        <Loading>로딩중....</Loading>
      ) : (
        <>
          <ContentWrapper>
            <ContentText>
              {userName.lastName} {userName.firstName}님, 스크랩한 프로필이에요
              !
            </ContentText>
            {/* <ProfileSearch>검색창</ProfileSearch> */}
            <Profiles>
              <div className="profiles-container">
                <div> {profile?.profileCards?.firstName}</div>
                <>
                  {profile?.profileCards &&
                    profile?.profileCards?.map((card) => (
                      <EachProfileCard
                        key={card.id}
                        id={card.id}
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
        </>
      )}
    </>
  );
};

export default ScrappedProfile;

const EachProfileCard = ({
  id,
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
  const [isOn, setIsOn] = useState(true); // 스크랩 버튼 클릭 여부 state

  const navigate = useNavigate(); //프로필 방문을 위한 useNavigate

  //////// 스크랩 취소 기능
  const deleteScrap = (id) => {
    const scrapUrl =
      process.env.REACT_APP_BACK_URL + "/api/fillyouin/scrap-member";
    axios
      .delete(scrapUrl, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("loginToken"), // Bearer 토큰으로 요청
        },

        // delete 함..
        params: {
          scrapMemberId: id,
        },
      })
      //성공시 then 실행
      .then(function (response) {
        console.log(response);
      })
      //실패 시 catch 실행
      .catch(function (error) {
        console.log(error);
      });
  };
  //스크랩 취소 기능

  //스크랩 적용 기능
  const applyScrap = (id) => {
    const scrapUrl =
      process.env.REACT_APP_BACK_URL + "/api/fillyouin/scrap-member";
    axios
      .post(
        scrapUrl,
        {}, // post 방법에서는 중간에 data가 들어가므로, 아무것도 안 들어갈 땐 이렇게 {}로 빈칸 넣어주면 해결됨. axios.post(url[, data[, config]])
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("loginToken"), // Bearer 토큰으로 요청
          },

          params: {
            scrapMemberId: id,
          },
        }
      )
      //성공시 then 실행
      .then(function (response) {
        console.log(response);
      })
      //실패 시 catch 실행
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <ProfileCard>
      <ScrapIcon>
        <button
          className="scrap-Btn"
          type="button" // type을 button으로 해야 클릭 시 submit 되지 않음
          onClick={() => {
            setIsOn(!isOn);

            if (isOn === false) {
              deleteScrap(id);
            }
          }}
        >
          {/* {isScrapped ? ( */}
          {isOn ? (
            <>
              {
                <img // scrapped가 되어있다면 초록색 채워진 스크랩 아이콘
                  src={scrap}
                  alt="scrapIcon"
                  className="scrap"
                  onClick={() => {
                    deleteScrap(id);
                    console.log("delete");
                  }}
                />
              }
            </>
          ) : (
            <>
              <img // 스크랩 안 되어있으면 초록색 테두리 스크랩 아이콘
                src={noScrap}
                alt="noScrapIcon"
                className="scrap"
                onClick={() => {
                  applyScrap(id);
                  console.log("apply");
                }}
              />
            </>
          )}
        </button>
      </ScrapIcon>
      <CardContainer>
        <ProfileNScrap>
          {profilePic === null || profilePic === undefined ? (
            <img src={sampleProfileImg} alt="profileImg" />
          ) : (
            <img src={profilePic} alt="profileImg" />
          )}
        </ProfileNScrap>
        <Name>
          {lastName} {firstName}
        </Name>
        <SchoolInfo>
          한동대학교
          {department ? (
            <> {department}</>
          ) : (
            <>
              <span> (학부)</span>
            </>
          )}
          {semester ? (
            <> {semester}학기</>
          ) : (
            <>
              <span> (학기)</span>
            </>
          )}
        </SchoolInfo>
        <ContentContainer>
          <div className="content-row">
            <div className="content-row-title">희망분야</div>
            {field ? (
              <div className="content-row-content">{field}</div>
            ) : (
              <div className="content-row-content">
                <span>(없음)</span>
              </div>
            )}
          </div>
          <div className="content-row">
            <div className="content-row-title">관심직무</div>
            {job ? (
              <div className="content-row-content">{job}</div>
            ) : (
              <div className="content-row-content">
                <span>(없음)</span>
              </div>
            )}
          </div>
          <div className="content-row">
            <div className="content-row-title">보유기술</div>
            {skill ? (
              <div className="content-row-content">{skill}</div>
            ) : (
              <div className="content-row-content">
                <span>(없음)</span>
              </div>
            )}
          </div>
        </ContentContainer>
        <CardButtons>
          <button className="invite-button">팀 초대</button>
          <button
            className="visit-button"
            onClick={() => navigate(`/OtherPage/${id}/${isOn}`)}
          >
            프로필 방문
          </button>
        </CardButtons>
      </CardContainer>
    </ProfileCard>
  );
};

const Loading = styled.div`
  font-family: "Pretendard-SemiBold", Helvetica;
  font-size: 30px;
`;
