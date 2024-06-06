import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { HiOutlineDotsHorizontal } from "react-icons/hi";

function ArchiveTimelineSidebar() {
  const [buttons, setButtons] = useState([]);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [cid, setCid] = useState(null);
  const dropdownRefs = useRef([]);
  var categoryId;
  var changedName;

  useEffect(() => {
    getCategories();
    // setCategories();
  }, []);

  // useEffect(() => {
  //   localStorage.setItem("savedButtons", JSON.stringify(buttons));

  const getCategories = async () => {
    const url = process.env.REACT_APP_BACK_URL + "/api/fillyouin/categories";

    try {
      const response = await fetch(url, {
        method: "GET", //(+ GET인지 POST인지 명세 확인)
        headers: {
          Authorization: "Bearer " + localStorage.getItem("loginToken"), // Bearer 토큰으로 요청
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP Error! Status: ${response.status}`);
      }
      const responseData = await response.json();
      const variable = responseData.categories.map((item) => ({
        name: item.name,
        id: item.id,
        editing: false,
      }));
      setButtons(variable);
    } catch (error) {
      console.error("error", error);
    }
  };

  const delCategories = async () => {
    const url =
      process.env.REACT_APP_BACK_URL +
      `/api/fillyouin/categories/${categoryId}`;

    console.log(url);
    try {
      const response = await fetch(url, {
        method: "DELETE", //(+ GET인지 POST인지 명세 확인)
        headers: {
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

  const setCategories = async () => {
    const url = process.env.REACT_APP_BACK_URL + "/api/fillyouin/categories";
    const newArr = { name: "제목없음" };
    // console.log("Bearer " + localStorage.getItem("loginToken"));
    try {
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

  const updateCategories = async () => {
    const url =
      process.env.REACT_APP_BACK_URL + `/api/fillyouin/categories/${cid}`;
    const newArr = { name: changedName };
    // console.log("Bearer " + localStorage.getItem("loginToken"));

    try {
      const response = await fetch(url, {
        method: "PATCH", //(+ GET인지 POST인지 명세 확인)
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

  const addNewBtn = () => {
    // const btnCount = buttons.length + 1;
    // const newBtnName = btnCount + "학년"; <- 기간에서 새로운 학년 추가할때...

    const newBtnName = "제목 없음";
    const newArr = [...buttons, { name: newBtnName, editing: false }];
    setButtons(newArr);
    setCategories();
  };

  const toggleDropdown = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  const removeButton = (index) => {
    setButtons(buttons.filter((_, i) => i !== index));
    setActiveDropdown(null);
    delCategories();
  };

  const startEditing = (index) => {
    setButtons(
      buttons.map((btn, i) =>
        i === index ? { ...btn, editing: true } : { ...btn, editing: false }
      )
    );
    setActiveDropdown(null);
  };

  const handleNameChange = (index, newName) => {
    setButtons(
      buttons.map((btn, i) =>
        i === index ? { ...btn, name: newName, editing: false } : btn
      )
    );
    changedName = newName;
    updateCategories();
  };

  const handleClickOutside = (event) => {
    if (
      activeDropdown !== null &&
      !dropdownRefs.current[activeDropdown].contains(event.target)
    ) {
      setActiveDropdown(null);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
    // eslint-disable-next-line
  }, [activeDropdown]);

  const handleKeyDown = (event, index) => {
    if (event.key === "Enter") {
      handleNameChange(index, event.target.value);
    }
  };

  const handleBlur = (index, currentName) => {
    setButtons(
      buttons.map((btn, i) =>
        i === index ? { ...btn, name: currentName, editing: false } : btn
      )
    );
    updateCategories();
  };

  return (
    <>
      <Background>
        <SideBarContainer>
          <SideBarContents>
            {buttons.map((btn, index) => (
              <SideBarBtn key={index}>
                {btn.editing ? (
                  <RenameInput
                    className="rename-input"
                    type="text"
                    value={btn.name}
                    onChange={(e) =>
                      setButtons(
                        buttons.map((b, i) =>
                          i === index ? { ...b, name: e.target.value } : b
                        )
                      )
                    }
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    onBlur={() => {
                      handleBlur(index, btn.name);
                      changedName = btn.name;
                    }}
                    // autoFocus // <- 이걸 빼야 input 필드 스타일 수정 가능
                  />
                ) : (
                  btn.name
                )}
                <BtnSetting
                  ref={(el) => (dropdownRefs.current[index] = el)}
                  onClick={() => toggleDropdown(index)}
                >
                  <HiOutlineDotsHorizontal />
                  {activeDropdown === index && ( // 삭제, 이름 변경하는 dropdown 메뉴 부분
                    <DropdownSetting>
                      <DropdownItem
                        onClick={() => {
                          categoryId = btn.id;
                          removeButton(index);
                        }}
                      >
                        삭제
                      </DropdownItem>
                      <DropdownItem
                        onClick={() => {
                          categoryId = btn.id;
                          setCid(btn.id);
                          startEditing(index);
                        }}
                      >
                        이름 변경
                      </DropdownItem>
                    </DropdownSetting>
                  )}
                </BtnSetting>
              </SideBarBtn>
            ))}
            <SideBarBtn onClick={addNewBtn}>
              <span>+ 추가</span>
            </SideBarBtn>
          </SideBarContents>
        </SideBarContainer>
      </Background>
    </>
  );
}

export default ArchiveTimelineSidebar;
const RenameInput = styled.input`
  display: flex;
  width: 100%;
  height: 50%;
  /* border-top: none;
  border-bottom: none;
  border-left: none;
  border-right: none; */
  /* border: 2px solid red; */
  color: black;
  transition: 0.1s;
  &.rename-input {
    // 이름 수정하기 버튼 누르고 직후 input 칸

    /* border: 2px solid red; */
    /* border: none; */
    border: 2px solid #04b1b1;
    transition: 0.1s;
    /* background: aliceblue; */
    /* border-bottom: 2px solid #04b1b1; */
    border-radius: 4px;
    color: #04b1b1;
    font-weight: bold;
    padding-bottom: 2px;
    /* transition: 0.5s; */
    margin-left: 0px;
  }
  &.rename-input:focus-visible {
    // 인풋 클릭해서 focus했을 때
    // input 필드 클릭했을때 스타일
    outline: none !important; // 원래 아웃라인. (Input 필드 클릭시 생기는 기본 파란색 테두리)
    // 아웃라인 None 해야 앞서 설정한 테두리 설정 그대로 적용.
  }
`;
const DropdownSetting = styled.div`
  display: flex;
  flex-direction: column;
  width: 70px;
  border-radius: 5px;
  padding: 5px;
  text-align: center;
  position: absolute;
  color: black;
  font-size: 12px;
  background-color: white;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
  right: 0;
  top: 75%;
  left: 3%;
  z-index: 1;
`;

const DropdownItem = styled.div`
  padding: 8px 12px;
  cursor: pointer;
  &:hover {
    background-color: #f1f1f1;
  }
`;

const Background = styled.div`
  display: flex;
  width: 17vw;
  height: 100vh;
  /* margin-top: 4%; */
`;

const SideBarContainer = styled.div`
  display: flex;
  border-right: 0.2vw solid rgba(0, 0, 0, 0.1);
  width: 100%;
  height: 100%;
  padding: 8%;
  margin-top: 4%;
`;

const SideBarContents = styled.div`
  display: flex;
  background-color: white;
  flex-direction: column;
  width: 100%;
  padding-left: 4%;
`;

const SideBarBtn = styled.div`
  display: flex;
  height: 5%;
  padding-left: 1.5vw;
  padding-right: 0.2vw;
  padding-top: 2.5%;
  margin-bottom: 10%;
  text-align: left;
  justify-content: space-between;
  align-items: center;
  border-radius: 0.3vw;
  color: #04b1b1;
  font-weight: bold;
  font-size: 1vw;
  cursor: pointer;

  &:hover {
    background-color: rgba(4, 177, 177, 0.08);
    > div svg {
      color: lightgray;
      &:hover {
        color: gray;
      }
    }
  }

  > span {
    padding-left: 0px;
  }

  input {
    font-size: 1vw;
    padding: 0.5vw;
    border: 1px solid #ccc;
    border-radius: 0.2vw;
  }
`;

const BtnSetting = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 3vw;
  height: 3vw;
  margin: 0px;
  margin-bottom: 0.4vw;
  color: white;
  font-size: 20px;
  transition: 0.3s;
  position: relative;
`;
// eslint-disable-next-line

const SideBarAddBtn = styled.div`
  display: flex;
  padding-left: 0px;
`;
