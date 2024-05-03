import "./App.css";
import ResponsiveDrawer from "./components/drawer";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2

function App() {
  return (
    <>
      <div>
        <Grid>
          <Grid>
            <ResponsiveDrawer />
          </Grid>
        </Grid>
      </div>
    </>
  );
}

export default App;
