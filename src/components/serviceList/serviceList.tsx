import { styled } from "@mui/material/styles";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { FC } from "react";
import { Service } from "@models/models";
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
          Services
        </Typography>
      </Grid>
      <Grid item xs={12} md={6} lg={12}>
        <Demo>
          <List>
            {services.map((service: Service) => (
              <ListItem key={service.service_arn}>
                <ServiceCard
                  name={service.service_name}
                  id={service.service_arn}
                />
              </ListItem>
            ))}
          </List>
        </Demo>
      </Grid>
    </Grid>
  );
};

export default ServiceList;
