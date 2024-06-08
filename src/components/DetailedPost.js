import React, { useEffect, useRef, useState } from "react";
import WhiteNavBtns from "./WhiteNavBtns";
import ArchiveTimelineSidebar from "./ArchiveTimelineSidebar";
import styled from "styled-components";
import { FaChevronLeft } from "react-icons/fa6";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import WritePostModal from "./WritePostModal";
import { useNavigate, useParams } from "react-router-dom";

function DetailedPost() {
  const fffff = "";
  const [modalOpen, setModalOpen] = useState(false);
  const showModal = () => {
    setModalOpen(true);
  };
  const { id } = useParams();
  const { categoryId } = useParams();
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const dropdownRefs = useRef([]);
  const navigate = useNavigate();

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

  const deleteEventInfo = async () => {
    const url =
      process.env.REACT_APP_BACK_URL + `/api/fillyouin/events/${eventInfo.id}`;

    try {
      const response = await fetch(url, {
        method: "DELETE", //(+ GET인지 POST인지 명세 확인)
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("loginToken"), // Bearer 토큰으로 요청
        },
      }).then((json) => {
        console.log(json.ok);
        navigate(
          `/AddFolderPage/${categoryId}/ViewMyPostPage/${eventInfo.folderId}`
        );
        if (!!json.ok) {
          // window.location.reload();
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP Error! Status: ${response.status}`);
      }
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleDropdown = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  if (!eventInfo)
    return (
      <>
        <div></div>
      </>
    );
  return (
    <div>
      <WhiteNavBtns />
      <DetailBodyContainer>
        <ArchiveTimelineSidebar />
        <DetialContent>
          {modalOpen && (
            <WritePostModal eventInfo={eventInfo} setModalOpen={setModalOpen} />
          )}
          {/* 나중에 다른 컴포넌트로 넣을 모달 부분 */}
          <ContentHead>
            <BackButton
              onClick={() =>
                navigate(
                  `/AddFolderPage/${categoryId}/ViewMyPostPage/${eventInfo.folderId}`
                )
              }
            >
              <FaChevronLeft />
            </BackButton>
          </ContentHead>

          <ContentBody>
            <PostHead>
              <div className="folder-title">{eventInfo.title}</div>
              <div className="folder-date">
                {eventInfo.startDate} ~ {eventInfo.endDate}
              </div>
            </PostHead>
            <SettingDots ref={(el) => (dropdownRefs.current[0] = el)}>
              <HiOutlineDotsHorizontal onClick={() => toggleDropdown(0)} />
              {activeDropdown === 0 && (
                <DropdownSetting>
                  <DropdownItem onClick={() => setDeleteIndex(eventInfo.id)}>
                    삭제
                  </DropdownItem>
                  <DropdownItem onClick={() => showModal()}>
                    내용 수정
                  </DropdownItem>
                </DropdownSetting>
              )}
            </SettingDots>
            <PostBody>
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
              <button onClick={() => deleteEventInfo()}>예</button>
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
  flex-direction: row;
`;
const DetialContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
const ContentHead = styled.div`
  display: flex;
  align-items: center;
  height: 7%;
  padding-left: 4%;
`;
const BackButton = styled.div`
  // 뒤로가기 버튼
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 23px;
`;
const ContentBody = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  margin-left: 8%;
  margin-right: 14%;
`;
const PostHead = styled.div`
  display: flex;
  width: 100%;
  height: 9%;
  align-items: center;
  justify-content: space-between;
  color: #04b1b1;
  .folder-title {
    display: flex;
    margin-left: 10px;
    font-weight: bold;
    font-size: 25px;
  }
  .folder-date {
    display: flex;
    font-weight: bold;
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
  position: relative;
  > svg {
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
`;

const PostContent = styled.div`
  display: flex;
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
  top: 80%;
  right: -2%;
  z-index: 1;
`;

const DropdownItem = styled.div`
  padding: 8px 12px;
  cursor: pointer;
  &:hover {
    background-color: #f1f1f1;
  }
`;
