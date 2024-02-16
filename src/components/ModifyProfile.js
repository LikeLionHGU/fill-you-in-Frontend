import styled from "styled-components";

const DEPARTMENT_OPTION = [
  { value: "1", name: "" },
  { value: "2", name: "전산전자공학부" },
  { value: "3", name: "ICT 창업학부" },
  { value: "4", name: "콘텐츠융합디자인학부" },
];

const CLUB_OPTION = [
  { name: "멋쟁이사자처럼" },
  { name: "PARD" },
  { name: "SOUL" },
  { name: "마음" },
  { name: "멋사" },
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

const OptionBox = (props) => {
  return (
    <>
      {props.option.map((option) => (
        <option key={option.value} value={option.value}>
          {option.name}
        </option>
      ))}
    </>
  );
};

function ModifyProfile({ setModalOpen }) {
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
          <button onClick={closeModal}>
            <img src="img/cancelBtn.png" alt="img" />
          </button>
          <Flex1>
            <div>
              <Input1>
                <p className="title">이름</p>
                <input value="학부생" disabled></input>
              </Input1>
              <Input1>
                <p className="title">학기 수</p>
                <input></input>
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
                <input list="searchClub"></input>
                <datalist id="searchClub">
                  <OptionBox option={CLUB_OPTION}></OptionBox>
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
          <button type="submit">저장</button>
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
