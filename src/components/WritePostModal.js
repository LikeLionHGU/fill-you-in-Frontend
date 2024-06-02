import React from "react";
import styled from "styled-components";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";

// import MUIRichTextEditor from "mui-rte";
// import RichTextEditor from "./RichTextEditor";

// // import MUIRichTextEditor from "mui-rte";
// import AttachFileIcon from "@mui/icons-material/AttachFile";
// import TableChartIcon from "@mui/icons-material/TableChart";
import TestEditorForm from "./TextEditorForm";

/*
npm install mui-rte <- rich text editor 사용하려면 설치해야함 
npm install draft-js <- 

*/

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
  height: 98%; /* 추가 */
  position: relative; /* 추가 */
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
  border: 2px solid red;
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
  border: 2px solid pink;
  /* height: 25%; */
  position: absolute; /* 추가 */
  bottom: 0; /* 추가 */
  width: 100%; /* 추가 */
  //padding: 10px 0; /* 추가 */
  background: none; /* 추가 */
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
