import styled from "styled-components";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { isRouteErrorResponse, useNavigate } from "react-router-dom";
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
const ModalContents = styled.div`
  display: flex;
  flex-direction: row;
  width: 90%;
  height: 80%;
  /* border: 1px solid red; */
`;
const ModalText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #005f5f;
  //  img 들어가야해서 삭제해야하는 부분
  font-family: "Pretendard-SemiBold", Helvetica;
  font-size: 25px;
  font-weight: 600;
  // img 들어가야해서 삭제해야하는 부분
  /* border: 1px solid black; */
  width: 50%;
  height: 100%;

  > div {
    // 이미지 선택창에서 처음 보여지는 이미지
    display: flex;
    justify-content: center;
    align-items: center;

    width: 350px;
    height: 350px;
    background-color: #e8e8e8;
    border: 2px solid #005f5f;
    border-radius: 400px;
    overflow: hidden; // 이 동그라미 넘어가면 이미지 가려짐
  }
  > div > div {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
  }
`;

const InputImg = styled.div`
  /* object-fit: cover; */
`;

const ImgFileName = styled.input`
  width: 235px;
  margin-right: 4px;
  padding: 5px 10px;
  font-size: 13px;
  background-color: #e8e8e8;

  border: 1px solid #ebebeb;
  border-radius: 4px;
  color: #999;
  /* text-decoration: underline; */
  font-family: "Pretendard-SemiBold", Helvetica;
`;
const ImgSelectBtn = styled.label`
  font-size: 17px;
  padding: 3px 10px;
  /* background: #ff9800; */
  color: gray;
  text-decoration: underline;
  cursor: pointer;
  border-radius: 0.25em;
  &:hover {
    color: #04b1b1;
  }
  font-family: "Pretendard", Helvetica;
`;

const RealBtn = styled.input`
  // 화면에서 보이지 않도록 함
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
  font-family: TheJamsilThin;
`;
const Preview = styled.div`
  color: #d3d3d3;
  background-color: #ebebeb77;
  /* height: 400px; */
  width: 400px;
  margin-top: 15px;
  margin-bottom: 10px;
  border-radius: 23px;

  /* border: 1px solid gray; */
`;
const Error = styled.p`
  font-size: 9px;
  font-family: TheJamsilThin;
  color: red;
  margin: 0;
  padding: 0;
  margin-bottom: -10px;
`;
const ModalInfo = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 60%;
  /* border: 2px solid green; */
`;
const ModalInfoText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  height: 100%;
  width: 100%;
  /* border: 2px solid red; */

  > div {
    margin-top: 10%;
  }
  > div > .file-name {
    font-weight: 500;
    font-size: 18px;
  }
  > .choose-pic-button {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 50%;
    /* border: 2px solid red; */
    border-radius: 20px;

    color: #a5a5a5;
    font-size: 18px;
    font-family: "Pretendard-SemiBold", Helvetica;
    font-weight: 500;
    text-decoration: underline;
    text-underline-offset: 3px;
    padding: 10px 60px;
  }
  > .choose-pic-button:hover {
    cursor: pointer;
  }
`;

const ModalButtons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  padding: 20px 20px;
  align-items: flex-end;
  /* border: 1px solid blue; */
  height: 50%;
`;
const SaveProfile = styled.form`
  /* border: 1px solid green; */
  padding: 10px 60px;
  border-radius: 25px;
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
const CancelButton = styled.div`
  /* border: 1px solid green; */
  color: #a5a5a5;
  font-size: 18px;
  font-family: "Pretendard-SemiBold", Helvetica;
  font-weight: 500;
  padding: 10px 60px;
  background-color: white;
  border-radius: 25px;
  border: 2px solid #06b5b5;
  transition: 0.2s;
  &:hover {
    cursor: pointer;
    color: #06b5b5;
    /* border: 2px solid #06b5b5; */
    background-color: #06b5b522;
  }
`;

function PictureSelect({ isOpen, closeModal, ImgUrl }) {
  const [file, setFile] = useState({});
  const [fileUrl, setFileUrl] = useState({});

  const imageUpload = (e) => {
    if (e.target.files.length !== 0) {
      setFile(e.target.files[0]);
      setFileUrl(e.target.files[0]);
      const imageTpye = e.target.files[0].type.includes("image");

      setFileUrl({
        url: URL.createObjectURL(e.target.files[0]),
        name: e.target.files[0].name,
        image: imageTpye,
      });
    }
  };
  const [fileError, setFileError] = useState("");

  const handleSubmit = async (data) => {
    // Form Data
    const formData = new FormData();
    formData.append("image", file); // 백엔드로 넘겨주는 이름이 image임.

    data.preventDefault();

    // 만약 여기서 기존 이미지 파일이 있으면 에러메시지 X
    if (!file.name) {
      setFileError("* 파일을 선택해주세요");
      return;
    } else {
      setFileError("");
    }

    const url =
      process.env.REACT_APP_BACK_URL +
      "/api/fillyouin/my-profile/profile-image";

    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("loginToken"), // Bearer 토큰으로 요청
        "Content-Type": "multipart/form-data",
      },
    };
    try {
      const response = await axios
        .post(url, formData, config)
        .then((response) => {
          console.log("서버 응답:", response.data);
          // onClick(); // 여기 있어야 이름 없을 때, 안넘어감
        });
      console.log("파일 업로드 완료");
      window.location.reload("/");
    } catch (error) {
      console.log("파일업로드 에러 발생: ", error);
    }
  };

  // console.log("AXIOSS");

  return (
    <ModalBackground style={{ display: isOpen ? "flex" : "none" }}>
      <ModalExitBackground onClick={closeModal}></ModalExitBackground>
      <Modal>
        <ModalContents>
          <ModalText>
            <div>
              {fileUrl?.image ? (
                <Preview>
                  {fileUrl &&
                    fileUrl?.image && ( // 이미지가 존재하면 실행
                      <img
                        src={fileUrl.url}
                        alt="previewimage"
                        style={{
                          width: "110%",
                          height: "110%",
                        }}
                      />
                    )}
                </Preview>
              ) : (
                <div>(프로필 사진)</div>
              )}
            </div>
          </ModalText>
          <ModalInfo>
            <ModalInfoText>
              <div>
                <span className="file-name">파일 이름 </span>
                <ImgFileName
                  placeholder="file name"
                  value={fileUrl.name}
                  disabled="disabled"
                />
              </div>
              <InputImg>
                <ImgSelectBtn
                  className="choose-pic-button"
                  htmlFor="ex_filename"
                >
                  다른 사진 선택
                </ImgSelectBtn>
                {fileError && <Error>{fileError}</Error>}
                <RealBtn
                  type="file"
                  id="ex_filename"
                  onChange={imageUpload}
                  required
                />
              </InputImg>
              {/* <div className="choose-pic-button">다른 사진 선택</div> */}
            </ModalInfoText>
            <ModalButtons>
              <SaveProfile
                type="submit"
                onClick={handleSubmit}

                // onClick={() => {
                //   console.log("AAA");
                //   // 프로필 수정 모달이랑 연결....안되는중
                // }}
              >
                저장
              </SaveProfile>
              <CancelButton onClick={closeModal}>취소</CancelButton>
            </ModalButtons>
          </ModalInfo>
        </ModalContents>
      </Modal>
    </ModalBackground>
  );
}

export default PictureSelect;
