import React from "react";
import styled from "styled-components";
import "../../font/font.module.css";
import UpdateBtnComponent from "./UpdateBtnComponent";
import { folderInfoState } from "../atom";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";

const Folder = styled.button`
  width: 20vw;
  height: 19vh;
  background-color: #04b1b1;
  color: white;
  border-radius: 20px;
  border: none;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  > div {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-top: 10px;

    > .title {
      font-family: "Pretendard-Regular";
      font-size: 17px;
      margin-left: 18px;
      text-align: left;
      border: none;
      background-color: #04b1b1;
      color: white;
      margin-top: 20px;
    }

    > input {
      font-size: 1vw;
      width: 70%;
      &:focus {
        outline: none;
      }
    }
  }

  > .date {
    font-family: "Pretendart-Medium";
    font-size: 10px;
    margin-left: 18px;
    margin-bottom: 0;
    text-align: left;
    margin-bottom: 20px;
  }
`;

export default function FolderComponent({ categoryId }) {
  const [folderInfo, setFolderInfo] = useRecoilState(folderInfoState);
  const navigate = useNavigate();

  return (
    <>
      {folderInfo &&
        folderInfo.map((item) => (
          <Folder
            onDoubleClick={() => {
              navigate(
                `/AddFolderPage/${categoryId}/ViewMyPostPage/${item.id}`
              );
            }}
            key={item.name}
          >
            <div style={{ position: "relative" }}>
              <input className="title" value={item.name} disabled />
              <UpdateBtnComponent id={item.id} />
            </div>
          </Folder>
        ))}
    </>
  );
}
