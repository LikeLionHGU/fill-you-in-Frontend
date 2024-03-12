import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import FirstVisitModal from "./FirstVisitModal";
import ModifyProfile from "./ModifyProfile";
import PictureSelect from "./PictureSelect";
import profileSample from "../img/profileSample.png";
import pinImg from "../img/pinned.png";
import editProfile from "../img/profile-upload_g.png";

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
  cursor: pointer;

  > div > img {
    height: 215px;
    width: 215px;
  }
`;
const ProfilePicture = ({ src }) => {
  return (
    <div>
      <img src={src} alt="profile" />
    </div>
  );
};
const EditIcon = styled.div`
  img {
    height: 30px;
    width: 30px;
    background-color: #ffffffff;
  }
  > .edit-icon-profile-pic {
    position: absolute;

    background-color: #ffffff;

    /* border: 3px solid #04b1b1; */
    padding: 5px;
    width: 28px;
    height: 28px;
    border-radius: 70px;
    box-shadow: 0 0 6px 1px #0000002a; // drop-down shadow 아이콘 그림자
    //top: 38vh;

    top: 40vh;
    left: 22vw;

    transition: 0.1s;
  }
  > .edit-icon-profile-pic:hover {
    cursor: pointer;
    width: 30px;
    height: 30px;
    /* border-radius: 5px; */
    /* border: 3px solid #028181; */
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
  padding-bottom: 20px;
  border-right: 2px solid #e1e1e1;

  /* border: 2px solid black; */

  width: 500px;
  padding-top: 10px;
  padding-left: 7px;
  padding-right: 7px;
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
    margin-bottom: 20px;
  }
  > .profileInfo > .club-technique > div {
    border: 2px solid black;
  }

  > .profile-contents > .club-technique-list {
    display: flex;
    flex-direction: row;
    justify-content: right;
    /* border: 2px solid red; */
    /* margin-right: 20px; */
    font-size: 14px;
    font-family: "Pretendard-SemiBold", Helvetica;
  }
  > .profile-contents > .club-technique-list > .affiliation-list {
    display: flex;
    flex-direction: column;
    justify-content: left;
    border-right: 1px solid #00000000;
    margin-left: 30px;
    padding-left: 10px;
    font-size: 14px;
    width: 45%;
    font-family: "Pretendard-SemiBold", Helvetica;
  }

  /* > .profile-contents > .club-technique-list > div {
    border: 2px solid gold;
    display: block;
    flex-direction: row;
    width: 40%;}
    /* border: 2px solid orange; */

  > .profile-contents > .club-technique-list > .skill-list {
    /* border: 2px solid gold; */
    display: block;
    flex-direction: row;
    width: 50%;
    padding-left: 10px;
    /* border: 2px solid orange; */
  }

  > .profile-contents > .club-technique-list > div > div {
    display: flex;
    justify-content: start;
    flex-direction: row;
    font-size: 16px;
    margin-bottom: 4px;
    /* border: 2px solid orange; */
  }
  > .profile-contents > .club-technique-list > div > .skill-pinned > img {
    display: flex;
    border-top: 2px solid #00000000;
    align-items: end;
    margin-right: 5px;

    width: 10px;
    height: 15px;
  }
  > .profile-contents > .club-technique-list > div > .skills-not-pinned {
    margin-left: 15px;
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

  > .introduction-text {
    font-family: "Pretendard-SemiBold", Helvetica;
    font-size: 15px;
    padding-left: 5px;
  }
`;
const ContentBar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;

  background-color: #f4f4f4;
  /* border: 2px solid purple; */
  border-radius: 40px;
  width: 100%;
  height: 40px;
  padding: 5px 10px;
  position: relative;
`;
const BarTitle = styled.div`
  display: flex;
  justify-content: center;
  /* border: 2px solid brown; */
  color: #1b1b1b;
  font-family: "Pretendard-SemiBold", Helvetica;
  font-size: 17px;
  font-weight: 600;
  /* width: 26%; */
  width: 200px;
  margin-left: 20px;
`;
const TableCol = styled.div`
  display: flex;
  margin-bottom: 8px;
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
  > .table-list > .ispinned > img {
    margin-right: 5px;
    width: 10px;
    height: 16px;
    border-top: 2px solid #00000000;
    /* text-decoration: underline; */
  }
  > .table-list > .notPinned {
    margin-left: 15px;
    /* text-decoration: underline; */
  }
`;
const SchoolMajor = styled.div`
  /* border: 2px solid red; */
  display: flex;
  justify-content: left;
  padding: 5px;
  padding-left: 0px;
  font-family: "Pretendard-SemiBold", Helvetica;

  font-weight: 600;
  margin-bottom: 5px;
  width: 100%;
  > span {
    color: #1b1b1b;
    margin-left: 5px;
    margin-right: 5px;
  }
  > div {
    display: inline;
    color: lightgray;
  }
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

const None = styled.span`
  display: flex;
  align-items: center;
  height: 24px;
  color: #a5a5a5; //////////////////////////
  font-size: 16px;
  font-family: "Pretendard-SemiBold", Helvetica;
`;
export const MyPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [isPicModalOpen, setIsPicModalOpen] = useState(false); // 프로필 수정 모달

  const [loading, setLoading] = useState(false);
  //
  //
  // 프로파일 설정하고 받아오는 부분
  const [profile, setProfile] = useState([]);
  const getProfile = async () => {
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
      console.log("Server Response", responseData); // 받아온 데이터를 콘솔로 확인

      setProfile(responseData); // useState로 쓰기 위해서 받아온 데이터를 profile에 설정
      setLoading(false); // 정보 받아오기 전까지는 페이지에 loading...이라는 텍스트만 화면에 보여줌
    } catch (error) {
      console.error("error", error);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);
  //
  //
  //프로파일 설정하고 받아오는 부분

  // const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // const openPicModal = () => setIsPicModalOpen(true);
  const closePicModal = () => setIsPicModalOpen(false);

  const [modalOpen, setModalOpen] = useState(false);
  const showModal = () => {
    setModalOpen(true);
  };

  const navigate = useNavigate();
  const handleGoMainPage = () => {
    navigate("/MainPage");
  };
  const handleLogoutMsg = () => {
    ///// < = jwt를 백엔드로 계속 보내면서 확인해야할듯
    if (window.confirm("로그아웃 하시겠습니까?")) {
      localStorage.removeItem("loginToken"); // 로그인 토큰 제거
      navigate("/");
    }
  };

  return (
    <Index>
      {loading ? (
        <div>
          <span>Loading...</span>
        </div>
      ) : (
        <div>
          {
            profile?.isFirstProfileVisit === true ? ( // 첫방문이 맞으면 FirstVisitModal 띄움
              <FirstVisitModal
                isOpen={isModalOpen}
                closeModal={closeModal}
                setIsModalOpen
              />
            ) : null // 첫방문이 아니면 FirstVisitModal 띄우지 않기
          }
          <div className="div1">
            <TopBackground>
              <Header>
                <img
                  onClick={handleGoMainPage}
                  alt="LogoImage"
                  src="https://cdn.animaapp.com/projects/65c5a7d8d4b749ab51e73dc0/releases/65cde3ba568da0c025605028/img/--@2x.png"
                />
              </Header>
              <NavBar>
                <NavButton>활동 찾기</NavButton>
                <NavButton
                  onClick={() => {
                    navigate("/TeamLounge/Search");
                  }}
                >
                  팀원 라운지
                </NavButton>
                <NavButton>팀 관리</NavButton>
                <NavButton
                  onClick={() => {
                    window.location.reload("/MyPage");
                  }}
                >
                  마이페이지
                </NavButton>
                <NavButton onClick={handleLogoutMsg}>로그아웃</NavButton>
              </NavBar>
            </TopBackground>
            <ProfilePic
              onClick={() => {
                setIsPicModalOpen(true);
              }}
            >
              {(!profile?.profileImageUrl &&
                profile?.profileImageUrl === null) ||
              profile?.profileImageUrl === undefined ? (
                <>
                  {console.log("no profile", profile?.profileImageUrl)}
                  <ProfilePicture src={profileSample} />
                </>
              ) : (
                <>
                  <ProfilePicture src={profile?.profileImageUrl} />
                </>
              )}
            </ProfilePic>
            <EditIcon
              onClick={() => {
                setIsPicModalOpen(true);
              }}
            >
              <img
                className="edit-icon-profile-pic"
                alt="editIcon"
                // src={editImgIcon}
                src={editProfile}
                // src="https://cdn.animaapp.com/projects/65c5a7d8d4b749ab51e73dc0/releases/65cde3ba568da0c025605028/img/vector.svg"
              />
            </EditIcon>

            {isPicModalOpen === true ? (
              <PictureSelect
                isOpen={isPicModalOpen}
                closeModal={closePicModal}
              />
            ) : null}

            <BottomBackground>
              <ContentContainer>
                <Sidebar>
                  <div className="profile-contents">
                    <div className="profile-contents-name">
                      <EditIconImg
                        className="edit-icon-content"
                        alt="editIcon"
                        src="https://cdn.animaapp.com/projects/65c5a7d8d4b749ab51e73dc0/releases/65cde3ba568da0c025605028/img/vector.svg"
                        onClick={showModal}
                      />
                      {/* {modalOpen === true ? <ModifyProfile /> : null} */}

                      {modalOpen && (
                        <ModifyProfile setModalOpen={setModalOpen} />
                      )}
                      <Username>
                        {profile?.lastName} {profile?.firstName}
                      </Username>
                    </div>
                    <SchoolMajor>
                      <span>한동대학교 </span>
                      {profile?.department == null ||
                      profile?.profileImageUrl === undefined ? (
                        <div> (학부) </div> // 아무 값도 없을 때 기본으로 들어가는 부분
                      ) : (
                        <span>{profile?.department}</span>
                      )}
                      {profile?.semester == null ||
                      profile?.profileImageUrl === undefined ? (
                        <div> (학기수)</div>
                      ) : (
                        <span> {profile?.semester}학기</span>
                      )}
                    </SchoolMajor>
                    <div className="profileInfo">
                      <TableCol>
                        <span>메일</span>
                        <div className="table-email">{profile?.email}</div>
                      </TableCol>
                      <TableCol>
                        <span>희망분야</span>
                        <div className="table-list">
                          {profile?.fields?.length === 0 ? ( // **** profile과 fields 옆에 물음표 꼭 붙여야 함
                            <None>없음</None>
                          ) : (
                            <>
                              {profile?.fields &&
                                profile?.fields?.map((field) =>
                                  field?.isPinned === true ? (
                                    <div className="ispinned" key={field.name}>
                                      <img src={pinImg} alt="pinImg" />
                                      {field.name}{" "}
                                    </div>
                                  ) : null
                                )}

                              {profile?.fields &&
                                profile?.fields?.map((field) =>
                                  field?.isPinned === false ? (
                                    <div className="notPinned" key={field.name}>
                                      {field.name}
                                    </div>
                                  ) : null
                                )}
                            </>
                          )}
                        </div>
                      </TableCol>
                      <TableCol>
                        <span>관심직무</span>
                        <div className="table-list">
                          {profile?.jobs?.length === 0 ? ( // **** profile과 fields 옆에 물음표 꼭 붙여야 함
                            <None>없음</None>
                          ) : (
                            <>
                              {profile?.jobs &&
                                profile?.jobs?.map((job) =>
                                  job?.isPinned === true ? (
                                    <div className="ispinned" key={job.name}>
                                      <img src={pinImg} alt="pinImg" />
                                      {job.name}{" "}
                                    </div>
                                  ) : null
                                )}

                              {profile?.jobs &&
                                profile?.jobs?.map((job) =>
                                  job?.isPinned === false ? (
                                    <div className="notPinned" key={job.name}>
                                      {job.name}
                                    </div>
                                  ) : null
                                )}
                            </>
                          )}
                        </div>
                      </TableCol>
                    </div>

                    <div className="club-technique">
                      <div>소속 학회 및 동아리</div>
                      <div>보유 기술</div>
                    </div>
                    <div className="club-technique-list">
                      <div className="affiliation-list">
                        {profile?.affiliations &&
                        profile?.affiliations?.length === 0 ? ( // **** profile과 fields 옆에 물음표 꼭 붙여야 함
                          <None> 없음</None>
                        ) : (
                          <>
                            {profile?.affiliations &&
                              profile?.affiliations?.map((affiliation) => (
                                <div key={affiliation.name}>
                                  {affiliation.name}
                                </div>
                              ))}
                          </>
                        )}
                      </div>
                      <div className="skill-list">
                        {profile?.skills?.length === 0 ? ( // **** profile과 fields 옆에 물음표 꼭 붙여야 함
                          <None>없음</None>
                        ) : (
                          <>
                            {profile?.skills &&
                              profile?.skills?.map((skill) =>
                                skill?.isPinned === true ? (
                                  <div
                                    className="skill-pinned"
                                    key={skill.name}
                                  >
                                    <img src={pinImg} alt="pinImg" />{" "}
                                    {skill.name}
                                  </div>
                                ) : null
                              )}

                            {profile?.skills &&
                              profile?.skills?.map((skill) =>
                                skill?.isPinned === false ? (
                                  <div
                                    className="skills-not-pinned"
                                    key={skill.name}
                                  >
                                    {skill.name}
                                  </div>
                                ) : null
                              )}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </Sidebar>
                <PageContent>
                  <IntroduceBox>
                    <p className="introduction-text">
                      {profile?.introduction == null ? (
                        <>자기소개란</>
                      ) : (
                        profile?.introduction
                      )}
                    </p>
                  </IntroduceBox>

                  <ContentBar>
                    <BarTitle>수업 수강내역</BarTitle>
                    <BarTitle>활동 내역</BarTitle>
                    <BarTitle>수상 내역</BarTitle>
                  </ContentBar>
                  <CareerBox> 이력을 관리해보세요.</CareerBox>
                </PageContent>
              </ContentContainer>
            </BottomBackground>
          </div>
        </div>
      )}
    </Index>
  );
};

export default MyPage;
