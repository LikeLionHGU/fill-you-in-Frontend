import React from "react";
import "../../font/font.module.css";
import styled from "styled-components";
import { deleteModal, folderInfoState } from "../atom";
import { useRecoilState } from "recoil";

const Modal = styled.dialog`
  width: 31.7vw;
  height: 22.7vh;
  border: none;
  border-radius: 50px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  > h3 {
    font-family: "Pretendard-SemiBold";
    color: #005f5f;
    margin: 0;
  }
`;

export default function DeleteModalComponent() {
  const [deleteMdState, setDeleteMdState] = useRecoilState(deleteModal);
  const [foldetInfo, setFolderInfo] = useRecoilState(folderInfoState);

  const deleteFolder = () => {
    setFolderInfo((itm) => {
      return itm.filter((i) => i.id !== deleteMdState.id);
    });
    setDeleteMdState({ state: false });
  };
  return (
    <Modal
      className="deleteModal"
      style={{ display: deleteMdState.state ? null : "none" }}
    >
      <h3>폴더를 삭제하시겠습니까?</h3>
      <form method="dialog">
        <button onClick={() => setDeleteMdState({ state: false })}>취소</button>
        <button onClick={deleteFolder}>삭제</button>
      </form>
    </Modal>
  );
}
