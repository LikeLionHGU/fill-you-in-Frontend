import React from "react";
import "../../font/font.module.css";
import styled from "styled-components";
import { deleteModal, folderInfoState } from "../atom";
import { useRecoilState } from "recoil";

const Modal = styled.dialog`
  width: 31.7vw;
  height: 22.7vh;
  border: none;
  border-radius: 50px;
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
    > .delete {
      width: 100px;
      height: 35px;
      margin-left: 15px;
      border-radius: 30px;
      border: none;
      background-color: #06b5b5;
      color: #ffffff;
      font-family: "Pretendard-SemiBold";

      &:hover {
        background-color: #008888;
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

export default function DeleteModalComponent() {
  const [deleteMdState, setDeleteMdState] = useRecoilState(deleteModal);
  // eslint-disable-next-line no-unused-vars
  const [foldetInfo, setFolderInfo] = useRecoilState(folderInfoState);

  const deleteFolderData = async () => {
    const id = deleteMdState.id;
    const url = process.env.REACT_APP_BACK_URL + `/api/fillyouin/folders/${id}`;

    try {
      const response = await fetch(url, {
        method: "DELETE", //(+ GET인지 POST인지 명세 확인)
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("loginToken"), // Bearer 토큰으로 요청
        },
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

  const deleteFolder = () => {
    setFolderInfo((itm) => {
      return itm.filter((i) => i.id !== deleteMdState.id);
    });
    setDeleteMdState({ state: false });
    deleteFolderData();
  };

  return (
    <Modal
      className="deleteModal"
      style={{ display: deleteMdState.state ? null : "none" }}
    >
      <h3>폴더를 삭제하시겠습니까?</h3>
      <form method="dialog">
        <button
          className="cancle"
          onClick={() => setDeleteMdState({ state: false })}
        >
          취소
        </button>
        <button className="delete" onClick={deleteFolder}>
          삭제
        </button>
      </form>
    </Modal>
  );
}
