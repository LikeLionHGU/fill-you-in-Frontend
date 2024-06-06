import React from "react";
import "../../font/font.module.css";
import { useState } from "react";
import styled from "styled-components";
import { folderInfoState, reNmModalState, categoryIDState } from "../atom";
import { useRecoilState } from "recoil";

const Modal = styled.dialog`
  width: 31.7vw;
  height: 34vh;
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
        background-color: gray;
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
        background-color: #f1f1f1;
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
  const [modalState, setModalState] = useRecoilState(reNmModalState);
  const [categoryID, setCategoryID] = useRecoilState(categoryIDState);

  const setFolderData = async () => {
    const url = process.env.REACT_APP_BACK_URL + "/api/fillyouin/folders";
    const newArr = { name: inputValue, categoryId: categoryID };

    try {
      console.log(folderInfo);
      const response = await fetch(url, {
        method: "POST", //(+ GET인지 POST인지 명세 확인)
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("loginToken"), // Bearer 토큰으로 요청
        },

        body: JSON.stringify(newArr),
      }).then((json) => {
        console.log(json.ok);
        if (!!json.ok) {
          window.location.reload();
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP Error! Status: ${response.status}`);
      }
    } catch (error) {
      console.error("error", error);
    }
  };

  const updatedFolderData = async () => {
    const url = process.env.REACT_APP_BACK_URL + "/api/fillyouin/folders";
    const newArr = { name: inputValue, categoryId: categoryID };

    try {
      console.log(folderInfo);
      const response = await fetch(url, {
        method: "POST", //(+ GET인지 POST인지 명세 확인)
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("loginToken"), // Bearer 토큰으로 요청
        },

        body: JSON.stringify(newArr),
      }).then((json) => {
        console.log(json.ok);
        if (!!json.ok) {
          window.location.reload();
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP Error! Status: ${response.status}`);
      }
    } catch (error) {
      console.error("error", error);
    }
  };

  const addFolder = () => {
    const newFolder = { name: inputValue, id: categoryID };
    const updatedFolder = [...folderInfo, newFolder];
    setFolderInfo(updatedFolder);
    setInputValue("");
    setModalState({ state: false });
    setFolderData();
  };

  const updateFolder = () => {
    const updatedFolderInfo = folderInfo.map((itm) =>
      itm.id === modalState.id ? { ...itm, name: inputValue } : itm
    );
    setFolderInfo(updatedFolderInfo);
    setInputValue("");
    setModalState({ state: false });
  };

  // const activeEnter = (e) => {
  //   if (e.key === "Enter") {
  //     e.preventDefault();
  //     modalState.name === "추가" ? addFolder() : updateFolder();
  //   }
  // };

  return (
    <Modal
      className="modal"
      style={{ display: modalState.state ? null : "none" }}
    >
      <h3>폴더 {modalState.name}하기</h3>
      <InputArea>
        <p>폴더명</p>
        <input
          placeholder="폴더명을 적어주세요"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          // onKeyDown={activeEnter}
        />
      </InputArea>
      <form method="dialog">
        <button
          className="cancle"
          onClick={() => {
            setModalState({ state: false });
            setInputValue("");
          }}
        >
          취소
        </button>
        <button
          className="add"
          onClick={modalState.name === "추가" ? addFolder : updateFolder}
        >
          {modalState.name}
        </button>
      </form>
    </Modal>
  );
}

export default RenameModalComponent;
