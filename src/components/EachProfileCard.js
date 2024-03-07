import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import sampleProfileImg from "../img/profileSample.png";
import scrap from "../img/Scrap.png";
import noScrap from "../img/noScrap.png";
import axios from "axios";

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
            onClick={() => navigate(`/OtherPage/${id}/${isScrapped}`)}
          >
            프로필 방문
          </button>
        </CardButtons>
      </CardContainer>
    </ProfileCard>
  );
};

export default EachProfileCard;

const ProfileCard = styled.div`
  display: flex;
  background-color: white;
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
