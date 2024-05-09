import React from "react";
import styled from "styled-components";
import { nanoid } from "nanoid";
import "../../font/font.module.css";

const Folder = styled.button`
  width: 19vw;
  height: 19vh;
  background-color: #04b1b1;
  color: white;
  border-radius: 20px;
  border: none;

  > .title {
    font-family: "Pretendard-Regular";
    font-size: 17px;
    margin-left: 18px;
    text-align: left;
  }

  > .date {
    font-family: "Pretendart-Medium";
    font-size: 10px;
    margin-left: 18px;
    text-align: left;
  }
`;

export default function FolderComponent({ FolderInfo }) {
  return (
    <>
      {FolderInfo &&
        FolderInfo.map((item) => (
          <Folder key={nanoid()}>
            <p className="title">{item.name}</p>
            <p className="date">{item.date}</p>
            <button>➕</button>
          </Folder>
        ))}
    </>
  );
}
