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
      name: "YMC",
      date: "2024.05.05",
      id: 2,
    },
    {
      name: "PARD",
      date: "2024.03.09",
      id: 3,
    },
    {
      name: "test1",
      date: "2000.01.01",
      id: 4,
    },
  ],
});

export const modalState = atom({
  key: "modal",
  default: false,
});
