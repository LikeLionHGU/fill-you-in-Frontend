import styled from "styled-components";
import ModifyProfile from "./ModifyProfile";
import { useState } from "react";

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
  flex-direction: column;
  width: 65%;
  height: 65%;
  /* border: 1px solid red; */
`;
const ModalText = styled.div`
  display: flex;

  justify-content: center;
  align-items: flex-end;

  color: #005f5f;
  font-family: "Pretendard-SemiBold", Helvetica;
  font-size: 25px;
  font-weight: 600;

  /* border: 1px solid black; */
  height: 50%;
`;
const ModalButtons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: flex-end;
  /* border: 1px solid blue; */
  height: 50%;
`;
const MakeProfile = styled.div`
  /* border: 1px solid green; */
  padding: 13px 60px;
  border-radius: 25px;
  background-color: #06b5b5;
  color: white;
  font-size: 18px;
  font-weight: 500;
  font-family: "Pretendard-SemiBold", Helvetica;

  &:hover {
    cursor: pointer;
  }
`;
const MakeLater = styled.div`
  /* border: 1px solid green; */
  color: #a5a5a5;
  font-size: 18px;
  font-family: "Pretendard-SemiBold", Helvetica;
  font-weight: 500;
  text-decoration: underline;
  text-underline-offset: 3px;
  padding: 10px 60px;

  &:hover {
    cursor: pointer;
  }
`;

const FirstVisitModal = ({ isOpen, closeModal }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const showModal = () => {
    setModalOpen(true);
  };

  const handleFirstVisit = () => {
    // 처음 방문한건지 아닌지...
    localStorage.setItem("notFirst", true);
  };

  return (
    <>
      {modalOpen === true ? (
        <ModifyProfile />
      ) : (
        <ModalBackground style={{ display: isOpen ? "flex" : "none" }}>
          <ModalExitBackground onClick={closeModal}></ModalExitBackground>
          <Modal>
            <ModalContents>
              <ModalText>프로필을 입력해보세요!</ModalText>
              <ModalButtons>
                <MakeProfile onClick={showModal}>프로필 작성하기</MakeProfile>

                <MakeLater onClick={closeModal}>
                  {" "}
                  {/* onClick={handleFirstVisit}*/}
                  나중에 작성하기
                </MakeLater>
              </ModalButtons>
            </ModalContents>
          </Modal>
        </ModalBackground>
      )}
    </>
  );
};

export default FirstVisitModal;
