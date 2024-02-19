import { useState, useEffect } from "react";
import styled from "styled-components";
import placeholderImg from "../img/searchImg.png";

const DEPARTMENT_OPTION = [
  { value: "1", name: "" },
  { value: "2", name: "전산전자공학부" },
  { value: "3", name: "ICT 창업학부" },
  { value: "4", name: "콘텐츠융합디자인학부" },
];

const clubOption = [];

const filedsOption = [];

const SelectBox = (props) => {
  return (
    <select>
      {props.option.map((option) => (
        <option value={option.name} />
      ))}
    </select>
  );
};

function InputBox({
  inputValue,
  name,
  handleInputChange,
  showSelect,
  handleSelectChange,
  arrays,
  onRemove,
  options,
  setArrays,
}) {
  return (
    <>
      <div>
        <div>
          <input
            name={name}
            value={inputValue}
            onChange={handleInputChange}
          ></input>
        </div>
      </div>
      {showSelect && inputValue && (
        <select
          id="search"
          size={3}
          onChange={(event) => {
            handleSelectChange(event, arrays, setArrays, name);
          }}
        >
          {options &&
            options
              .filter((option) =>
                option.toLowerCase().includes(inputValue.toLowerCase())
              )
              .map((option) => (
                <>
                  <option key={option} value={option}>
                    {option}
                  </option>
                </>
              ))}
        </select>
      )}
      <div className="category">
        {arrays &&
          arrays.map((option) => (
            <>
              <span>
                {option}
                <button
                  type="button"
                  onClick={() => onRemove(option, arrays, setArrays)}
                >
                  <img src="img/cancelBtn.png" alt="img" />
                </button>
              </span>
            </>
          ))}
      </div>
    </>
  );
}

function ModifyProfile({ setModalOpen }) {
  const [affiliations, setAffiliations] = useState([]); //소속 학회 및 동아리
  const [fields, setFields] = useState([]); //희망 활동 분야
  const [jobs, setJobs] = useState([]); //관심 직무
  const [skills, setSkills] = useState([]); //보유기술

  const [inputValue, setInputValue] = useState({
    Affiliations: "",
    Fields: "",
    Jobs: "",
    Skills: "",
  });
  const { Affiliations, Fields, Jobs, Skills } = inputValue;

  const [showSelect, setShowSelect] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
    setShowSelect(value.trim() !== "");
  };

  const handleSelectChange = (event, arrays, setArrays, name) => {
    setInputValue({ ...inputValue, [name]: "" });
    setShowSelect(false);
    setArrays([...arrays, event.target.value]);
    console.log(affiliations);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const onRemove = (club, arrays, setArrays) => {
    console.log(arrays);
    setArrays((prev) => {
      return prev.filter((index) => index !== club);
    });
  };

  const submitPost = (event) => {
    event.preventDefault();
    console.log("enter 막음");
  };

  const getAffiliations = async () => {
    const url = process.env.REACT_APP_BACK_URL + "/api/fillyouin/affiliations";

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
      console.log("Server Response", responseData.affiliations);
      // 받아온 데이터를 콘솔로 확인
      const affiliationsOption = responseData.affiliations;
      console.log(affiliationsOption);
    } catch (error) {
      console.error("error", error);
    }
  };

  useEffect(() => getAffiliations, []);
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
          <form onSubmit={submitPost}>
            <Flex1>
              <div>
                <Input1>
                  <p className="title">이름</p>
                  <input value="학부생" disabled></input>
                </Input1>
                <Input1>
                  <p className="title">학기 수</p>
                  <input name="semester" placeholder="ex : 7"></input>
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
                  <InputBox
                    inputValue={Affiliations}
                    name="Affiliations"
                    handleInputChange={handleInputChange}
                    showSelect={showSelect}
                    handleSelectChange={handleSelectChange}
                    arrays={affiliations}
                    onRemove={onRemove}
                    options={clubOption}
                    setArrays={setAffiliations}
                  ></InputBox>
                </Input2>
                <Input2>
                  <p className="title">희망 활동 분야</p>
                  <InputBox
                    inputValue={Fields}
                    name="Fields"
                    handleInputChange={handleInputChange}
                    showSelect={showSelect}
                    handleSelectChange={handleSelectChange}
                    arrays={fields}
                    onRemove={onRemove}
                    options={filedsOption}
                    setArrays={setFields}
                  />
                </Input2>
                <Input2>
                  <p className="title">관심 직무</p>
                  <InputBox
                    inputValue={Jobs}
                    name="Jobs"
                    handleInputChange={handleInputChange}
                    showSelect={showSelect}
                    handleSelectChange={handleSelectChange}
                    affiliations={affiliations}
                    onRemove={onRemove}
                  />
                </Input2>
                <Input2>
                  <p className="title">보유기술</p>
                  <InputBox
                    inputValue={Skills}
                    name="Skills"
                    handleInputChange={handleInputChange}
                    showSelect={showSelect}
                    handleSelectChange={handleSelectChange}
                    affiliations={affiliations}
                    onRemove={onRemove}
                  />
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
  z-index: 400; //원래 100이었음
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
    position: relative;
    left: 80%;
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
    &:focus {
      outline: none;
    }
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
  min-height: 10vh;

  > .title {
    font-size: 20px;
    font-weight: 500;
    color: #005f5f;
    margin: 10px 0px 10px 0px;
  }

  > div {
    position: relative;

    > div {
      position: relative;
      width: 98%;
      height: 3.5vh;

      > input {
        width: 85%;
        height: 100%;
        padding-left: 40px; /* 이미지와 텍스트 간격을 위해 왼쪽 패딩 설정 */
        border: none;
        background-color: #f4f3f1;
        background-image: url(${placeholderImg});
        background-repeat: no-repeat;
        background-position: 10px center;
        &:focus {
          outline: none;
        }
      }
    }
  }

  > select {
    margin-top: 5px;
    width: 100%;
    min-height: 2vh;
    border: none;

    > option {
    }
  }

  > .category {
    margin: 5px 0 5px 0;
    max-height: 3.5vh;
    max-width: 98%;
    white-space: nowrap;
    overflow-x: scroll;

    > span {
      font-size: 13px;
      border: solid 2px #04b1b1;
      border-radius: 10px;
      padding: 2px 2px 2px 2px;

      > button {
        background: none;
        border: none;
        padding: 0 2px 0 10px;
        margin: 0;

        > img {
          width: 8px;
        }
      }
    }
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
