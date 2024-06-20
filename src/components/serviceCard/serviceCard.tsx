import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import { FC } from "react";
import { Task } from "@models/models";

interface ServiceCardProps {
  name: string;
  id: string;
  task: Task;
}

const ServiceCard: FC<ServiceCardProps> = ({ name, id, task }) => {
  const deployDate = new Date(task.started_at);
  const day = deployDate.getDate();
  const month = deployDate.getMonth();
  const year = deployDate.getFullYear();
  const displayDate = `${day}/${month}/${year}`;
  const card = (
    <React.Fragment>
      <CardContent>
        <Typography sx={{ fontSize: 12 }} color="text.secondary" gutterBottom>
          Service name:
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
        <Typography variant="body2" component="p">
          Last Deploy: {displayDate}
        </Typography>
        <Typography variant="body2" component="p">
          Status: {task.last_status}
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
