import React from "react";
import { folderInfoState, inputValueState } from "../atom";
import { useRecoilState } from "recoil";

export default function CrudBtnsComponent({ show, setShow, Id }) {
  const [folderInfo, setFolderInfo] = useRecoilState(folderInfoState);

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
              setFolderInfo((item) => {
                return item.filter((itm) => itm.id !== Id);
              });
            }}
          >
            삭제
          </button>
        </>
      )}
    </>
  );
}
