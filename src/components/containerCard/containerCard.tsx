import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@store/store";
import { getDevContainerLog } from "@store/slices/logSlice";
import { setCurrentScreen } from "@store/slices/navigationSlice";
import { Grid } from "@mui/material";
import { FC } from "react";
import { LoadigSpinner } from "..";

interface OutlineCardProps {
  name: string;
  id: number;
}

const OutlinedCard: FC<OutlineCardProps> = ({ name, id }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: RootState) => state.awsServices);

  const handleGetLogs = () => {
    dispatch(getDevContainerLog(name));
    dispatch(setCurrentScreen("/logs"));
  };

  const card = (
    <React.Fragment>
      <CardContent>
        <Typography sx={{ fontSize: 12 }} color="text.secondary" gutterBottom>
          Container name:
        </Typography>
        <Typography variant="h5" component="div">
          {name}
        </Typography>
        <Typography
          sx={{ mb: 1.5 }}
          component="pre"
          style={{ whiteSpace: "pre-wrap", textAlign: "left", width: "100%" }}
          color="text.secondary"
        >
          ID: {id}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={handleGetLogs}>
          View Logs
        </Button>
      </CardActions>
    </React.Fragment>
  );

  return (
    <Grid>
      <Grid item xs={6} md={8} lg={12}>
        <Card variant="outlined">{card}</Card>
      </Grid>
      {loading && <LoadigSpinner />}
    </Grid>
  );
};

export default OutlinedCard;
