import { useState } from "react";
import styled from "styled-components";

const DEPARTMENT_OPTION = [
  { value: "1", name: "" },
  { value: "2", name: "전산전자공학부" },
  { value: "3", name: "ICT 창업학부" },
  { value: "4", name: "콘텐츠융합디자인학부" },
];

const clubOption = [
  "멋쟁이사자처럼",
  "멋사",
  "마음",
  "SOUL",
  "PARD",
  "REVERE",
  "NEO",
];

const SelectBox = (props) => {
  return (
    <select>
      {props.option.map((option) => (
        <option value={option.name} />
      ))}
    </select>
  );
};

function ModifyProfile({ setModalOpen }) {
  const [inputValue, setInputValue] = useState("");
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };
  // const [post, setPost] = useState({})
  // const submitPost = (e) => {
  //   e.preventDefault();
  //   const formData = new FormData();

  //   formData.append("image", file);
  //   formData.append("c_answer", post.contents);
  //   formData.append("t_answer", post.title);
  //   formData.append("memberID", memberID);
  //   formData.append("q_id", id);

  //   fetch("https://ll-api.jungsub.com/talk/mypage/answer", {
  //     method: "POST",
  //     body: formData,
  //     headers: {},
  //   })
  //     .then((response) => response.json())
  //     .then((json) => {
  //       console.log(json.ok);
  //       if (!!json.ok) {
  //         window.location.reload();
  //       }
  //     });
  // };

  const closeModal = () => {
    setModalOpen(false);
  };
  return (
    <>
      <Background></Background>
      <ModalBackground></ModalBackground>
      <ModalWrapper>
        <Container>
          <Title>프로필 수정</Title>
          <button onClick={closeModal} className="closeModalBtn">
            <img src="img/cancelBtn.png" alt="img" />
          </button>
          {/* <form onSubmit={submitPost}> */}
          <form>
            <Flex1>
              <div>
                <Input1>
                  <p className="title">이름</p>
                  <input value="학부생" disabled></input>
                </Input1>
                <Input1>
                  <p className="title">학기 수</p>
                  <input name="semester"></input>
                </Input1>
                <Input1>
                  <p className="title">학부</p>
                  <SelectBox option={DEPARTMENT_OPTION}></SelectBox>
                </Input1>
                <Input1>
                  <p className="title">이메일</p>
                  <input value="1234" disabled></input>
                </Input1>
              </div>
              <div>
                <Input2>
                  <p className="title">소속 학회 및 동아리</p>
                  <input
                    list="searchClub"
                    name="affiliations"
                    value={inputValue}
                    onChange={handleInputChange}
                  ></input>
                  <datalist id="searchClub" className="scrollable">
                    {clubOption
                      .filter((clubOption) =>
                        clubOption
                          .toLowerCase()
                          .includes(inputValue.toLowerCase())
                      )
                      .slice(0, 5)
                      .map((clubOption) => (
                        <option key={clubOption} value={clubOption} />
                      ))}
                  </datalist>
                </Input2>
                <Input2>
                  <p className="title">희망 활동 분야</p>
                  <input></input>
                </Input2>
                <Input2>
                  <p className="title">관심 직무</p>
                  <input></input>
                </Input2>
                <Input2>
                  <p className="title">보유기술</p>
                  <input></input>
                </Input2>
              </div>
              <Input3>
                <p className="title">자기소개</p>
                <input></input>
              </Input3>
            </Flex1>
            <button type="submit" className="submitBtnInModal">
              저장
            </button>
          </form>
        </Container>
      </ModalWrapper>
    </>
  );
}

export default ModifyProfile;

const Background = styled.div`
  /* 화면에 꽉 차게 하는 코드 */
  position: fixed;
  width: 100%;
  height: 100%;

  background: #ffffff; // 흰색 도화지로 덮어 씌우기
  z-index: 200; // 헤더 위로 올라갈 수 있게 헤더 이상으로 z-index를 준다.
`;

const ModalBackground = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;

  background: rgba(0, 0, 0, 0.35); // 어두운 배경색
  z-index: 250; // 위에서 만든 도화지보다 높게 준다.
  cursor: pointer; // 누르면 홈으로 이동
`;

const ModalWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;

  /* 위아래 너비를 준 상태에서 가로 50%, 세로 50%를 이동시킬 수 있다 (= 한가운데 배치) */
  z-index: 300;
  transform: translate(-50%, -50%);
`;

const Container = styled.div`
  width: 67vw;
  height: 65vh;
  z-index: 100;
  background-color: white;
  border: 1px solid black;
  border-radius: 80px;
  overflow-y: scroll;

  > .closeModalBtn {
    border: none;
    background: none;

    > img {
      width: 26px;
      position: absolute;
      right: 50px;
    }
  }

  > form > .submitBtnInModal {
    border: none;
    background-color: #06b5b5;
    width: 7.7vw;
    height: 4.4vh;
    border-radius: 50px;
    position: absolute;
    right: 10%;
    color: white;
  }
`;

const Flex1 = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: flex-start;
`;

const Title = styled.p`
  font-weight: bold;
  font-size: 21px;
  text-align: center;
  color: #005f5f;
`;

const Input1 = styled.div`
  width: 10vw;
  height: 10vh;

  > .title {
    font-size: 20px;
    font-weight: 500;
    color: #005f5f;
    margin: 10px 0px 10px 0px;
  }

  > input {
    background-color: #f4f3f1;
    width: 98%;
    height: 35%;
    border: none;
  }

  > select {
    width: 98%;
    height: 40%;
    background-color: #f4f3f1;
    border: none;
  }
`;

const Input2 = styled.div`
  width: 17vw;
  height: 10vh;

  > .title {
    font-size: 20px;
    font-weight: 500;
    color: #005f5f;
    margin: 10px 0px 10px 0px;
  }

  > input {
    background-color: #f4f3f1;
    width: 98%;
    height: 35%;
    border: none;
  }

  > .scrollable {
    height: 10px;
    overflow-y: scroll;
  }

  > datalist > option {
    background-color: white;
  }
`;

const Input3 = styled.div`
  width: 20vw;
  height: 40vh;
  > .title {
    font-size: 21px;
    font-weight: 500;
    color: #005f5f;
    margin: 10px 0px 10px 0px;
  }

  > input {
    background-color: #f4f3f1;
    width: 98%;
    height: 80%;
    border: none;
  }
`;
