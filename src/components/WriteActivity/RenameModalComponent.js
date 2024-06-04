import React from "react";
import "../../font/font.module.css";
import { useState } from "react";
import styled from "styled-components";
import { nanoid } from "nanoid";
import { folderInfoState } from "../atom";
import { useRecoilState } from "recoil";
import { modalState } from "../atom";

const Modal = styled.dialog`
  width: 31.7%;
  height: 34%;
  border: none;
  border-radius: 40px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  > h3 {
    font-family: "Pretendard-SemiBold";
    color: #005f5f;
    margin: 0;
  }

  > form {
    > .add {
      width: 100px;
      height: 35px;
      margin-left: 15px;
      border-radius: 30px;
      border: none;
      background-color: #06b5b5;
      color: #ffffff;
      font-family: "Pretendard-SemiBold";

      &:hover {
        color: gray;
      }
    }

    > .cancle {
      width: 100px;
      height: 35px;
      margin-right: 15px;
      border-radius: 30px;
      border: 2px solid #06b5b5;
      font-family: "Pretendard-SemiBold";
      background-color: #ffffff;
      color: #06b5b5;

      &:hover {
        color: gray;
      }
    }
  }
`;

const InputArea = styled.div`
  text-align: left;
  padding: 0px 60px 0px 60px;

  > p {
    font-family: "Pretendard-SemiBold";
    color: #005f5f;
    margin: 0px 0px 10px 0px;
  }

  > input {
    width: 100%;
    height: 30px;
    background-color: #f4f3f1;
    border: none;
    padding-left: 15px;
    &:focus {
      outline: none;
    }

    ::placeholder {
      padding-left: 10px;
    }
  }
`;

function RenameModalComponent() {
  const [inputValue, setInputValue] = useState("");
  const [folderInfo, setFolderInfo] = useRecoilState(folderInfoState);
  const [modalstate, setModalstate] = useRecoilState(modalState);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const addFolder = () => {
    const date = new Date();
    const dateInfo =
      date.getFullYear() + "." + (date.getMonth() + 1) + "." + date.getDate();
    const newFolder = { name: inputValue, date: dateInfo, id: nanoid() };
    const updatedFolder = [...folderInfo, newFolder];
    setFolderInfo(updatedFolder);
    setInputValue("");
    setModalstate(false);
  };

  return (
    <Modal className="modal" style={{ display: modalstate ? null : "none" }}>
      <h3>폴더 추가하기</h3>
      <InputArea>
        <p>폴더명</p>
        <input
          placeholder="폴더명을 적어주세요"
          value={inputValue}
          onChange={(e) => handleInputChange(e)}
        />
      </InputArea>
      <form method="dialog">
        <button className="cancle" onClick={() => setModalstate(false)}>
          취소
        </button>
        <button className="add" onClick={addFolder} type="submit">
          추가
        </button>
      </form>
    </Modal>
  );
}

export default RenameModalComponent;
