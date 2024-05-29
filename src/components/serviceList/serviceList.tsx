import { styled } from "@mui/material/styles";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { FC } from "react";
import { Service } from "@types";
import { ServiceCard } from "@components/index";
import { makeStyles } from "@mui/styles";

const style = makeStyles(() => ({
  title: {
    display: "flex",
    justifyContent: "flex-start",
  },
}));

const Demo = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

const ServiceList: FC<{ services: Service[] }> = ({ services }) => {
  const classes = style();

  return (
    <Grid container spacing={2}>
      <Grid item className={classes.title} xs={12} md={12}>
        <Typography sx={{ mt: 4, mb: 2 }} variant="h4">
          Containers
        </Typography>
      </Grid>
      <Grid item xs={12} md={6} lg={12}>
        <Demo>
          <List>
            {services.map((service: Service) => (
              <ListItem key={service.id}>
                <ServiceCard name={service.name} id={service.id} />
              </ListItem>
            ))}
          </List>
        </Demo>
      </Grid>
    </Grid>
  );
};

export default ServiceList;
