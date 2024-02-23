import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import FirstVisitModal from "./FirstVisitModal";
import ModifyProfile from "./ModifyProfile";
import PictureSelect from "./PictureSelect";
import profileSample from "../img/profileSample.png";

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

  > div > img {
    height: 215px;
    width: 215px;
  }
`;
const ProfilePicure = ({ src }) => {
  return (
    <div>
      <img src={src} alt="profileSample" />
    </div>
  );
};
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
    margin-bottom: 20px;
  }
  > .profileInfo > .club-technique > div {
    border: 2px solid black;
  }

  > .profile-contents > .club-technique-list {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;

    margin-right: 20px;
    font-size: 14px;
    font-family: "Pretendard-SemiBold", Helvetica;
  }
  > .profile-contents > .club-technique-list > div {
    display: block;
    flex-direction: row;
    /* border: 2px solid orange; */
  }
  > .profile-contents > .club-technique-list > div > div {
    display: block;

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
`;
const SchoolMajor = styled.div`
  /* border: 2px solid red; */
  padding: 5px 5px;
  font-family: "Pretendard-SemiBold", Helvetica;

  font-weight: 600;
  margin-bottom: 5px;

  > span {
    color: #1b1b1b;
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
export const OtherPersonProfile = (id) => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [isPicModalOpen, setIsPicModalOpen] = useState(false); // 프로필 수정 모달

  const [loading, setLoading] = useState(false);
  //
  //
  // 프로파일 설정하고 받아오는 부분
  const [profile, setProfile] = useState([]);
  const getProfile = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACK_URL}//api/fillyouin/members/${id}/profile`,
        {
          method: "GET", //(+ GET인지 POST인지 명세 확인)
          headers: {
            Authorization: "Bearer " + localStorage.getItem("loginToken"), // Bearer 토큰으로 요청
          },
        }
      );

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

  const openPicModal = () => setIsPicModalOpen(true);
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
            <ProfilePic>
              {profile?.profileImageUrl && profile?.profileImageUrl === null ? (
                <>
                  {console.log("no profile", profile?.profileImageUrl)}
                  <ProfilePicure src={profileSample} />
                </>
              ) : (
                <>
                  <ProfilePicure src={profile?.profileImageUrl} />
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
                src="https://cdn.animaapp.com/projects/65c5a7d8d4b749ab51e73dc0/releases/65cde3ba568da0c025605028/img/vector.svg"
              />
            </EditIcon>

            {/* {profile?.profileImageUrl && profile?.profileImageUrl === null ? (
              <>
                {console.log("no profile", profile?.profileImageUrl)}
                <PictureSelect
                  isOpen={isPicModalOpen}
                  closeModal={closePicModal}
                  src={profileSample}
                />
              </>
            ) : (
              <>
                <ProfilePicure
                  isOpen={isPicModalOpen}
                  closeModal={closePicModal}
                  src={profile?.profileImageUrl}
                />
              </>
            )} */}
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
                        {profile?.firstName} {profile?.lastName}
                      </Username>
                    </div>
                    <SchoolMajor>
                      한동대학교{" "}
                      {profile?.department == null ? (
                        <div> (학부) </div> // 아무 값도 없을 때 기본으로 들어가는 부분
                      ) : (
                        <span> {profile?.department}</span>
                      )}
                      {profile?.semester == null ? (
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
                                profile?.fields?.map((field) => (
                                  <div>{field.name}</div>
                                ))}
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
                                profile?.jobs?.map((job) => (
                                  <div>{job.name}</div>
                                ))}
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
                      <div>
                        {profile?.affiliations?.length === 0 ? ( // **** profile과 fields 옆에 물음표 꼭 붙여야 함
                          <None> 없음</None>
                        ) : (
                          <>
                            {profile?.affiliations &&
                              profile?.affiliations?.map((affiliation) => (
                                <div>{affiliation.name}</div>
                              ))}
                          </>
                          // <> // 그냥 배열일 때는 이렇게 써줌(객체처럼 . 써서 접근 안해도됨)
                          //   {profile?.affiliations &&
                          //     profile?.affiliations?.map((affiliation) => (
                          //       <div>{affiliation}</div>
                          //     ))}
                          // </>
                        )}
                      </div>
                      <div>
                        {profile?.skills?.length === 0 ? ( // **** profile과 fields 옆에 물음표 꼭 붙여야 함
                          <None>없음</None>
                        ) : (
                          <>
                            {profile?.skills &&
                              profile?.skills?.map((skill) => (
                                <div>
                                  <div>{skill.name}</div>
                                </div>
                              ))}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </Sidebar>
                <PageContent>
                  {/* 화면 오른쪽 콘텐츠 */}

                  <IntroduceBox>
                    {profile?.introduction == null ? (
                      <p>자기소개란</p>
                    ) : (
                      profile?.introduction
                    )}
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

export default OtherPersonProfile;
