import { atom } from "recoil";

export const folderInfoState = atom({
  key: "folderInfo",
  default: null,
});

export const eventInfoState = atom({
  key: "eventInfoState",
  default: "",
});

export const categoryIDState = atom({
  key: "categoryID",
  default: "",
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
