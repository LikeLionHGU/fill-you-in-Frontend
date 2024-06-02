import React from "react";
import styled from "styled-components";

import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
/*
npm install @mui/icons-material
npm install @mui/icons-material @mui/material @emotion/styled @emotion/react
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
              <ModalPostInfos></ModalPostInfos>
            </ModealHeader>
            <ModalInfo>
              <ModalInfoText>LALALA</ModalInfoText>
              <ModalButtons>
                <SaveButton type="submit" onClick={handleSubmit}>
                  저장하기
                </SaveButton>
              </ModalButtons>
            </ModalInfo>
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
  justify-content: center;
  box-shadow: 0 0 10px 1px #0000002a; // drop-down shadow 모달 그림자
  z-index: 2000; // 배경 보다 위에 있도록 함
  position: fixed;

  align-items: center;
  background-color: white;
  width: 50%;
  /* height: 65%; */
  height: 600px;
  border-radius: 25px;

  border: 2px solid blue;
`;
const ModalContents = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  height: 90%;
  /* border: 1px solid red; */
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
  height: 80px;
  border: 2px solid red;
`;

const ModalInfo = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  border: 2px solid green;
`;
const ModalInfoText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  height: 100%;
  width: 100%;
  border: 2px solid red;

  font-size: 100px;
`;

const ModalButtons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  /* padding: 30px 30px; */
  align-items: end;
  /* border: 1px solid blue; */
  height: 25%;
`;
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
