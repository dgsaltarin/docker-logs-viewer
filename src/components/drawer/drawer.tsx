import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import LogoutIcon from "@mui/icons-material/Logout";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getQaContainerList,
  setCurrentEnvironment,
} from "@store/slices/containerSlice";
import { AppDispatch } from "@store/store";
import { FaDocker } from "react-icons/fa";
import { ListSubheader } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { setCurrentScreen } from "@store/slices/navigationSlice";
import { logout } from "@store/slices/loginSlice";
import { RootState } from "@store/store";
import { FaAws } from "react-icons/fa6";
import {
  ClusterList,
  ContainerList,
  LogDetail,
  ServiceList,
  LoadigSpinner,
} from "@components/index";
import { getClusters } from "@store/slices/awsServicesSlice";

const style = makeStyles(() => ({
  customAppBar: {
    backgroundColor: "#051b52",
  },
}));

const drawerWidth = 240;

export default function ResponsiveDrawer() {
  const dispatch = useDispatch<AppDispatch>();
  const { containers, loading } = useSelector(
    (state: RootState) => state.container,
  );
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);
  const { currentScreen } = useSelector((state: RootState) => state.navigation);
  const classes = style();

  const { clusters, services, loadingServices } = useSelector(
    (state: RootState) => state.awsServices,
  );

  useEffect(() => {
    dispatch(getQaContainerList());
  }, [dispatch]);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  // handleQaContainerList and handleDevContainerList are functions that dispatch
  // actions to get the container list for the QA and DEV environments, respectively.
  const handleQaContainerList = () => {
    dispatch(getQaContainerList());
    dispatch(setCurrentScreen("/"));
    dispatch(setCurrentEnvironment("qa"));
  };

  const handleClusterList = () => {
    dispatch(getClusters());
    dispatch(setCurrentScreen("/clusters"));
  };

  // handleLogout is a function that dispatches an action to log out the user.
  const handleLogout = () => {
    dispatch(logout());
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <ListSubheader>
        <Typography variant="h6" component="div">
          Nodes
        </Typography>
      </ListSubheader>
      <List>
        <ListItem key={"QA"} disablePadding>
          <ListItemButton onClick={handleQaContainerList}>
            <ListItemIcon>
              <FaDocker />
            </ListItemIcon>
            <ListItemText primary={"QA"} />
          </ListItemButton>
        </ListItem>
        <Divider />
        <ListSubheader>
          <Typography variant="h6" component="div">
            AWS Services
          </Typography>
        </ListSubheader>
        <List>
          <ListItem key={"ECS"} disablePadding>
            <ListItemButton onClick={handleClusterList}>
              <ListItemIcon>
                <FaAws />
              </ListItemIcon>
              <ListItemText primary={"ECS"} />
            </ListItemButton>
          </ListItem>
          <ListItem key={"Parameter Store"} disablePadding>
            <ListItemButton onClick={handleClusterList}>
              <ListItemIcon>
                <FaAws />
              </ListItemIcon>
              <ListItemText primary={"Parameter Store"} />
            </ListItemButton>
          </ListItem>
        </List>
      </List>
    </div>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar
          className={classes.customAppBar}
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            ></IconButton>
            <Typography variant="h6" noWrap component="div">
              Devops Monitor
            </Typography>
          </div>
          <IconButton
            style={{ marginTop: 4 }}
            color="inherit"
            aria-label="toggle dark mode"
            edge="end"
            onClick={handleLogout}
          >
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Toolbar />
        <div style={{ flexGrow: 1 }}>
          {currentScreen === "/logs" && <LogDetail />}
          {currentScreen === "/" && <ContainerList containers={containers} />}
          {currentScreen === "/clusters" && <ClusterList clusters={clusters} />}
          {currentScreen === "/services" && <ServiceList services={services} />}
        </div>
      </Box>
      {loading && <LoadigSpinner />}
      {loadingServices && <LoadigSpinner />}
    </Box>
  );
}
