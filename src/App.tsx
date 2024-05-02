import "./App.css";
import ButtonAppBar from "./components/appBar";
import AppDrawer from "./components/drawer";

function App() {
  return (
    <>
      <div>
        <AppDrawer />
        <ButtonAppBar />
      </div>
    </>
  );
}

export default App;
