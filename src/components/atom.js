import { atom } from "recoil";

export const folderInfoState = atom({
  key: "folderInfo",
  default: [
    {
      name: "멋쟁이사자처럼",
      date: "2024.04.26",
      id: 1,
    },
    {
      name: "PARD",
      date: "2024.03.09",
      id: 3,
    },
  ],
});

export const reNmModalState = atom({
  key: "renameModal",
  default: {
    state: false,
    name: " ",
  },
});

export const deleteModal = atom({
  key: "deleteMD",
  default: {
    state: false,
    id: " ",
  },
});
