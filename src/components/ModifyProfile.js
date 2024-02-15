import styled from "styled-components";

const DEPARTMENT_OPTION = [
  { value: "1", name: "" },
  { value: "2", name: "전산전자공학부" },
  { value: "3", name: "ICT 창업학부" },
  { value: "4", name: "콘텐츠융합디자인학부" },
];

const SelectBox = (props) => {
  return (
    <select>
      {props.option.map((option) => (
        <option key={option.value} value={option.value}>
          {option.name}
        </option>
      ))}
    </select>
  );
};

const ModalBackground = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;

  /* 위아래 너비를 준 상태에서 가로 50%, 세로 50%를 이동시킬 수 있다 (= 한가운데 배치) */
  transform: translate(-50%, -50%);
  backdrop-filter: blur(5px);
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
  justify-content: space-around;
  align-items: center;
`;

const Flex2 = styled.div``;

const Title = styled.p`
  font-weight: bold;
  font-size: 28px;
  text-align: center;
  color: #005f5f;
`;

const Input1 = styled.div`
  width: 14vw;
  height: 10.5vh;

  > .title {
    font-size: 25px;
    color: #005f5f;
  }

  > input {
    background-color: #f4f3f1;
    width: 98%;
    height: 30%;
    border: none;
  }

  > select {
    width: 98%;
    height: 30%;
    background-color: #f4f3f1;
    border: none;
  }
`;

const Input2 = styled.div`
  width: 21vw;
  height: 10.5vh;

  > .title {
    font-size: 25px;
    color: #005f5f;
  }

  > input {
    background-color: #f4f3f1;
    width: 98%;
    height: 30%;
    border: none;
  }
`;

const Input3 = styled.div`
  width: 25vw;
  height: 48.7vh;
  > .title {
    font-size: 25px;
    color: #005f5f;
  }

  > input {
    background-color: #f4f3f1;
    width: 98%;
    height: 80%;
    border: none;
  }
`;

function ModifyProfile({ setModalOpen }) {
  const closeModal = () => {
    setModalOpen(false);
  };
  return (
    <ModalBackground>
      <Container>
        <Title>프로필 수정</Title>
        <button onClick={closeModal}>❌</button>
        <Flex1>
          <Flex2>
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
          </Flex2>
          <div>
            <Input2>
              <p className="title">소속 학회 및 동아리</p>
              <input></input>
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
    </ModalBackground>
  );
}

export default ModifyProfile;
