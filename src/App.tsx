import firebase from "firebase/compat/app";
import "./App.css";
import ResponsiveDrawer from "./components/drawer";
import Login from "./components/login";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_I,
};

function App() {
  firebase.initializeApp(firebaseConfig);
  const { isLoggedIn } = useSelector((state: RootState) => state.login);

  return <>{isLoggedIn ? <ResponsiveDrawer /> : <Login />}</>;
}

export default App;
