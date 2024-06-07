import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import TestEditorForm from "./TextEditorForm";
import { useParams } from "react-router-dom";

function WritePostModal({ eventInfo, setModalOpen }) {
  const [post, setPost] = useState({
    title: "",
    startDate: "",
    endDate: "",
    postContent: "",
    // postContent: "", // 초기 상태
  });
  const { id } = useParams();
  console.log(eventInfo);
  useEffect(() => {
    if (eventInfo) {
      setPost({
        title: eventInfo.title,
        startDate: eventInfo.startDate,
        endDate: eventInfo.endDate,
        postContent: eventInfo.mainText || "",
      });
    }
  }, [eventInfo]);

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleSubmitPost = async (event) => {
    // 나중에 백엔드랑 연결할 때 여기서 저장해서 넘겨줘야함.
    event.preventDefault();

    const form = event.target;
    if (!form.checkValidity()) {
      // validation 확인하기
      return;
    }

    const postAllContent = {
      folderId: parseInt(id),
      title: post.title,
      startDate: post.startDate,
      endDate: post.endDate,
      mainText: post.postContent,
    };

    // console.log(postAllContent);
    // console.log(JSON.stringify(postAllContent));

    const url = process.env.REACT_APP_BACK_URL + "/api/fillyouin/events";

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("loginToken"),
        },
        body: JSON.stringify(postAllContent),
      });

      if (!response.ok) {
        throw new Error(`HTTP Error! Status: ${response.status}`);
      }

      const json = await response.json();
      console.log(json.ok);
      if (json.ok) {
        window.location.reload();
      }
    } catch (error) {
      console.error("error", error);
    }

    closeModal();
    window.location.reload();
  };

  const handleReSubmitPost = async (event) => {
    event.preventDefault();
    const form = event.target;
    if (!form.checkValidity()) {
      return;
    }

    const postAllContent = {
      folderId: parseInt(id),
      title: post.title,
      startDate: post.startDate,
      endDate: post.endDate,
      mainText: post.postContent ? post.postContent : eventInfo.mainText,
    };

    // console.log(postAllContent);
    // console.log(JSON.stringify(postAllContent));

    const url = process.env.REACT_APP_BACK_URL + `/api/fillyouin/events/${id}`;

    try {
      const response = await fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("loginToken"),
        },
        body: JSON.stringify(postAllContent),
      });

      if (!response.ok) {
        throw new Error(`HTTP Error! Status: ${response.status}`);
      }

      const json = await response.json();
      console.log(json.ok);
      if (json.ok) {
        window.location.reload();
      }
    } catch (error) {
      console.error("error", error);
    }

    closeModal();
    window.location.reload();
  };
  return (
    <>
      <form onSubmit={eventInfo ? handleReSubmitPost : handleSubmitPost}>
        <ModalBackground>
          <Modal>
            <ModalContents>
              <ModealHeader>
                <div className="modal-cancel">
                  <CancelButton onClick={closeModal}>
                    <ClearRoundedIcon />
                  </CancelButton>
                </div>
                <div className="modal-title">활동 작성하기</div>
                <ModalPostInfos>
                  <div className="InputFieldWrapper">
                    <InputField
                      type="text"
                      className="inputField-activity-name"
                      placeholder="활동명을 입력해주세요"
                      value={post.title}
                      onChange={(e) =>
                        setPost((prevPost) => ({
                          ...prevPost,
                          title: e.target.value,
                        }))
                      }
                      required
                    />
                    <label>
                      활동명 <span className="RequiredIndicator">*</span>
                    </label>
                  </div>

                  <DateWrapper>
                    <InputField
                      type="date"
                      className="activity-start-date"
                      value={post.startDate}
                      onChange={(e) =>
                        setPost((prevPost) => ({
                          ...prevPost,
                          startDate: e.target.value,
                        }))
                      }
                      required
                    />
                    <InputField
                      type="date"
                      className="activity-end-date"
                      value={post.endDate}
                      onChange={(e) =>
                        setPost((prevPost) => ({
                          ...prevPost,
                          endDate: e.target.value,
                        }))
                      }
                      required
                    />
                  </DateWrapper>
                </ModalPostInfos>
              </ModealHeader>
              <ModalInfo>
                <TestEditorForm
                  mainText={eventInfo ? eventInfo.mainText : null}
                  onChange={(content) =>
                    setPost((prevPost) => ({
                      ...prevPost,
                      postContent: content,
                    }))
                  }
                />
              </ModalInfo>
              <ModalButtons>
                <SaveButton type="submit">저장하기</SaveButton>
              </ModalButtons>
            </ModalContents>
          </Modal>
        </ModalBackground>
      </form>
    </>
  );
}

