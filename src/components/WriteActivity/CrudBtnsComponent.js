import React from "react";
import { folderInfoState, modalState, modalNameState } from "../atom";
import { useRecoilState } from "recoil";

export default function CrudBtnsComponent({ show, setShow, Id }) {
  const [folderInfo, setFolderInfo] = useRecoilState(folderInfoState);
  const [modalstate, setModalstate] = useRecoilState(modalState);
  const [modalNmState, setModalNmState] = useRecoilState(modalNameState);

  const updateFolder = () => {
    const modal = document.querySelector(".modal");
    setModalNmState({
      name: "수정",
      id: Id,
    });
    setModalstate(true);
    modal.showModal();
  };

  return (
    <>
      {show && (
        <>
          <button
            id="modify"
            onClick={() => {
              setShow(false);
              updateFolder();
            }}
          >
            수정
          </button>
          <button
            id="delete"
            onClick={() => {
              setShow(false);
              setFolderInfo((item) => {
                return item.filter((itm) => itm.id !== Id);
              });
            }}
          >
            삭제
          </button>
        </>
      )}
    </>
  );
}
