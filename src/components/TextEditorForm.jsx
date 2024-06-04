// /*
// npm i react-draft-wysiwyg draft-js
// ㄴ> 이게 설치가 안 된다면 다음 터미널로 입력:
// npm install react-draft-wysiwyg draft-js --legacy-peer-deps
// npm install draftjs-to-html --legacy-peer-deps
// npm install redux
// npm install @reduxjs/toolkit --legacy-peer-deps
// */

import React, { useState, useEffect } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import styled from "styled-components";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import axios from "axios";

const MyBlock = styled.div`
  overflow: none;
  .wrapper-class {
    width: 100%;
    margin: 0 auto;
    margin-bottom: 4rem;
    position: absolute;
  }
  .editor {
    height: 320px !important;
    border: 2px solid #f1f1f1 !important;
    padding: 5px !important;
    border-radius: 2px !important;
    font-size: 20px;
    & {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }
  }
`;

const TestEditorForm = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const editorToHtml = draftToHtml(
    convertToRaw(editorState.getCurrentContent())
  );

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };

  const htmlToEditor = `<p"><strong>hello hi hi
        </strong><strong>Hello my name is this!</strong> I am not strongggg and i am <strong>Strong!</strong></p>`;

  useEffect(() => {
    const blocksFromHtml = htmlToDraft(htmlToEditor);
    if (blocksFromHtml) {
      const { contentBlocks, entityMap } = blocksFromHtml;
      const contentState = ContentState.createFromBlockArray(
        contentBlocks,
        entityMap
      );
      const editorState = EditorState.createWithContent(contentState);
      setEditorState(editorState);
    }
  }, []);

  return (
    <MyBlock>
      <Editor
        wrapperClassName="wrapper-class"
        editorClassName="editor"
        toolbarClassName="toolbar-class"
        toolbar={{
          list: { inDropdown: true },
          textAlign: { inDropdown: true },
          link: { inDropdown: true },
          history: { inDropdown: false },
          image: {
            uploadCallback: uploadImageCallBack,
            alt: { present: true, mandatory: true },
          },
        }}
        placeholder="내용 작성하기"
        localization={{ locale: "ko" }}
        editorState={editorState}
        onEditorStateChange={onEditorStateChange}
      />
    </MyBlock>
  );
};

function uploadImageCallBack(file) {
  return new Promise((resolve, reject) => {
    const formData = new FormData();
    formData.append("image", file);
    console.log(file);
    const url =
      process.env.REACT_APP_BACK_URL +
      "/api/fillyouin/my-profile/profile-image";

    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("loginToken"),
        "Content-Type": "multipart/form-data",
      },
    };

    axios
      .post(url, formData, config)
      .then((response) => {
        // 백엔드에서 이미지 URL을 반환한다
        const imageUrl = response.data.imageUrl;
        resolve({ data: { link: imageUrl } });
      })
      .catch((error) => {
        console.error("Image upload failed:", error);
        reject(error);
      });
  });
}

export default TestEditorForm;
