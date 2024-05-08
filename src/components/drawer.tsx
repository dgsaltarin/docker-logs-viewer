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
import ContainerList from "./containerList";
import LogoutIcon from "@mui/icons-material/Logout";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDevContainerList,
  getQaContainerList,
} from "../store/slices/containerSlice";
import { AppDispatch } from "../store/store";
import { FaDocker } from "react-icons/fa";
import { ListSubheader } from "@mui/material";
import LogsDetail from "./logDetail";

const drawerWidth = 240;

export default function ResponsiveDrawer() {
  const dispatch = useDispatch<AppDispatch>();
  const { containers } = useSelector((state: any) => state.container);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);
  const { currentScreen } = useSelector((state: any) => state.navigation);

  useEffect(() => {
    dispatch(getDevContainerList());
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

  const handleQaContainerList = () => {
    dispatch(getQaContainerList());
  };

  const handleDevContainerList = () => {
    dispatch(getDevContainerList());
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
        <ListItem key={"DEV"} disablePadding>
          <ListItemButton onClick={handleDevContainerList}>
            <ListItemIcon>
              <FaDocker />
            </ListItemIcon>
            <ListItemText primary={"DEV"} />
          </ListItemButton>
        </ListItem>
        <ListItem key={"QA"} disablePadding>
          <ListItemButton onClick={handleQaContainerList}>
            <ListItemIcon>
              <FaDocker />
            </ListItemIcon>
            <ListItemText primary={"QA"} />
          </ListItemButton>
        </ListItem>
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
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
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
          {currentScreen === "logs" && <LogsDetail />}
          {currentScreen === "/" && <ContainerList containers={containers} />}
        </div>
      </Box>
    </Box>
  );
}
