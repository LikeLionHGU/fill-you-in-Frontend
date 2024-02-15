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
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(5px);
`;

const Container = styled.div`
  width: 67vw;
  height: 65vh;
  z-index: 100;
  position: absolute;
  top: 500px;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  border: 1px solid black;
  border-radius: 80px;
`;

const Title = styled.p`
  font-weight: bold;
  font-size: 28px;
  text-align: center;
  color: #005f5f;
`;

const Section1 = styled.div`
  width: 16vw;
  height: 11.5vh;
  border: solid 1px black;

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

function ModifyProfile() {
  return (
    <ModalBackground>
      <Container>
        <Title>프로필 수정</Title>
        <Section1>
          <p className="title">이름</p>
          <input value="학부생" disabled></input>
        </Section1>
        <Section1>
          <p className="title">학기 수</p>
          <input></input>
        </Section1>
        <Section1>
          <p className="title">학부</p>
          <SelectBox option={DEPARTMENT_OPTION}></SelectBox>
        </Section1>
        <Section1>
          <p className="title">이메일</p>
          <input value="1234" disabled></input>
        </Section1>
      </Container>
    </ModalBackground>
  );
}

export default ModifyProfile;
