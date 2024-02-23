import { useState, useEffect } from "react";
import styled from "styled-components";
import placeholderImg from "../img/searchImg.png";

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
          arrays.map((option, idx) => (
            <>
              <span>
                {name !== "Affiliations" ? (
                  <button
                    className="pinBtn"
                    type="button"
                    // type 명시하지 않을시 button 클릭하면 submit
                    // type을 button으로 해야 클릭 시 submit 되지 않음
                    onClick={() => {
                      const newArray = arrays.map((item) => ({
                        ...item,
                        isPinned: false,
                      }));
                      const newArr = [...newArray];
                      newArr[idx] = {
                        ...newArr[idx],
                        isPinned: !option.isPinned,
                      };
                      setArrays(newArr);
                    }}
                  >
                    {option.isPinned ? (
                      <img src="img/pinned.png" alt="img" className="pin" />
                    ) : (
                      <img src="img/notPinned.png" alt="img" className="pin" />
                    )}
                  </button>
                ) : null}
                {option.name}
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
  const [profile, setProfile] = useState([]); //프로필 정보

  const [post, setPost] = useState({
    semester: "",
    departments: "",
    introduction: "",
  });

  const [departmentsOption, setDepartmentsOption] = useState([]); // 받아올 학부 정보

  const [affiliations, setAffiliations] = useState([]); //백에게 전달할 소속 학회 및 동아리
  const [affiliationsOption, setAffiliationsOption] = useState([]); //받아올 동아리 정보

  const [fields, setFields] = useState([]); //백에게 전달할 희망 활동 분야
  const [fieldsOption, setFieldsOption] = useState([]);

  const [jobs, setJobs] = useState([]); //백에게 전달할 관심 직무
  const [jobsOption, setJobsOption] = useState([]);

  const [skills, setSkills] = useState([]); //백에게 전달할 보유기술
  const [skillsOption, setSkillsOption] = useState([]);

  const [inputValue, setInputValue] = useState({
    semester: "",
    departments: "",
    affiliations: "",
    fields: "",
    jobs: "",
    skills: "",
    introduction: "",
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

  const changeValue = (e) => {
    if (e.target.name === "semester") {
      if (!isNaN(e.target.value)) {
        setPost({
          ...post,
          [e.target.name]: e.target.value,
        });
      } else {
        alert("숫자만 입력 가능합니다");
        e.target.value = "";
      }
    } else {
      setPost({
        ...post,
        [e.target.name]: e.target.value,
      });
    }
  };

  const changeValue2 = (e) => {
    setPost({
      ...post,
      departments: e.target.value,
    });
  };

  const handleSelectChange = (event, arrays, setArrays, Name) => {
    setInputValue({ ...inputValue, [Name]: "" });
    setShowSelect(false);
    if (Name !== "Affiliations") {
      setArrays([...arrays, { name: event.target.value, isPinned: false }]);
    } else {
      setArrays([...arrays, { name: event.target.value }]);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const onRemove = (club, arrays, setArrays) => {
    setArrays((prev) => {
      return prev.filter((index) => index !== club);
    });
  };

  const submitPost = async (event) => {
    event.preventDefault();
    const semesterInt = parseInt(post.semester);

    console.log(affiliations);

    const modifyProfileInfo = {
      semester: semesterInt,
      department: post.departments,
      affiliations: affiliations,
      fields: fields,
      jobs: jobs,
      skills: skills,
      introduction: post.introduction,
    };

    const url = process.env.REACT_APP_BACK_URL + "/api/fillyouin/my-profile";
    console.log("Bearer " + localStorage.getItem("loginToken"));
    try {
      const response = await fetch(url, {
        method: "PUT", //(+ GET인지 POST인지 명세 확인)
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("loginToken"), // Bearer 토큰으로 요청
        },

        body: JSON.stringify(modifyProfileInfo),
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

  const getProfile = async () => {
    const url = process.env.REACT_APP_BACK_URL + "/api/fillyouin/my-profile"; // 백엔드 api url => 각 페이지에서 요구하는 api 주소에 맞게 바꿔써줘야함.

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
      console.log("Server Response12", responseData); // 받아온 데이터를 콘솔로 확인

      setProfile(responseData); // useState로 쓰기 위해서 받아온 데이터를 profile에 설정

      setPost({
        semester: responseData.semester,
        departments: responseData.department,
        introduction: responseData.introduction,
      });
      setAffiliations(responseData.affiliations);
      setFields(responseData.fields);
      setJobs(responseData.jobs);
      setSkills(responseData.skills);
    } catch (error) {
      console.error("error", error);
    }
  };

  const getDepartmentsOption = async () => {
    const url = process.env.REACT_APP_BACK_URL + "/api/fillyouin/departments";

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
      const variable = responseData.departments.map((item) => item.name);
      console.log(variable);
      setDepartmentsOption(variable);
      console.log(responseData);
      // setPost({ ...post, departments: variable[0] });
      // setPost((prev) => ({ ...prev, departments: variable[0] }));
    } catch (error) {
      console.error("error", error);
    }
  };

  const getAffiliationsOption = async () => {
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
      const variable = responseData.affiliations.map((item) => item.name);
      setAffiliationsOption(variable);
    } catch (error) {
      console.error("error", error);
    }
  };

  const getFieldsOption = async () => {
    const url = process.env.REACT_APP_BACK_URL + "/api/fillyouin/fields";

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
      const variable = responseData.fields.map((item) => item.name);
      setFieldsOption(variable);
    } catch (error) {
      console.error("error", error);
    }
  };

  const getJobsOption = async () => {
    const url = process.env.REACT_APP_BACK_URL + "/api/fillyouin/jobs";

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
      const variable = responseData.jobs.map((item) => item.name);
      setJobsOption(variable);
    } catch (error) {
      console.error("error", error);
    }
  };

  const getSkillsOption = async () => {
    const url = process.env.REACT_APP_BACK_URL + "/api/fillyouin/skills";

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
      const variable = responseData.skills.map((item) => item.name);
      setSkillsOption(variable);
    } catch (error) {
      console.error("error", error);
    }
  };

  useEffect(() => {
    getProfile();
    getDepartmentsOption();
    getAffiliationsOption();
    getFieldsOption();
    getJobsOption();
    getSkillsOption();
  }, []);
  return (
    <ModalBackground>
      <ModalBox>
        <Container>
          <Title>프로필 수정</Title>
          <button onClick={closeModal} className="closeModalBtn">
            <img src="img/cancelBtn.png" alt="img" />
          </button>
          <form onSubmit={submitPost} id="submitProfileInfo">
            <Flex1>
              <div>
                <Input1>
                  <p className="title">이름</p>
                  <input
                    value={`${profile?.firstName} ${profile?.lastName}`}
                    disabled
                  />
                </Input1>
                <Input1>
                  <p className="title">학기 수</p>
                  <input
                    name="semester"
                    placeholder="ex) 7"
                    value={post.semester}
                    onChange={changeValue}
                  />
                </Input1>
                <Input1>
                  <p className="title">학부</p>
                  <select onChange={changeValue2} value={post.departments}>
                    {departmentsOption.map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </Input1>
                <Input1>
                  <p className="title">이메일</p>
                  <input value={profile?.email} disabled />
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
                    options={affiliationsOption}
                    setArrays={setAffiliations}
                  />
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
                    options={fieldsOption}
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
                    arrays={jobs}
                    onRemove={onRemove}
                    options={jobsOption}
                    setArrays={setJobs}
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
                    arrays={skills}
                    onRemove={onRemove}
                    options={skillsOption}
                    setArrays={setSkills}
                  />
                </Input2>
              </div>
              <Input3>
                <p className="title">자기소개</p>
                <input
                  name="introduction"
                  placeholder="직접 입력하세요"
                  value={post.introduction}
                  onChange={changeValue}
                />
              </Input3>
            </Flex1>
            <button type="submit" className="submitBtnInModal">
              저장
            </button>
          </form>
        </Container>
      </ModalBox>
    </ModalBackground>
  );
}

export default ModifyProfile;

const ModalBackground = styled.div`
  z-index: 1000; // 마이페이지 내용보다 위에 보이도록(검은색 반투명 배경)
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.2); // 검은배경에 20% 투명도
  /* border: 2px solid red; */
  position: fixed; //모달 위치 fix
  bottom: 0; // 모달 위치 - 바닥으로 내림
  left: 0; // 모달 위치 - 왼쪽에 붙임 */
  top: 0;
  right: 0;
`;

const ModalBox = styled.div`
  box-shadow: 0 0 30px 1px #0000002a; // drop-down shadow 모달 그림자
  z-index: 2000; // 배경 보다 위에 있도록 함
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  width: 60%;
  height: 60%;
  border-radius: 50px;
`;

const Container = styled.div`
  width: 67vw;
  height: 65vh;
  background-color: white;
  border-radius: 40px;
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
  width: 11vw;
  height: 10vh;

  > .title {
    font-size: 20px;
    font-weight: 500;
    color: #005f5f;
    margin: 10px 0px 10px 0px;
  }

  > input {
    background-color: #f4f3f1;
    width: 100%;
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
    -o-appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;

    &:focus {
      outline: none;
    }
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
    padding: 5px;

    > span {
      font-size: 13px;
      border: solid 2px #04b1b1;
      border-radius: 10px;
      padding: 2px 2px 2px 5px;
      margin: 0 5px 0 0;

      > .pinBtn {
        padding-left: 2px;
        margin-right: 5px;
      }

      > button {
        background: none;
        border: none;
        padding: 0 2px 0 8px;
        margin: 0;

        > img {
          width: 8px;
        }

        > .pin {
          vertical-align: middle;
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
