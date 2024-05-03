import "./App.css";
import ButtonAppBar from "./components/appBar";
import ResponsiveDrawer from "./components/drawer";
import ContainerList from "./components/containerList";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2

function App() {
  return (
    <>
      <div>
        <Grid container spacing={4}>
          <Grid xs={12}>
            <ResponsiveDrawer />
          </Grid>
        </Grid>
      </div>
    </>
  );
}

export default App;
