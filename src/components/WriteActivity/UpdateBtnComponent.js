import React, { useState } from "react";
import updateBtn from "../../img/dot.png";
import CrudBtnsComponent from "./CrudBtnsComponent";
import styled from "styled-components";

const UpdateBtn = styled.button`
  border: none;
  background-color: #04b1b1;
  margin-bottom: 25px;
  margin-right: 5px;

  > img {
    width: 1vw;
  }
`;

export default function UpdateBtnComponent({ id }) {
  const [showOption, setShowOption] = useState(false);

  return (
    <>
      <UpdateBtn
        onFocus={() => {
          setShowOption(true);
        }}
        onBlur={(e) => {
          const modifyBtn = document.querySelector("#modify");
          const deleteBtn = document.querySelector("#delete");
          // if (e.relatedTarget !== modifyBtn && e.relatedTarget !== deleteBtn) {
          //   setShowOption(false);
          // }
        }}
      >
        <img src={updateBtn} alt="updateBtn" />
      </UpdateBtn>
      <CrudBtnsComponent Id={id} show={showOption} setShow={setShowOption} />
    </>
  );
}
