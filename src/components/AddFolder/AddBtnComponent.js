import React from "react";
import styled from "styled-components";
import emptyFolder from "../../img/addFolder.png";
import plusBtn from "../../img/plusFolder.png";
import { useRecoilState } from "recoil";
import { reNmModalState } from "../atom";

const AddBtn = styled.button`
  width: 20vw;
  height: 19vh;
  position: relative;
  border: none;
  background-color: #ffffff;
  padding: 0;
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    transform: scale(1.05);
  }
  > #emptyFolder {
    width: 20vw;
    height: 19vh;
  }

  > #plusBtn {
    width: 35px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

export default function AddBtnComponent() {
  // eslint-disable-next-line no-unused-vars
  const [modalState, setModalState] = useRecoilState(reNmModalState);

  const addFolder = () => {
    const modal = document.querySelector(".modal");
    setModalState({
      state: true,
      name: "추가",
    });
    modal.showModal();
  };

  return (
    <AddBtn onClick={() => addFolder()}>
      <img src={emptyFolder} alt="emptyFolder" id="emptyFolder" />
      <img src={plusBtn} alt="plusBtn" id="plusBtn" />
    </AddBtn>
  );
}