export default WritePostModal;

const ModalBackground = styled.div`
  z-index: 1500; // 마이페이지 내용보다 위에 보이도록(검은색 반투명 배경)
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.2); // 검은배경에 20% 투명도
  position: fixed; //모달 위치 fix
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const Modal = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  box-shadow: 0 0 10px 1px #0000002a; // drop-down shadow 모달 그림자
  z-index: 2000; // 배경 보다 위에 있도록 함
  position: fixed;
  padding-top: 20px;
  align-items: center;
  background-color: white;
  width: 60%;
  height: 600px;
  border-radius: 25px;
`;
const ModalContents = styled.div`
  display: flex;
  flex-direction: column;
  width: 95%;
  height: 98%;
  position: relative;
`;
const ModealHeader = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  .modal-cancel {
    display: flex;
    justify-content: end;
  }
  .modal-title {
    display: flex;
    color: black;
    justify-content: center;
    font-size: 20px;
    margin-top: -10px;
  }
`;
const CancelButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #06b5b5;
  font-family: "Pretendard-SemiBold", Helvetica;
  width: 30px;
  height: 30px;
  margin-top: -5px;
  cursor: pointer;
  > svg {
    width: 35px;
    height: 35px;
  }
`;
const ModalPostInfos = styled.div`
  display: flex;
  width: 100%;
  height: 60px;
  justify-content: space-between;
  align-items: end;
  margin-bottom: 10px;
  .InputFieldWrapper {
    position: relative;
    display: flex;
    flex-direction: column-reverse;
    margin-right: 10px;
    width: 50%;
    .inputField-activity-name {
      display: flex;
      width: 100%;
      padding: 0px;
      padding-left: 10px;
    }
  }

  label {
    // 활동명 *
    color: black;
    margin-left: 5px;
    font-size: 11px;
    margin-bottom: 3px;
  }
  .RequiredIndicator {
    position: absolute;
    top: 10%;
    transform: translateY(-50%);
    color: red;
  }
`;

const InputField = styled.input`
  position: relative; // ::before를 위한 상대 위치 설정
  display: flex;
  height: 40px;
  margin-right: 30px;
  border-radius: 5px;
  border: 2px solid #04b1b1;
  padding-left: 10px;

  &.activity-start-date,
  &.activity-end-date {
    width: 150px;
  }

  &.activity-start-date {
    margin-right: 0px;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  &.activity-end-date {
    margin-right: 0px;
    border-left: none;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
`;

const DateWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const ModalInfo = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`;

const ModalButtons = styled.div`
  display: flex;
  justify-content: center;
  align-items: end;
  position: absolute; /* 추가 */
  bottom: 10px; /* 추가 */
  width: 100%; /* 추가 */
  cursor: pointer;
`;

const SaveButton = styled.button`
  padding: 10px 60px;
  border-radius: 7px;
  background-color: #06b5b5;
  color: white;
  font-size: 18px;
  font-weight: 500;
  font-family: "Pretendard-SemiBold", Helvetica;
  transition: 0.2s;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: #008888;
  }
`;
