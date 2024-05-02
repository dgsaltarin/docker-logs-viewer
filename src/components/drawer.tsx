import React, { useState } from "react";
import {
  makeStyles,
  Drawer,
  Toolbar,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Collapse,
} from "@material-ui/core";
import {
  ShoppingCart as ShoppingCartIcon,
  ExpandLess as ExpandLessIcon,
  ExpandMore as ExpandMoreIcon,
} from "@material-ui/icons";

const useStyles = makeStyles(() => ({
  drawer: {},
  drawerPaper: {
    width: 200,
  },
  drawerHeader: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: ".5em",
  },
  drawerBrandingText: {
    fontSize: "1.25em",
    fontWeight: 600,
    userSelect: "none",
    "&:hover": {},
  },
  drawerListItem: {
    userSelect: "none",
    cursor: "pointer",
  },
  listSubheader: {
    marginTop: "1em",
  },
}));

const menuItems = ["Dev", "Qa"];

export default function AppDrawer() {
  const classes = useStyles();
  const [saleMenu, setSaleMenu] = useState(false);

  const renderDashboard = (
    <React.Fragment>
      <ListSubheader className={classes.listSubheader}>
        <Typography>Docker Logs</Typography>
      </ListSubheader>
      <ListItem
        className={classes.drawerListItem}
        onClick={() => setSaleMenu(!saleMenu)}
      >
        <ListItemIcon>
          <ShoppingCartIcon />
        </ListItemIcon>
        <ListItemText primary="Nodes" />
        {saleMenu ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </ListItem>
      <Collapse in={saleMenu} timeout="auto" unmountOnExit collapsedSize="auto">
        <List
          component="nav"
          aria-labelledby="nested-list-staff-subheader"
          disablePadding
        >
          {menuItems.map((item, index) => (
            <ListItem button>
              <ListItemText key={index} primary={item} />
            </ListItem>
          ))}
        </List>
      </Collapse>
    </React.Fragment>
  );

  return (
    <Drawer
      className={classes.drawer}
      classes={{ paper: classes.drawerPaper }}
      variant="permanent"
      anchor="left"
    >
      <Toolbar className={classes.drawerHeader}>
        <Typography className={classes.drawerBrandingText}>
          DevOps Monitor
        </Typography>
      </Toolbar>

      {renderDashboard}
    </Drawer>
  );
}
