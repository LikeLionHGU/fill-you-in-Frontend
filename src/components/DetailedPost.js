import React, { useEffect, useRef, useState } from "react";
import WhiteNavBtns from "./WhiteNavBtns";
import ArchiveTimelineSidebar from "./ArchiveTimelineSidebar";
import styled from "styled-components";
import { FaChevronLeft } from "react-icons/fa6";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
// import ModifyProfile from "./ModifyProfile";
import WritePostModal from "./WritePostModal";
import { useParams } from "react-router-dom";

function DetailedPost() {
  const [modalOpen, setModalOpen] = useState(false);
  const showModal = () => {
    setModalOpen(true);
  };
  const { id } = useParams();
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const dropdownRefs = useRef([]);

  const [eventInfo, setEventInfo] = useState(null);

  const getEventInfo = async () => {
    const url = process.env.REACT_APP_BACK_URL + `/api/fillyouin/events/${id}`;

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
      const variable = {
        folderId: responseData.folderId,
        id: responseData.id,
        title: responseData.title,
        startDate: responseData.startDate,
        endDate: responseData.endDate,
        mainText: responseData.mainText,
      };

      setEventInfo(variable);
    } catch (error) {
      console.error("error", error);
    }
  };

  const handleClickOutside = (event) => {
    if (
      activeDropdown !== null &&
      dropdownRefs.current[activeDropdown] &&
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

  useEffect(() => {
    getEventInfo();
  }, []);

  const toggleDropdown = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  if (!eventInfo) return <h1>Loading..</h1>;
  return (
    <div>
      <WhiteNavBtns />
      <DetailBodyContainer>
        <ArchiveTimelineSidebar />
        <DetialContent>
          {/* 나중에 따로 넣을 모달,,,  */}
          <button onClick={showModal}>글 새로 작성 </button>
          {modalOpen && <WritePostModal setModalOpen={setModalOpen} />}
          {/* 나중에 다른 컴포넌트로 넣을 모달 부분 */}
          <ContentHead>
            <BackButton>
              <FaChevronLeft />
            </BackButton>
          </ContentHead>
          {/* DetailedPost */}
          <ContentBody>
            <PostHead>
              {/* <PostHeadTitle> */}
              <div className="folder-title">{eventInfo.title}</div>
              <div className="folder-date">
                {eventInfo.startDate} ~ {eventInfo.endDate}
              </div>
              {/* </PostHeadTitle> */}
            </PostHead>
            {/* <SettingDots>
              <HiOutlineDotsHorizontal
                onClick={() => setActiveDropdown(true)}
              />

              {activeDropdown === true && ( // 삭제, 이름 변경하는 dropdown 메뉴 부분
                <DropdownSetting>
                  <DropdownItem onClick={() => setDeleteIndex(1)}>
                    { <DropdownItem onClick={() => confirmDeleteButton(index)}> }
                    삭제
                  </DropdownItem>
                  { <DropdownItem onClick={() => startEditing(index)}> }
                  <DropdownItem onClick={() => console.log("내용 수정")}>
                    내용 수정
                  </DropdownItem>
                </DropdownSetting>
              )}
            </SettingDots> */}
            <SettingDots ref={(el) => (dropdownRefs.current[0] = el)}>
              <HiOutlineDotsHorizontal onClick={() => toggleDropdown(0)} />
              {activeDropdown === 0 && (
                <DropdownSetting>
                  <DropdownItem onClick={() => setDeleteIndex(eventInfo.id)}>
                    삭제
                  </DropdownItem>
                  <DropdownItem onClick={() => console.log("내용 수정")}>
                    내용 수정
                  </DropdownItem>
                </DropdownSetting>
              )}
            </SettingDots>
            <PostBody>
              {/* <PostTitle>
                <div className="post-title">{eventInfo.title}</div>
              </PostTitle> */}
              <PostContent>
                <div
                  dangerouslySetInnerHTML={{ __html: eventInfo.mainText }}
                ></div>
              </PostContent>
            </PostBody>
          </ContentBody>
        </DetialContent>
      </DetailBodyContainer>
      {deleteIndex !== null && (
        <DeleteModal>
          <ModalContent>
            <p>정말 삭제하시겠습니까?</p>
            <ModalButtons>
              <button onClick={() => console.log("여기서 삭제 해야함!")}>
                예
              </button>
              <button onClick={() => setDeleteIndex(null)}>아니요</button>
            </ModalButtons>
          </ModalContent>
        </DeleteModal>
      )}
    </div>
  );
}

export default DetailedPost;

const DetailBodyContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  /* border: 2px solid red; */
  flex-direction: row;
  > div {
    /* border: 2px solid green; */
  }
`;
const DetialContent = styled.div`
  display: flex;
  flex-direction: column;
  /* border: 2px solid black; */
  width: 100%;
`;
const ContentHead = styled.div`
  display: flex;
  /* border: 2px solid green; */
  align-items: center;
  height: 7%;
  padding-left: 4%;
`;
const BackButton = styled.div`
  // 뒤로가기 버튼
  display: flex;
  align-items: center;
  /* border: 2px solid gold; */
  cursor: pointer;

  font-size: 23px;
  /* font-size: 1.5vw; */

  /* width: 50px;
  height: 50px; */
`;
const ContentBody = styled.div`
  display: flex;
  flex-direction: column;
  /* border: 2px solid blue; */
  height: 100%;
  margin-left: 8%;
  margin-right: 14%;
`;
const PostHead = styled.div`
  display: flex;
  /* border: 2px solid black; */
  width: 100%;
  height: 9%;
  align-items: center;
  justify-content: space-between;
  color: #04b1b1;
  .folder-title {
    display: flex;
    margin-left: 10px;
    font-weight: bold;
    /* color: blue; */

    font-size: 25px;
    /* font-size: 1.3vw; */
  }
  .folder-date {
    display: flex;
    /* color: gold; */
    font-weight: bold;
    /* font-size: 1vw; */
    font-size: 15px;
    margin-right: 10px;
  }
`;

const SettingDots = styled.div`
  display: flex;
  width: 100%;
  height: 3%;
  align-items: center;
  justify-content: end;

  > svg {
    /* border: 2px solid red; */
    font-size: 23px;
    margin-right: 10px;
    cursor: pointer;
    padding: 2px 2px;
  }
  > svg:hover {
    color: gray;
  }
`;
const PostBody = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  /* border: 2px solid orange; */
`;
const PostTitle = styled.div`
  display: flex;
  width: 100%;
  height: 9%;
  /* border: 2px solid purple; */
  align-items: center;
  /* padding-left: 10px; */

  > .post-title {
    // 포스트 제목
    font-weight: bolder;
    font-size: 25px;
    margin-left: 10px;
  }
`;

const PostContent = styled.div`
  display: flex;
  /* border: 2px solid pink; */
  height: 100%;
  padding: 10px;
  div > p > img {
    width: 50%;
  }
`;

const DeleteModal = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 3000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
`;

const ModalButtons = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 20px;

  button {
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:first-child {
      background-color: #04b1b1;
      color: white;
    }

    &:last-child {
      background-color: #f1f1f1;
    }
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
  top: 32%;
  right: 10%;
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
  width: 16vw;
  height: 100vh;
  padding-top: 4%;
`;
