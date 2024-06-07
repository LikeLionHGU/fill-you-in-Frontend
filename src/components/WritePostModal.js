import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import TestEditorForm from "./TextEditorForm";
import { useParams } from "react-router-dom";

function WritePostModal({ eventInfo, setModalOpen }) {
  const [modalPost, setModalPost] = useState([]);
  const [post, setPost] = useState({
    postContent: "", // 초기 상태
  });
  const [requiredField, setRequiredField] = useState(true);
  const { id } = useParams();

  console.log(eventInfo);

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleSubmit = async (data) => {
    setModalOpen(false); // 나중에 백엔드랑 연결할 때 여기서 저장해서 넘겨줘야함.
  };

  // const handleRequiredFieldTrue = () => {
  //   setRequiredField(true);
  // };

  // const handleRequiredFieldFalse = () => {
  //   setRequiredField(false);
  // };

  const handleSubmitPost = async (event) => {
    event.preventDefault();

    const postAllContent = {
      folderId: parseInt(id),
      title: post.title,
      startDate: post.startDate,
      endDate: post.endDate,
      mainText: post.postContent,
    };

    console.log(postAllContent);
    console.log(JSON.stringify(postAllContent));

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

    const postAllContent = {
      folderId: parseInt(id),
      title: post.title,
      startDate: post.startDate,
      endDate: post.endDate,
      mainText: post.postContent,
    };

    console.log(postAllContent);
    console.log(JSON.stringify(postAllContent));

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

  useEffect(() => {
    if (eventInfo !== undefined) {
      setPost({
        title: eventInfo.title,
        startDate: eventInfo.startDate,
        endDate: eventInfo.endDate,
      });
    }
  }, []);

  return (
    <>
      <form onSubmit={handleSubmitPost}>
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
                {/* <ModalInfoText> */}
                <TestEditorForm
                  mainText={eventInfo ? eventInfo.mainText : null}
                  onChange={(content) =>
                    setPost((prevPost) => ({
                      ...prevPost,
                      // endDate:
                      postContent: content,
                    }))
                  }
                />
                {/* </ModalInfoText> */}
              </ModalInfo>
              <ModalButtons>
                <SaveButton
                  type="submit"
                  onClick={eventInfo ? handleReSubmitPost : handleSubmitPost}
                >
                  저장하기
                </SaveButton>
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
  z-index: 1500;
`;

// 아래 컴포넌트는 나중에 배경만 눌렀을때 모달 끄고싶으면 사용!!!!!
// eslint-disable-next-line
const ModalExitBackground = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  position: fixed;
  bottom: 0; // 모달 위치 - 바닥으로 내림
  left: 0; // 모달 위치 - 왼쪽에 붙임 */
  top: 0;
  right: 0;
  z-index: 1500;
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
  /* border: 1px solid red; */
  width: 95%;
  /* 아래부분 추가 */
  height: 98%;
  position: relative;
  /* 위 부분 추가 */
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
  /* border: 1px solid green; */
  display: flex;
  align-items: center;
  justify-content: center;
  color: #06b5b5;

  font-family: "Pretendard-SemiBold", Helvetica;

  width: 30px;
  height: 30px;
  margin-top: -5px;
  background-color: none;
  /* border-radius: 25px; */
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

  /* border: 2px solid red; */
  justify-content: space-between;
  align-items: end;
  /* margin-bottom: 5px; */
  margin-bottom: 10px;
  .InputFieldWrapper {
    position: relative;
    display: inline-block;
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

  /* height: 40px; */
  /* border: 2px solid white; */
`;

const ModalInfo = styled.div`
  display: flex;

  flex-direction: column;
  height: 100%;
  width: 100%;
`;
// const ModalInfoText = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   height: 80%;
//   width: 100%;
//   border: 5px solid purple;
//   /* justify-content: center; */
//   font-size: 100px;
//   overflow-y: auto; /* 추가 */
//   overflow-x: scroll;
//   /* & { */
//   -ms-overflow-style: none;
//   scrollbar-width: none;

//   /* } */
// `;

const ModalButtons = styled.div`
  display: flex;

  justify-content: center;
  align-items: end;
  /* border: 2px solid pink; */
  /* height: 25%; */
  position: absolute; /* 추가 */
  bottom: 10px; /* 추가 */
  width: 100%; /* 추가 */
  //padding: 10px 0; /* 추가 */
  background: none; /* 추가 */
  cursor: pointer;
`;

const SaveButton = styled.div`
  padding: 10px 60px;
  border-radius: 7px;
  background-color: #06b5b5;
  color: white;
  font-size: 18px;
  font-weight: 500;
  font-family: "Pretendard-SemiBold", Helvetica;
  transition: 0.2s;
  &:hover {
    background-color: #008888;
    cursor: pointer;
  }
`;
