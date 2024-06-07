import React, { useState } from "react";
import updateBtn from "../../img/dot.png";
import CrudBtnsComponent from "./CrudBtnsComponent";
import styled from "styled-components";

const UpdateBtn = styled.button`
  display: flex;
  align-items: center;
  border: none;
  background-color: #04b1b1;

  margin-bottom: 20px;
  margin-right: 5px;

  /* border: 2px solid white; */
  /* scale: 1; */
  cursor: pointer;
  > img {
    width: 1vw;
  }
  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 5px;
    /* transform: scale(1.2); */
  }
`;

export default function UpdateBtnComponent({ id }) {
  const [showOption, setShowOption] = useState(false);

  return (
    <>
      <UpdateBtn
        onFocus={(e) => {
          setShowOption(true);
        }}
        onBlur={(e) => {
          const modifyBtn = document.querySelector("#modify");
          const deleteBtn = document.querySelector("#delete");
          if (e.relatedTarget !== modifyBtn && e.relatedTarget !== deleteBtn) {
            setShowOption(false);
          }
        }}
      >
        <img src={updateBtn} alt="updateBtn" />
      </UpdateBtn>
      <CrudBtnsComponent id={id} show={showOption} setShow={setShowOption} />
    </>
  );
}
