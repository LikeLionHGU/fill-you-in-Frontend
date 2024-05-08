import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import WhiteNavBtns from "./WhiteNavBtns";
import { createElement } from "react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";

/*

 npm install react-icons --save
 로 아이콘 사용함.
*/

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
`;
const SideBarAddBtn = styled.div`
  display: flex;
  padding-left: 0px;
`;

// import styled from "styled-components";

// const Component = styled.div`
//   color: red;
//   `;

// render(
// <Component
//   as="button"
//   onClick={() => alert('It works!')}
// >
//   Hello World!
// </Component>
// )

function MakeNewBtn({ btnNome }) {
  return createElement(
    "h1",
    { className: "greeting" },
    "Hello ",
    createElement("i", null, btnNome),
    ". Welcome!"
  );
}

function ArchiveTimelineSidebar() {
  const [exampleCount, setExampleCount] = useState(1);
  console.log("WORKJED!!!");

  const addExample = () => {
    setExampleCount((prevCount) => prevCount + 1);
  };

  const createBtnComponent = (btnName) => {
    return (
      <div>
        <button onClick={addExample}>ADD EXAMPLE</button>
        {[...Array(exampleCount)].map((_, index) => (
          <SideBarBtn key={index}>
            {btnName} {index + 1}
          </SideBarBtn>
        ))}
      </div>
    );
  };

  return (
    <>
      <WhiteNavBtns />
      <Background>
        <SideBarContainer>
          <SideBarContents>
            <SideBarBtn>
              1학년
              <BtnSetting>
                <HiOutlineDotsHorizontal
                  onClick={() => {
                    console.log("button clicked!");
                  }}
                />
              </BtnSetting>
            </SideBarBtn>
            <SideBarBtn>
              2학년
              <BtnSetting>
                <HiOutlineDotsHorizontal />
              </BtnSetting>
            </SideBarBtn>
            <SideBarBtn>
              3학년
              <BtnSetting>
                <HiOutlineDotsHorizontal />
              </BtnSetting>
            </SideBarBtn>
            <SideBarBtn>
              4학년
              <BtnSetting>
                <HiOutlineDotsHorizontal />
              </BtnSetting>
            </SideBarBtn>
            <SideBarBtn
              onClick={() => {
                console.log("Add Button is clicked!");
              }}
              // onClick={() => {
              //   returncreateBtnComponent();
              // }}
            >
              <span>+ 추가</span>
            </SideBarBtn>
            {/* <SideBarAddBtn>+ 추가</SideBarAddBtn> */}
          </SideBarContents>
        </SideBarContainer>
      </Background>
    </>
  );
}

export default ArchiveTimelineSidebar;
