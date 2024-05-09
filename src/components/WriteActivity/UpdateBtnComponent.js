import React from "react";
import updateBtn from "../../img/dot.png";
import styled from "styled-components";

const UpdateBtn = styled.button`
  border: none;
  background-color: #04b1b1;
  padding-bottom: 20px;
  > img {
  }
`;

export default function UpdateBtnComponent() {
  return (
    <UpdateBtn>
      <img src={updateBtn} alt="updateBtn" />
    </UpdateBtn>
  );
}
