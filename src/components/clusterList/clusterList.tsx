import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { GrServerCluster } from "react-icons/gr";
import { FC } from "react";
import { Grid } from "@mui/material";
import { Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@store/store";
import { getAwsServices } from "@store/slices/awsServicesSlice";
import { setCurrentScreen } from "@store/slices/navigationSlice";

const style = makeStyles(() => ({
  title: {
    display: "flex",
    justifyContent: "flex-start",
  },
  clusterList: {
    display: "flex",
    justifyContent: "flex-start",
  },
}));

const ClusterList: FC<{ clusters: string[] }> = ({ clusters }) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleSelectCluster = (cluster: string) => {
    dispatch(getAwsServices(cluster));
    dispatch(setCurrentScreen("/services"));
  };

  const classes = style();
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={12} lg={12} className={classes.title}>
        <Typography variant="h4">Clusters</Typography>
      </Grid>
      <Grid item xs={12} md={12} className={classes.clusterList}>
        <List>
          {clusters.map((cluster: string) => (
            <ListItem key={cluster} disablePadding>
              <ListItemButton onClick={() => handleSelectCluster(cluster)}>
                <ListItemIcon>
                  <GrServerCluster />
                </ListItemIcon>
                <ListItemText primary={cluster} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Grid>
    </Grid>
  );
};

export default ClusterList;
