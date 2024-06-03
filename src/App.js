import RouteSet from "./RouteSet";
import { RecoilRoot } from "recoil";

import { ThemeProvider, createTheme } from "@mui/material/styles";
/*
npm install @mui/material @emotion/react @emotion/styled
 ++ "theme" 설정도 해줌 -> 머티리얼 아이콘 쓸때 나오던 오류 해결

*/

function App() {
  return (
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <RouteSet />
      </ThemeProvider>
    </RecoilRoot>
  );
}

export default App;

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
    background: {
      default: "#f5f5f5",
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
    h1: {
      fontSize: "2rem",
      fontWeight: "bold",
    },
    h2: {
      fontSize: "1.5rem",
      fontWeight: "bold",
    },
    body1: {
      fontSize: "1rem",
    },
  },
  spacing: 8,
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
        },
        contained: {
          boxShadow: "none",
        },
      },
    },
  },
});
