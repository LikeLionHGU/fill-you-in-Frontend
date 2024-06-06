// components/RichTextEditor.js
import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import MUIRichTextEditor from "mui-rte";
import styled from "styled-components";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
  },
  toolbar: {
    // 툴바 스타일 오버라이드
    button: {
      padding: "8px",
      margin: "0 4px",
      width: "0.5rem",
      height: "0.5rem",
    },
  },
});

const RichTextEditor = () => {
  return (
    <RichTextEditorContainer>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <MUIRichTextEditor label="내용 입력하기" />
      </ThemeProvider>
    </RichTextEditorContainer>
  );
};

export default RichTextEditor;

const RichTextEditorContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  /* border: 4px solid blue; */
`;

Object.assign(theme, {
  overrides: {
    MUIRichTextEditor: {
      root: {
        // marginTop: 20,
        display: "flex",
        width: "100%",
        height: "100%",
      },
      editor: {
        borderBottom: "2px solid gray",
      },

      // 툴바 스타일 오버라이드
    },
  },
});
