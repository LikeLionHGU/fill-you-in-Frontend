import RouteSet from "./RouteSet";
import { RecoilRoot } from "recoil";

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
