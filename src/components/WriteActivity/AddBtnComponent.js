import React from "react";
import styled from "styled-components";

import PlusImg from "../../img/Vector.png";

const AddBtn = styled.button`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: none;
  background-color: #04b1b1;

  > img {
    width: 20px;
    padding-top: 3px;
  }
`;

export default function AddBtnComponent({ folderInfo, setFolderInfo }) {
  return (
    <AddBtn onClick={() => alert("addBtn clicked")}>
      <img src={PlusImg} alt="plusImg" />
    </AddBtn>
  );
}
