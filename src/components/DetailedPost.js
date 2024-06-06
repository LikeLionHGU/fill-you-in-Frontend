import React, { useEffect, useRef, useState } from "react";
import WhiteNavBtns from "./WhiteNavBtns";
import ArchiveTimelineSidebar from "./ArchiveTimelineSidebar";
import styled from "styled-components";
import { FaChevronLeft } from "react-icons/fa6";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
// import ModifyProfile from "./ModifyProfile";
import WritePostModal from "./WritePostModal";

function DetailedPost() {
  const [modalOpen, setModalOpen] = useState(false);
  const showModal = () => {
    setModalOpen(true);
  };
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const dropdownRefs = useRef([]);

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

  const toggleDropdown = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

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
              <div className="folder-title">멋쟁이사자처럼_방학 프로젝트</div>
              <div className="folder-date">24.01~ 24.02</div>
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
                  <DropdownItem onClick={() => console.log("내용 삭제")}>
                    삭제
                  </DropdownItem>
                  <DropdownItem onClick={() => console.log("내용 수정")}>
                    내용 수정
                  </DropdownItem>
                </DropdownSetting>
              )}
            </SettingDots>
            <PostBody>
              <PostTitle>
                <div className="post-title">첫 해커톤</div>
              </PostTitle>
              <PostContent>
                <div>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam vitae semper nisi, eu pulvinar massa. Donec lobortis
                  pulvinar egestas. Duis eu felis efficitur, tempus felis eget,
                  gravida orci. Sed finibus neque vel ipsum laoreet, eget
                  vulputate lorem ultrices. Fusce efficitur neque et convallis
                  vehicula. <br /> <br /> Fusce at dictum lacus. Nullam nunc
                  dui, faucibus at volutpat in, ullamcorper eget orci. Nullam
                  volutpat sem ac turpis consectetur pulvinar ut non elit.
                  Curabitur nunc lectus, auctor ac ligula id, porttitor
                  hendrerit nunc. In tempor pretium volutpat. Integer congue
                  rhoncus risus, in tincidunt nisi fringilla id. Donec faucibus
                  pellentesque eros sit amet hendrerit. Sed pellentesque libero
                  gravida purus mattis blandit. Quisque blandit dolor vel
                  dignissim sollicitudin. <br /> <br />
                  Ut sodales lobortis cursus. Suspendisse potenti. Aenean
                  egestas eu dui non dictum. Donec metus metus, tristique at
                  pharetra faucibus, eleifend ac turpis. Integer a egestas
                  ligula. Donec sit amet vulputate tellus. Fusce id egestas
                  ligula. Suspendisse eu quam nulla. Aliquam ac risus libero.{" "}
                  <br /> <br />
                  Quisque vehicula tincidunt massa a interdum. Vestibulum ante
                  ipsum primis in faucibus orci luctus et ultrices posuere
                  cubilia curae; Nullam velit lectus, elementum eu est in,
                  bibendum ultricies augue.
                </div>
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
  z-index: 1500;
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
