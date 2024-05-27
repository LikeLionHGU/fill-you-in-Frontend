import React from "react";
import styled from "styled-components";
import { nanoid } from "nanoid";

import PlusImg from "../../img/Vector.png";

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

export default function AddBtnComponent({ folderInfo, setFolderInfo }) {
  const addFolder = () => {
    const date = new Date();
    const dateInfo =
      date.getFullYear() + "." + (date.getMonth() + 1) + "." + date.getDate();

    const newFolder = { name: "빈 폴더", date: dateInfo, id: nanoid() };
    const updatedFolder = [...folderInfo, newFolder];
    setFolderInfo(updatedFolder);
  };

  return (
    <AddBtn onClick={() => addFolder()}>
      <img src={PlusImg} alt="plusImg" />
    </AddBtn>
  );
}
