import React from "react";
import { reNmModalState, deleteModal } from "../atom";
import { useRecoilState } from "recoil";

export default function CrudBtnsComponent({ show, setShow, Id }) {
  const [modalState, setModalState] = useRecoilState(reNmModalState);
  const [deleteMdState, setDeleteMdState] = useRecoilState(deleteModal);

  const updateFolder = () => {
    const modal = document.querySelector(".modal");
    setModalState({
      name: "수정",
      id: Id,
      state: true,
    });
    modal.showModal();
  };

  const deleteFolder = () => {
    const modal = document.querySelector(".deleteModal");
    setDeleteMdState({ state: true, id: Id });
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
              deleteFolder();
            }}
          >
            삭제
          </button>
        </>
      )}
    </>
  );
}
