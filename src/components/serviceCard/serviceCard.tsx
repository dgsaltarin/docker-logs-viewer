import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@store/store";
import { getDevContainerLog } from "@store/slices/logSlice";
import { setCurrentScreen } from "@store/slices/navigationSlice";
import { Grid } from "@mui/material";
import { FC } from "react";

interface ServiceCardProps {
  name: string;
  id: string;
}

const ServiceCard: FC<ServiceCardProps> = ({ name, id }) => {
  const dispatch = useDispatch<AppDispatch>();

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
      <CardActions></CardActions>
    </React.Fragment>
  );

  return (
    <Grid>
      <Grid item xs={6} md={8} lg={12}>
        <Card variant="outlined">{card}</Card>
      </Grid>
    </Grid>
  );
};

export default ServiceCard;
