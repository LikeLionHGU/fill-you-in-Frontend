import React, { useState } from "react";
import updateBtn from "../../img/dot.png";
import styled from "styled-components";

const UpdateBtn = styled.button`
  border: none;
  background-color: #04b1b1;
  margin-bottom: 25px;
  margin-right: 5px;
  > img {
    width: 17px;
  }
`;

export default function UpdateBtnComponent() {
  const [showOption, setShowOption] = useState(false);
  return (
    <>
      <UpdateBtn
        onFocus={() => setShowOption(true)}
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
      <ShowModifyOption show={showOption} setShow={setShowOption} />
    </>
  );
}

function ShowModifyOption({ show, setShow }) {
  return (
    <>
      {show && (
        <>
          <button
            id="modify"
            onClick={() => {
              setShow(false);
              console.log("modify clicked");
            }}
          >
            수정
          </button>
          <button
            id="delete"
            onClick={() => {
              setShow(false);
              console.log("delete clicked");
            }}
          >
            삭제
          </button>
        </>
      )}
    </>
  );
}
