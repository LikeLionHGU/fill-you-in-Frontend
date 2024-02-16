import { GoogleOAuthProvider } from "@react-oauth/google";
import LoginScreen from "./components/LoginScreen";
import MainPage2 from "./components/MainPage2";

function App() {
  return (
    <>
      <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENTID}>
        <LoginScreen />
      </GoogleOAuthProvider>
    </>
  );
}

export default App;
