import { styled } from "@mui/material/styles";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { FC } from "react";
import { Container } from "../models/models";
import ContainerCard from "./containerCard";

const Demo = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

const ContainerList: FC<{ containers: Container[] }> = ({ containers }) => {
  return (
    <Grid container spacing={24}>
      <Grid item xs={12} md={6}>
        <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
          Containers
        </Typography>
        <Demo>
          <List>
            {containers.map((container: Container) => (
              <ListItem>
                <ContainerCard name={container.name} id={container.id} />
              </ListItem>
            ))}
          </List>
        </Demo>
      </Grid>
    </Grid>
  );
};

export default ContainerList;
