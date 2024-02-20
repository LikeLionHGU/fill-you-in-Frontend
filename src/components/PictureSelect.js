import styled from "styled-components";
import React, { useEffect, useState } from "react";

const ModalBackground = styled.div`
  z-index: 1000; // 마이페이지 내용보다 위에 보이도록(검은색 반투명 배경)
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.2); // 검은배경에 20% 투명도
  /* border: 2px solid red; */
  position: fixed; //모달 위치 fix
  bottom: 0; // 모달 위치 - 바닥으로 내림
  left: 0; // 모달 위치 - 왼쪽에 붙임 */
  top: 0;
  right: 0;
`;
const ModalExitBackground = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  position: fixed;
  bottom: 0; // 모달 위치 - 바닥으로 내림
  left: 0; // 모달 위치 - 왼쪽에 붙임 */
  top: 0;
  right: 0;
  z-index: 1500;
`;
const Modal = styled.div`
  box-shadow: 0 0 30px 1px #0000002a; // drop-down shadow 모달 그림자
  z-index: 2000; // 배경 보다 위에 있도록 함
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  width: 60%;
  height: 60%;
  border-radius: 50px;
`;
const ModalContents = styled.div`
  display: flex;
  flex-direction: row;
  width: 90%;
  height: 80%;
  /* border: 1px solid red; */
`;
const ModalText = styled.div`
  display: flex;

  justify-content: center;
  align-items: center;
  color: #005f5f;
  //  img 들어가야해서 삭제해야하는 부분
  font-family: "Pretendard-SemiBold", Helvetica;
  font-size: 25px;
  font-weight: 600;
  // img 들어가야해서 삭제해야하는 부분
  /* border: 1px solid black; */
  width: 50%;
  height: 100%;

  > div {
    // 이미지 선택창에서 처음 보여지는 이미지
    display: flex;
    justify-content: center;
    align-items: center;

    width: 100%;
    height: 100%;
    background-color: #e8e8e8;
    border-radius: 400px;
    overflow: hidden; // 이 동그라미 넘어가면 숨겨짐
  }
`;

const ModalInfo = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 60%;
  /* border: 2px solid green; */
`;
const ModalInfoText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  height: 100%;
  width: 100%;
  /* border: 2px solid red; */

  > div {
    margin-top: 10%;
  }
  > div > .file-name {
    font-weight: 500;
    font-size: 18px;
  }
  > .choose-pic-button {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 50%;
    /* border: 2px solid red; */
    border-radius: 20px;

    color: #a5a5a5;
    font-size: 18px;
    font-family: "Pretendard-SemiBold", Helvetica;
    font-weight: 500;
    text-decoration: underline;
    text-underline-offset: 3px;
    padding: 10px 60px;
  }
  > .choose-pic-button:hover {
    cursor: pointer;
  }
`;

const ModalButtons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  padding: 20px 20px;
  align-items: flex-end;
  /* border: 1px solid blue; */
  height: 50%;
`;
const SaveProfile = styled.div`
  /* border: 1px solid green; */
  padding: 10px 60px;
  border-radius: 25px;
  background-color: #06b5b5;
  color: white;
  font-size: 18px;
  font-weight: 500;
  font-family: "Pretendard-SemiBold", Helvetica;
  transition: 0.2s;
  &:hover {
    background-color: #008888;
    cursor: pointer;
  }
`;
const CancelButton = styled.div`
  /* border: 1px solid green; */
  color: #a5a5a5;
  font-size: 18px;
  font-family: "Pretendard-SemiBold", Helvetica;
  font-weight: 500;
  padding: 10px 60px;
  background-color: white;
  border-radius: 25px;
  border: 2px solid #06b5b5;
  transition: 0.2s;
  &:hover {
    cursor: pointer;
    color: #06b5b5;
    /* border: 2px solid #06b5b5; */
    background-color: #06b5b522;
  }
`;

function PictureSelect({ isOpen, closeModal }) {
  const [profileImg, setProfileImg] = useState([]);
  const getProfileImg = async () => {
    const url =
      process.env.REACT_APP_BACK_URL +
      "/api/fillyouin/my-profile/profile-image"; // 백엔드 api url => 각 페이지에서 요구하는 api 주소에 맞게 바꿔써줘야함.

    try {
      const response = await fetch(url, {
        method: "POST", //(+ GET인지 POST인지 명세 확인)
        headers: {
          Authorization: "Bearer " + localStorage.getItem("loginToken"), // Bearer 토큰으로 요청
        },
        body: {},
      });
      // console.log("AAARG");
      if (!response.ok) {
        throw new Error(`에러 Status: ${response.status}`);
      }
      const responseData = await response.json();
      console.log("Server Response", responseData); // 받아온 데이터를 콘솔로 확인
      setProfileImg(responseData); // useState로 쓰기 위해서 받아온 데이터를 profile에 설정
    } catch (error) {
      console.error("error", error);
    }
  };

  useEffect(() => {
    getProfileImg();
  }, []);
  //
  //
  // {profile?.profileImageUrl === null ? (
  //   <>
  //     {console.log("no profile", profile?.profileImageUrl)}
  //     <ProfilePicure src={profileSample} />
  //   </>
  // ) : (
  //   <>
  //     <ProfilePicure src={profile?.profileImageUrl} />
  //   </>
  // )}
  return (
    <ModalBackground style={{ display: isOpen ? "flex" : "none" }}>
      <ModalExitBackground onClick={closeModal}></ModalExitBackground>
      <Modal>
        <ModalContents>
          <ModalText>
            <div
              onClick={() => {
                console.log("사진 선택하기 클릭됨");
              }}
            >
              사진 선택하기
            </div>
          </ModalText>
          <ModalInfo>
            <ModalInfoText>
              <div>
                <span className="file-name">파일 이름 </span>:{" "}
                <span>__________________________</span>
              </div>

              <div className="choose-pic-button">다른 사진 선택</div>
            </ModalInfoText>
            <ModalButtons>
              <SaveProfile
                onClick={() => {
                  console.log("AAA");
                  // 프로필 수정 모달이랑 연결....안되는중
                }}
              >
                저장
              </SaveProfile>
              <CancelButton onClick={closeModal}>취소</CancelButton>
            </ModalButtons>
          </ModalInfo>
        </ModalContents>
      </Modal>
    </ModalBackground>
  );
}

export default PictureSelect;
