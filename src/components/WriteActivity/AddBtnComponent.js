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
  const addFolder = () => {
    const newFolder = { name: "빈 폴더", date: "20xx.xx.xx" };
    const updatedFolder = [...folderInfo, newFolder];
    setFolderInfo(updatedFolder);
  };
  return (
    <AddBtn onClick={() => addFolder()}>
      <img src={PlusImg} alt="plusImg" />
    </AddBtn>
  );
}
