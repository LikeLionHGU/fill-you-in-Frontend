/*
npm i react-draft-wysiwyg draft-js
ㄴ> 이게 설치가 안 된다면 다음 터미널로 입력:
npm install react-draft-wysiwyg draft-js --legacy-peer-deps

npm install draftjs-to-html --legacy-peer-deps

npm install redux
npm install @reduxjs/toolkit --legacy-peer-deps

*/

import React, { useEffect, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import styled from "styled-components";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
const MyBlock = styled.div`
  // 여기서 overflow-y 하면 안된다..
  overflow: none;

  border: 2px solid blue;
  .wrapper-class {
    width: 100%;
    /* height: 95%; */
    margin: 0 auto;
    margin-bottom: 4rem;
    /* overflow-x: scroll; */
    position: absolute;
  }
  .editor {
    height: 320px !important;
    border: 2px solid #f1f1f1 !important;
    padding: 5px !important;
    border-radius: 2px !important;
    font-size: 20px;
    & {
      -ms-overflow-style: none; /* 인터넷 익스플로러 */
      scrollbar-width: none; /* 파이어폭스 */
    }
  }
`;

const TestEditorForm = () => {
  // useState로 상태관리하기 초기값은 EditorState.createEmpty()
  // EditorState의 비어있는 ContentState 기본 구성으로 새 개체를 반환 => 이렇게 안하면 상태 값을 나중에 변경할 수 없음.
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const editorToHtml = draftToHtml(
    convertToRaw(editorState.getCurrentContent())
  );

  const onEditorStateChange = (editorState) => {
    // editorState에 값 설정
    setEditorState(editorState);
  };

  const htmlToEditor = `<pre>const editorToHtml =
        draftToHtml(convertToRaw(editorState.getCurrentContent()));</pre>
        <p style="text-align:center;"><strong>hello hi hi
        </strong><strong>Hello my name is this!</strong> I am not strongggg and i am <strong>Strong!</strong></p>`;

  useEffect(() => {
    const blocksFromHtml = htmlToDraft(htmlToEditor);
    if (blocksFromHtml) {
      const { contentBlocks, entityMap } = blocksFromHtml;
      // https://draftjs.org/docs/api-reference-content-state/#createfromblockarray
      const contentState = ContentState.createFromBlockArray(
        contentBlocks,
        entityMap
      );
      // ContentState를 EditorState기반으로 새 개체를 반환.
      // https://draftjs.org/docs/api-reference-editor-state/#createwithcontent
      const editorState = EditorState.createWithContent(contentState);
      setEditorState(editorState);
    }
    // 처음 마운트됐을 때만 실행
    // eslint-disable-next-line
  }, []);

  return (
    <MyBlock>
      <Editor
        // 에디터와 툴바 모두에 적용되는 클래스
        wrapperClassName="wrapper-class"
        // 에디터 주변에 적용된 클래스
        editorClassName="editor"
        // 툴바 주위에 적용된 클래스
        toolbarClassName="toolbar-class"
        // 툴바 설정
        toolbar={{
          // inDropdown: 해당 항목과 관련된 항목을 드롭다운으로 나타낼것인지
          list: { inDropdown: true },
          textAlign: { inDropdown: true },
          link: { inDropdown: true },
          history: { inDropdown: false },
        }}
        placeholder="내용을 작성해주세요."
        // 한국어 설정
        localization={{
          locale: "ko",
        }}
        // 초기값 설정
        editorState={editorState}
        // 에디터의 값이 변경될 때마다 onEditorStateChange 호출
        onEditorStateChange={onEditorStateChange}
      />
    </MyBlock>
  );
};

export default TestEditorForm;
