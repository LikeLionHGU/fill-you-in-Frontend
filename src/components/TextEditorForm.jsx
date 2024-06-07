// /*
// 6/6 01:09
// draft.js가 한글이 에러남, react quill로 에디터 교체할것. (draft.js 버전은 노션에 )

//  >>>      npm i react-quill    <<<
// + index.js 에 아래 링크 넣어줘야 editor 사용가능
//  <link
//       rel="stylesheet"
//       href="https://unpkg.com/react-quill@1.3.3/dist/quill.snow.css"
//     />

import React, { useEffect, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import axios from "axios";
import styled from "styled-components";

const QuillEditor = ({ mainText, onChange }) => {
  const editorRef = useRef(null);
  const quillRef = useRef(null);

  useEffect(() => {
    if (quillRef.current) {
      return;
    }

    const toolbarOptions = [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ font: [] }],
      [{ align: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }, "link"],
      [{ color: [] }, { background: [] }],
      ["image"],
    ];

    const options = {
      modules: {
        toolbar: toolbarOptions,
      },
      theme: "snow",
    };

    quillRef.current = new Quill(editorRef.current, options);
    const initialContent = mainText;
    if (initialContent) {
      quillRef.current.clipboard.dangerouslyPasteHTML(initialContent);
    }

    // Update textarea value on text change
    quillRef.current.on("text-change", () => {
      const content = quillRef.current.root.innerHTML;
      if (onChange) {
        onChange(content); // 상위 컴포넌트로 content 전달
        console.log(content);
      }
    });

    // Add image handler
    quillRef.current.getModule("toolbar").addHandler("image", selectLocalImage);
    // eslint-disable-next-lin
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onChange]);

  const selectLocalImage = () => {
    const fileInput = document.createElement("input");
    fileInput.setAttribute("type", "file");
    fileInput.accept = "image/*";

    fileInput.click();

    fileInput.addEventListener("change", function () {
      if (fileInput.files && fileInput.files[0]) {
        const file = fileInput.files[0];
        const ext = file.name.split(".").pop().toLowerCase();

        if (!["gif", "jpg", "jpeg", "png", "bmp"].includes(ext)) {
          alert("jpg, jpeg, png, bmp, gif 파일만 업로드 가능합니다.");
          return;
        }

        const fileSize = file.size;
        const maxSize = 20 * 1024 * 1024;

        if (fileSize > maxSize) {
          alert("업로드 가능한 최대 이미지 용량은 20MB입니다.");
          return;
        }

        const formData = new FormData();
        formData.append("file", file);

        handleSubmit(formData);
      }
    });
  };

  const handleSubmit = async (formData) => {
    const url = process.env.REACT_APP_BACK_URL + "/api/fillyouin/files"; // 백엔드 업로드 URL

    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("loginToken"),
        "Content-Type": "multipart/form-data",
      },
    };

    try {
      const response = await axios.post(url, formData, config);
      console.log("파일 업로드 완료");
      console.log(response);
      const range = quillRef.current.getSelection();
      quillRef.current.insertEmbed(range.index, "image", response.data.fileUrl);
    } catch (error) {
      console.log("파일 업로드 중 에러 발생: ", error);

      alert("파일 업로드 중 에러 발생. 다시 시도해주세요.");
    }
  };

  return (
    <>
      <MyBlock>
        <div
          id="quill-editor"
          ref={editorRef}
          style={{
            width: "100%",
            height: "370px",
          }}
        ></div>
      </MyBlock>
    </>
  );
};

export default QuillEditor;

const MyBlock = styled.div`
  overflow: none;
  &#quill-editor {
    width: 100%;
    margin: 0 auto;
    position: absolute;
    height: 30px !important;
    /* border: 2px solid #f1f1f1 !important; */

    /* padding: 5px !important; */
    border-radius: 2px !important;
    font-size: 20px;

    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;
