import React from "react";
import styled from "styled-components";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";

import TestEditorForm from "./TextEditorForm";

/*
mui rte 삭제. 다른것 쓸 것임.

*/

function WritePostModal({ setModalOpen }) {
  const closeModal = () => {
    setModalOpen(false);
  };

  const handleSubmit = async (data) => {
    setModalOpen(false); // !! 나중에 백엔드랑 연결할 때 여기서 저장해서 넘겨줘야함.
  };
  return (
    <>
      <ModalBackground>
        {/* <ModalExitBackground onClick={closeModal}></ModalExitBackground> 
        나중에 배경만 눌렀을때도 모달을 끄고싶다면 이부분 추가.
        */}
        <Modal>
          <ModalContents>
            <ModealHeader>
              <div className="modal-cancel">
                <CancelButton onClick={closeModal}>
                  <ClearRoundedIcon />
                </CancelButton>
              </div>

              <div className="modal-title">활동 작성하기</div>
              {/* <ModalPostInfos>
                <ActivityNames className="activity-title">활동명</ActivityNames>
                <ActivityNames className="activity-agency-title">
                  회사/기관/단체명
                </ActivityNames>
                <DateWrapper>
                  <ActivityDate className="activity-start-date">
                    시작일
                  </ActivityDate>
                  <ActivityDate className="activity-end-date">
                    종료일
                  </ActivityDate>
                </DateWrapper>
              </ModalPostInfos> */}
              <ModalPostInfos>
                <InputField className="activity-title" placeholder="활동명" />
                <InputField
                  className="activity-agency-title"
                  placeholder="회사/기관/단체명"
                />
                <DateWrapper>
                  <InputField type="date" className="activity-start-date" />
                  <InputField type="date" className="activity-end-date" />
                </DateWrapper>
              </ModalPostInfos>
            </ModealHeader>
            <ModalInfo>
              <ModalInfoText>
                {/* <RichTextEditor /> */}
                <TestEditorForm />
              </ModalInfoText>
            </ModalInfo>
            <ModalButtons>
              <SaveButton type="submit" onClick={handleSubmit}>
                저장하기
              </SaveButton>
            </ModalButtons>
          </ModalContents>
        </Modal>
      </ModalBackground>
    </>
  );
}

export default WritePostModal;

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

// 아래 컴포넌트는 나중에 배경만 눌렀을때 모달 끄고싶으면 사용!!!!!
// eslint-disable-next-line
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
  display: flex;
  flex-direction: column;
  justify-content: start;
  box-shadow: 0 0 10px 1px #0000002a; // drop-down shadow 모달 그림자
  z-index: 2000; // 배경 보다 위에 있도록 함
  position: fixed;
  padding-top: 20px;
  align-items: center;
  background-color: white;
  width: 60%;
  /* height: 65%; */
  height: 600px;
  border-radius: 25px;

  /* border: 2px solid blue; */
`;
const ModalContents = styled.div`
  display: flex;
  flex-direction: column;
  /* border: 1px solid red; */
  width: 95%;
  /* 아래부분 추가 */
  height: 98%;
  position: relative;
  /* 위 부분 추가 */
`;
const ModealHeader = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  .modal-cancel {
    display: flex;
    justify-content: end;
  }
  .modal-title {
    display: flex;
    color: black;
    justify-content: center;
    font-size: 20px;
    margin-top: -10px;
  }
`;
const CancelButton = styled.div`
  /* border: 1px solid green; */
  display: flex;
  align-items: center;
  justify-content: center;
  color: #06b5b5;

  font-family: "Pretendard-SemiBold", Helvetica;

  width: 30px;
  height: 30px;
  margin-top: -5px;
  background-color: none;
  /* border-radius: 25px; */
  cursor: pointer;
  > svg {
    width: 35px;
    height: 35px;
  }
`;
const ModalPostInfos = styled.div`
  display: flex;
  width: 100%;
  height: 70px;
  /* border: 2px solid red; */
  /* justify-content: space-evenly; */
  align-items: center;
`;

// const ActivityNames = styled.div`
//   // 동일한 부분은 이렇게 놔두고, 클래스로 나눠서 다르게 효괒 ㅜ기.
//   display: flex;
//   height: 35px;

//   margin-right: 30px;
//   border-radius: 5px;
//   border: 2px solid #04b1b1;
//   align-items: center;
//   padding-left: 10px;
//   &.activity-title {
//     /* background-color: black; */
//     /* color: white; */

//     width: 180px;
//   }

//   &.activity-agency-title {
//     width: 180px;
//   }
// `;

const InputField = styled.input`
  display: flex;
  height: 35px;
  margin-right: 30px;
  border-radius: 5px;
  border: 2px solid #04b1b1;
  padding-left: 10px;

  &.activity-title,
  &.activity-agency-title {
    width: 180px;
  }

  &.activity-start-date,
  &.activity-end-date {
    width: 150px;
  }

  &.activity-start-date {
    margin-right: 0px;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  &.activity-end-date {
    margin-right: 0px;
    border-left: none;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
`;

const DateWrapper = styled.div`
  display: flex;
  flex-direction: row;
  height: 35px;
`;
const ActivityDate = styled.div`
  display: flex;

  /* border: 2px solid black; */

  border-radius: 5px;
  border: 2px solid #04b1b1;
  width: 100px;

  &.activity-start-date {
    border-top-right-radius: 0px;
    border-bottom-right-radius: 0px;
  }

  &.activity-end-date {
    border-left: none;
    border-top-left-radius: 0px;
    border-bottom-left-radius: 0px;
  }
`;

const ModalInfo = styled.div`
  display: flex;

  flex-direction: column;
  height: 100%;
  width: 100%;

  /* border: 1px solid #303030; */
`;
const ModalInfoText = styled.div`
  display: flex;
  flex-direction: column;
  /* align-items: stretch; */
  height: 85%;
  width: 100%;
  /* border: 2px solid purple; */

  font-size: 100px;
  overflow-y: auto; /* 추가 */
  /* overflow-x: scroll; */
`;

const ModalButtons = styled.div`
  display: flex;

  justify-content: center;
  align-items: end;
  /* border: 2px solid pink; */
  /* height: 25%; */
  position: absolute; /* 추가 */
  bottom: 10px; /* 추가 */
  width: 100%; /* 추가 */
  //padding: 10px 0; /* 추가 */
  background: none; /* 추가 */
  cursor: pointer;
`;

// eslint-disable-next-line
const SaveProfile = styled.form`
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

const SaveButton = styled.div`
  padding: 10px 60px;
  border-radius: 7px;
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
