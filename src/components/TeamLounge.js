import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import WhiteNavBtns from "./WhiteNavBtns";

function SelectBox({
  name,
  inputValue,
  handleInputChange,
  handleSelectChange,
  showSelect,
  options,
}) {
  return (
    <div>
      <input
        name={name}
        value={inputValue}
        onChange={(event) => handleInputChange(event, name)}
      ></input>
      {showSelect && inputValue && (
        <select
          id="search"
          size={3}
          onChange={(event) => {
            handleSelectChange(event, name);
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
    </div>
  );
}

function TeamLounge() {
  const navigate = useNavigate();
  //   const handleGoMainPage = () => {
  //     navigate("/MainPage");
  //   };

  //
  //
  // 프로파일 설정하고 받아오는 부분

  const [departments, setDepartments] = useState([]); // 타입 ?
  const [fields, setFields] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [skills, setSkills] = useState([]);

  //

  const getSearchInfo = async () => {
    const url = process.env.REACT_APP_BACK_URL;
    const departmentsUrl = url + "/api/fillyouin/departments"; // 백엔드 api url => 각 페이지에서 요구하는 api 주소에 맞게 바꿔써줘야함.
    const fieldsUrl = url + "/api/fillyouin/fields";
    const jobsUrl = url + "/api/fillyouin/jobs";
    const skillsUrl = url + "/api/fillyouin/skills";
    try {
      const response = await fetch(departmentsUrl, {
        method: "GET", //(+ GET인지 POST인지 명세 확인)
        headers: {
          Authorization: "Bearer " + localStorage.getItem("loginToken"), // Bearer 토큰으로 요청
        },
      });
      if (!response.ok) {
        throw new Error(`에러 Status: ${response.status}`);
      }
      const responseData = await response.json();
      const variable = responseData.departments.map((item) => item.name);
      setDepartments(variable);
    } catch (error) {
      console.error("error", error);
    }

    //    ==========

    try {
      // 희망활동분야 fields 받아오는 부분
      const response = await fetch(fieldsUrl, {
        method: "GET", //(+ GET인지 POST인지 명세 확인)
        headers: {
          Authorization: "Bearer " + localStorage.getItem("loginToken"), // Bearer 토큰으로 요청
        },
      });
      if (!response.ok) {
        throw new Error(`에러 Status: ${response.status}`);
      }
      const responseData = await response.json();
      const variable = responseData.fields.map((itm) => itm.name);
      setFields(variable);
    } catch (error) {
      console.error("error", error);
    }

    // ====
    try {
      // 관심직무 jobs 받아오는 부분
      const response = await fetch(jobsUrl, {
        method: "GET", //(+ GET인지 POST인지 명세 확인)
        headers: {
          Authorization: "Bearer " + localStorage.getItem("loginToken"), // Bearer 토큰으로 요청
        },
      });
      if (!response.ok) {
        throw new Error(`에러 Status: ${response.status}`);
      }
      const responseData = await response.json();
      const variable = responseData.jobs.map((itm) => itm.name);
      setJobs(variable);
    } catch (error) {
      console.error("error", error);
    }
    // ===
    try {
      // 보유기술 skills 받아오는 부분
      const response = await fetch(skillsUrl, {
        method: "GET", //(+ GET인지 POST인지 명세 확인)
        headers: {
          Authorization: "Bearer " + localStorage.getItem("loginToken"), // Bearer 토큰으로 요청
        },
      });
      if (!response.ok) {
        throw new Error(`에러 Status: ${response.status}`);
      }
      const responseData = await response.json();
      const variable = responseData.skills.map((itm) => itm.name);
      setSkills(variable);
    } catch (error) {
      console.error("error", error);
    }
  };

  useEffect(() => {
    getSearchInfo();
  }, []);

  return (
    <div>
      <Container>
        <SideBar>
          <SideBarButtons>
            <div
              className="search-nav-button"
              onClick={() => {
                window.location.reload("/TeamLounge/Search");
              }}
            >
              <img
                className="search-icon" // 푸른색 서치 아이콘
                alt="Group"
                src="https://cdn.animaapp.com/projects/65c5a7d8d4b749ab51e73dc0/releases/65d311206269ef486d8b65d3/img/group-6@2x.png"
              />
              팀원 검색하기
            </div>
            <div
              className="scrapped-nav-button"
              onClick={() => {
                navigate("/TeamLounge/Scrapped");
              }}
            >
              <img
                className="scrap-icon" // 하얀색 스크랩 아이콘
                alt="Vector"
                src="https://cdn.animaapp.com/projects/65c5a7d8d4b749ab51e73dc0/releases/65d311206269ef486d8b65d3/img/vector.svg"
              />
              스크랩한 프로필
            </div>
          </SideBarButtons>
        </SideBar>
        <MainContents>
          <MainContainer>
            <WhiteNavBtns /> {/* 흰색 nav 버튼들 */}
            <Content>
              {/* 팀원검색 or 스크랩한 프로필. 디폴트를 팀원검색으로 두고, 상태 변환해서 스크랩 프로필 내용 보여주기..  */}
              <SearchTeammates
                departments={departments}
                fields={fields}
                jobs={jobs}
                skills={skills}
              />
              {""}
              {/* <ScrappedTeammates /> */}

              {/*팀원검색 Or 스크랩한 프로필*/}
            </Content>
          </MainContainer>
        </MainContents>
      </Container>
    </div>
  );
}

const SearchTeammates = ({ departments, fields, jobs, skills }) => {
  const [post, setPost] = useState({
    name: "",
    department: "",
    semester: "",
    skill: "",
    job: "",
    field: "",
  });

  const [showSelect, setShowSelect] = useState(false);

  const [inputValue, setInputValue] = useState({
    department: "",
    skill: "",
    job: "",
    field: "",
  });

  const { Department, Skill, Job, Field } = inputValue;

  const handleInputChange = (event, Name) => {
    const { name, value } = event.target;
    console.log(event);
    setInputValue({
      ...inputValue,
      [name]: value,
    });
    setShowSelect(value.trim() !== "");
    setPost({ ...post, department: event.target.value });

    if (Name === "Department")
      setPost({ ...post, department: event.target.value });
    if (Name === "Skill") setPost({ ...post, skill: event.target.value });
    if (Name === "Job") setPost({ ...post, job: event.target.value });
    if (Name === "Field") setPost({ ...post, field: event.target.value });
  };

  const handleSelectChange = (event, Name) => {
    let name;
    switch (Name) {
      case "Skill":
        name = "skill";
        break;

      case "Job":
        name = "job";
        break;
      case "Field":
        name = "field";
        break;

      case "Department":
        name = "department";
        break;
      default:
        break;
    }
    setInputValue({ ...inputValue, [Name]: event.target.value });
    setPost({ ...post, [name]: event.target.value });
    setShowSelect(false);
  };

  const submitInfo = async (e) => {
    e.preventDefault();
    // JSON.stringify(post);

    console.log(post);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACK_URL}/api/fillyouin/members/profile-card?name=${post.name}&department=${post.department}&semester=${post.semester}&field=${post.field}&job=${post.job}&skill=${post.skill}`,
        {
          method: "GET", //(+ GET인지 POST인지 명세 확인)
          headers: {
            Authorization: "Bearer " + localStorage.getItem("loginToken"), // Bearer 토큰으로 요청
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP Error! Status: ${response.status}`);
      }
      const responseData = await response.json();
      console.log("성공");
      console.log(responseData);
    } catch (error) {
      console.error("error", error);
    }
  };
  return (
    <ContentWrapoer>
      <ContentText>000님, 팀원을 찾아보세요 !</ContentText>
      <ProfileSearch>
        <SearchContainer>
          {/* <SearchFilterForm /> */}
          <NoSearchIcons>
            <NameSearch>
              <div>이름</div>
              <input className={"name-search-box"} placeholder="검색어 입력" />
            </NameSearch>
            <DepartmentSearch>
              <div>학부</div>
              <SelectBox
                name="Department"
                inputValue={Department}
                handleInputChange={handleInputChange}
                handleSelectChange={handleSelectChange}
                showSelect={showSelect}
                options={departments}
              ></SelectBox>
            </DepartmentSearch>
            <SemesterSearch>
              <div>학기 수</div>
              <input placeholder="검색어 입력" />
            </SemesterSearch>
          </NoSearchIcons>
          <SearchIcons>
            {/* 아래부분 나중에 고치기  */}
            <SearchItems>
              <div>희망활동분야</div>
              <SelectBox
                name="Field"
                inputValue={Field}
                handleInputChange={handleInputChange}
                handleSelectChange={handleSelectChange}
                showSelect={showSelect}
                options={fields}
              ></SelectBox>
            </SearchItems>
            <SearchItems>
              <div>관심직무</div>
              <SelectBox
                name="Job"
                inputValue={Job}
                handleInputChange={handleInputChange}
                handleSelectChange={handleSelectChange}
                showSelect={showSelect}
                options={jobs}
              ></SelectBox>
            </SearchItems>
            <SearchItems>
              <div>보유 기술</div>
              <SelectBox
                name="Skill"
                inputValue={Skill}
                handleInputChange={handleInputChange}
                handleSelectChange={handleSelectChange}
                showSelect={showSelect}
                options={skills}
              ></SelectBox>
            </SearchItems>
          </SearchIcons>
          <SearchButton>
            <button onClick={submitInfo}>검색</button>
          </SearchButton>
        </SearchContainer>
      </ProfileSearch>
      <Profiles></Profiles>
    </ContentWrapoer>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: row;

  font-family: "Pretendard-SemiBold", Helvetica;
`;
const SideBar = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  /* border: 2px solid red; */
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  width: 240px; // 전체화면에서 퍼센트..
  height: 100vh;
  background-color: #04b1b1;
  color: white;
  padding-top: 100px;
`;
const SideBarButtons = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 35px;

  > .search-nav-button {
    display: flex;
    align-items: center;
    border-top-left-radius: 100px;
    border-bottom-left-radius: 100px;
    padding: 10px 25px;
    margin-left: 25px;
    color: #04b1b1;
    background-color: white;
    margin-bottom: 20px;

    &:hover {
      cursor: pointer;
    }
  }
  > .search-nav-button > .search-icon {
    /* color: white; */
    width: 22px;
    height: 22px;
    margin-right: 20px;
  }
  > .scrapped-nav-button {
    display: flex;
    align-items: center;
    border-top-left-radius: 100px;
    border-bottom-left-radius: 100px;
    padding: 10px 25px;
    margin-left: 25px;
    transition: 0.2s;
    /* background-color: black; */
    &:hover {
      background-color: rgb(28, 28, 28, 0.15);
      cursor: pointer;
    }
  }
  > .scrapped-nav-button > .scrap-icon {
    width: 22px;
    height: 22px;
    margin-right: 20px;
  }
`;

const MainContents = styled.div`
  display: flex;
  width: 100%;
`;
//

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  /* border: 2px solid blue; */
  width: 100%;
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  margin-left: 240px; // 전체화면에서 퍼센트.. 왼쪽 사이드바 부분을 margin으로 처리
  /* border: 3px solid limegreen; */
  padding-top: 20px;
  padding-left: 7%;
  padding-right: 7%;
`;

const ContentWrapoer = styled.div`
  display: flex;
  /* border: 2px solid black; */
  flex-direction: column;
  width: 100%; // 위에서 좌우에 padding 7% 넣어서 너비를 100%해도 빈칸 생김.
`;
const ContentText = styled.div`
  // 팀원 찾아보세요 text //
  display: flex;
  align-items: center;
  height: 80px;
  font-size: 20px;
  /* border: 2px solid red; */
`;

const ProfileSearch = styled.div`
  //검색창
  display: flex;
  height: 200px;
  /* border: 2px solid pink; */
  box-shadow: 0 0 10px 1px #0000002a; // drop-down shadow 모달 그림자
`;

const Profiles = styled.div`
  //프로필 넣기
  display: flex;
  height: 20px; // 임시
  margin-top: 20px;
  /* border: 2px solid blue; */
`;

const SearchContainer = styled.div`
  display: flex;
  width: 100%;
  > form {
    display: flex;
    flex-direction: row;
    /* justify-content: space-evenly; */
    width: 100%;
    /* border: 2px solid green; */
    padding: 20px;
  }
`;
const NoSearchIcons = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
  /* align-items: center;  // */
  padding-left: 25px;
  height: 100%;
  width: 35%;
  position: relative; /* border: 2px solid red; */
  > div {
    /* justify-content: left; */
  }
  > div > div {
    //각 검색 타이틀
    /* background-color: black; */
    width: 50px;
    color: #005f5f;
    margin-right: 20px;
  }

  > div > div > input {
    background-color: #f4f3f1;
    border: none;
    border-radius: 4px;
    height: 30px;
  }
  > div > div > select {
    width: 150px;
    background-color: #ffffff;
    border: none;
    border-radius: 4px;
    height: 30px;
    z-index: 400;
    position: absolute;
  }
`;
const NameSearch = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  //중복
  /* border: 2px solid black; */

  > .name-search-box {
    width: 80px;
  }
`;
const DepartmentSearch = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  //중복
  /* border: 2px solid black; */
`;
const SemesterSearch = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  //중복
  /* border: 2px solid black; */
`;

const SearchIcons = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;

  height: 100%;
  width: 40%;
  /* border: 2px solid red; */

  > div > div {
    //각 검색 타이틀
    /* background-color: black; */
    width: 100px;
    color: #005f5f;
    /* margin-right: 20px; */
  }

  > div > input {
    background-color: #f4f3f1;
    border: none;
    border-radius: 4px;
    height: 30px;
    width: 220px; // input box 크기
  }
  > div > input > img {
    width: 20px;
    height: 20px;
  }
`;

const SearchItems = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  > div {
    margin-right: 20px;
  }
`;
const SearchField = styled.div``;
const SearchJobs = styled.div``;
const SearchSkills = styled.div``;
const SearchButton = styled.div`
  display: flex;
  justify-content: end;
  padding-right: 20px;

  /* background-color: black; */
  align-items: end;
  height: 100%;
  width: 20%;

  /* border: 2px solid red; */
  > button {
    background-color: #04b1b1;
    border-radius: 20px;
    border: none;
    height: 30px;
    width: 100px;
    color: white;
    margin-bottom: 10px;
    font-family: "Pretendard-SemiBold", Helvetica;
    transition: 0.1s;
  }
  > button:hover {
    background-color: #008888;
    cursor: pointer;
  }
`;

export default TeamLounge;
