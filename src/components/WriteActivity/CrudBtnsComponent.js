import React from "react";

export default function CrudBtnsComponent({
  id,
  show,
  setShow,
  folderInfo,
  setFolderInfo,
}) {
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
                return item.filter((itm) => itm.id !== id);
              });
            }}
          >
            삭제
          </button>
          <button
            id="ctrlV"
            onClick={() => {
              setShow(false);
              console.log("ctrlV clicked");
            }}
          >
            복제
          </button>
        </>
      )}
    </>
  );
}
