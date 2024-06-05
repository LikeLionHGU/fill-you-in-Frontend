import React from "react";
import { reNmModalState, deleteModal } from "../atom";
import "../../font/font.module.css";
import { useRecoilState } from "recoil";
import styled from "styled-components";

const Wrapper = styled.div`
  position: absolute;
  top: 20px;
  right: 0px;
  display: flex;
  flex-direction: column;

  > button {
    border: 0;
    background-color: #ffffff;
    font-size: 12px;
    font-family: "Pretendard-SemiBold";

    &:hover {
      background-color: #f1f1f1;
    }
  }

  > #delete {
    padding: 5px;
    border-radius: 5px 5px 0 0;
  }

  > #modify {
    padding: 5px;
    border-radius: 0 0 5px 5px;
  }
`;

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
    <Wrapper>
      {show && (
        <>
          <button
            id="delete"
            onClick={() => {
              setShow(false);
              deleteFolder();
            }}
          >
            삭제
          </button>
          <button
            id="modify"
            onClick={() => {
              setShow(false);
              updateFolder();
            }}
          >
            이름변경
          </button>
        </>
      )}
    </Wrapper>
  );
}
