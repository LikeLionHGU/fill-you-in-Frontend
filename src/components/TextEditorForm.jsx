/*
6/6 01:09
draft.js가 한글이 에러남, react quill로 에디터 교체할것. (draft.js 버전은 노션에 )

 >>>      npm i react-quill    <<<  
+ index.js 에 아래 링크 넣어줘야 editor 사용가능
 <link 
      rel="stylesheet"
      href="https://unpkg.com/react-quill@1.3.3/dist/quill.snow.css"
    />

 */
import ReactQuill from "react-quill";
import styled from "styled-components";
function TextEditorForm() {
  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ font: [] }],
        [{ align: [] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [{ list: "ordered" }, { list: "bullet" }, "link"],
        [
          {
            color: [
              "#000000",
              "#e60000",
              "#ff9900",
              "#ffff00",
              "#008a00",
              "#0066cc",
              "#9933ff",
              "#ffffff",
              "#facccc",
              "#ffebcc",
              "#ffffcc",
              "#cce8cc",
              "#cce0f5",
              "#ebd6ff",
              "#bbbbbb",
              "#f06666",
              "#ffc266",
              "#ffff66",
              "#66b966",
              "#66a3e0",
              "#c285ff",
              "#888888",
              "#a10000",
              "#b26b00",
              "#b2b200",
              "#006100",
              "#0047b2",
              "#6b24b2",
              "#444444",
              "#5c0000",
              "#663d00",
              "#666600",
              "#003700",
              "#002966",
              "#3d1466",
              "custom-color",
            ],
          },
          { background: [] },
        ],
        ["image", "video"],
        ["clean"],
      ],
    },
  };
  return (
    <>
      <MyBlock>
        <ReactQuill
          className="quill-editor"
          style={{
            width: "100%",
          }}
          modules={modules}
        />
      </MyBlock>
    </>
  );
}
export default TextEditorForm;
const MyBlock = styled.div`
  overflow: none;
  .quill-editor {
    width: 100%;
    margin: 0 auto;
    position: absolute;
    height: 370px !important;
    /* border: 2px solid #f1f1f1 !important; */

    /* padding: 5px !important; */
    border-radius: 2px !important;
    font-size: 20px;
    & {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }
  }
`;
