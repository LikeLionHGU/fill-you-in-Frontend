import React, { useEffect, useState } from "react";
import styled from "styled-components";
// eslint-disable-next-line no-unused-vars
import { useNavigate } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { createElement } from "react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";

// /*

//  npm install react-icons --save 로 아이콘 사용함, 에러나면 이 명령어 터미널에 입력 후 아이콘 사용

// */

const Background = styled.div`
  display: flex;
  /* background-color: aliceblue; */
  width: 16vw;
  height: 100vh;
  padding-top: 4%;
`;
const SideBarContainer = styled.div`
  display: flex;

  /* border-right: 0.2vw solid lightgray; */

  border-right: 0.2vw solid rgba(0, 0, 0, 0.1);

  /* box-shadow: 3px 0 2px lightgray; */
  width: 100%;
  height: 80%;
  padding: 8%;
`;
const SideBarContents = styled.div`
  display: flex;
  background-color: white;
  flex-direction: column;
  /* border: 2px solid green; */
  width: 100%;
  padding-left: 4%;
`;
const SideBarBtn = styled.div`
  display: flex;
  height: 6%;
  /* width: 100%; */
  padding-left: 1.5vw;
  padding-right: 0.2vw;
  padding-top: 2.5%;
  margin-bottom: 10%;
  text-align: left;
  justify-content: space-between;
  align-items: center;
  /* border: 2px solid gold; */
  border-radius: 0.3vw;
  color: #04b1b1;
  font-weight: bold;
  font-size: 1vw;

  cursor: pointer;

  &:hover {
    /* color: red; */
    background-color: rgba(
      4,
      177,
      177,
      0.08
    ); // #04b1b1 를 rgba로 바꾼 것. 8% opacity
    > div {
      display: flex; // 버튼 안의 메뉴인 *** 버튼을 SidebarBtn을 호버 할때만 보이도록 설정
    }
  }
  > span {
    padding-left: 0px;
  }
`;
const BtnSetting = styled.div`
  display: none;
  justify-content: center;
  align-items: center;
  width: 3vw;
  height: 3vw;

  margin: 0px;
  margin-bottom: 0.4vw;
  color: lightgray;
  font-size: 1.3vw;
  transition: 0.3s;
  /* border: 2px solid gray; */

  &:hover {
    /* background-color: gainsboro; */
    color: gray;
    border-radius: 1vw;
    /* border: 1px solid gray; */
  }
`;
// eslint-disable-next-line no-unused-vars
const SideBarAddBtn = styled.div`
  display: flex;
  padding-left: 0px;
`;

function ArchiveTimelineSidebar() {
  /* 새로고침하면 추가한 버튼들이 다시 되돌아감, 나중에 저장해주는 과정 있어야 한다 */
  // const [buttons, setButtons] = useState(["1학년", "2학년", "3학년", "4학년"]); //

  const [buttons, setButtons] = useState(() => {
    // 로컬 storage에 일단 저장하고 다시 가져오는 식으로.. 나중에 백엔드랑 연결할때 고쳐야 할 듯
    const savedButtons = localStorage.getItem("savedButtons"); // 버튼을 로컬에서 가져옴
    return savedButtons // 로컬에 있으면 로컬에서 가져오고
      ? JSON.parse(savedButtons) // 로컬에 없으면
      : ["1학년", "2학년", "3학년", "4학년"]; // 새로 만든 기본 내용을 넣어준다. = > api 연결도 동일한 로직으로 가면 될듯 (없으면 초기, 있으면 있는값 받아오기)
  });

  useEffect(() => {
    // 페이지 처음 렌더링 될 때랑 buttons 상태가 변경될때(= 버튼이 추가될때) 로컬에 buttons state 저장
    localStorage.setItem("savedButtons", JSON.stringify(buttons));
  }, [buttons]);

  const addNewBtn = () => {
    let btnCount = buttons.length + 1; // 현재 있는 버튼 개수 기반으로 새 버튼 추가.. 4학년까지 있으니까 5학년부터 시작될것
    const newBtnName = btnCount + "학년";
    setButtons((prevButtons) => [...prevButtons, newBtnName]);
  };

  return (
    <>
      <Background>
        <SideBarContainer>
          <SideBarContents>
            {buttons.map((btnName, index) => (
              <SideBarBtn key={index}>
                {btnName}
                <BtnSetting onClick={() => console.log("버튼 설정 클릭됨")}>
                  <HiOutlineDotsHorizontal />
                  {/* <div>
                    <button onClick={() => console.log("버튼 삭제")}>
                      삭제
                    </button>
                    <button
                      onClick={() => {
                        console.log("버튼 이름 변경 ");
                      }}
                    >
                      이름 변경
                    </button>
                  </div> */}
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
