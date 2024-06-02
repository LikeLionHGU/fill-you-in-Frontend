import React from "react";
import styled from "styled-components";
import PlusImg from "../../img/Vector.png";
import { useRecoilState } from "recoil";
import { modalState } from "../atom";

const AddBtn = styled.button`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: none;
  background-color: #04b1b1;
  box-shadow: 2px 2px 5px gray;

  > img {
    width: 20px;
    padding-top: 3px;
  }
`;

export default function AddBtnComponent() {
  const [modalstate, setModalstate] = useRecoilState(modalState);
  const addFolder = () => {
    const modal = document.querySelector(".modal");
    setModalstate(true);
    modal.showModal();
  };

  return (
    <AddBtn onClick={() => addFolder()}>
      <img src={PlusImg} alt="plusImg" />
    </AddBtn>
  );
}
