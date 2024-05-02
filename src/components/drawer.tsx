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
  ShowChart as ShowChartIcon,
  ShoppingCart as ShoppingCartIcon,
  ExpandLess as ExpandLessIcon,
  ExpandMore as ExpandMoreIcon,
  Inbox as InboxIcon,
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

const menuItems = ["Item1", "Item2", "Item3"];

export default function AppDrawer() {
  const classes = useStyles();
  const [saleMenu, setSaleMenu] = useState(false);
  const [productMenu, setProductMenu] = useState(false);
  const [quickLinkMenu, setQuickLinkMenu] = useState(false);
  const [saleReportMenu, setSaleReportMenu] = useState(false);
  const [userMenu, setUserMenu] = useState(false);

  const renderDashboard = (
    <React.Fragment>
      <ListSubheader className={classes.listSubheader}>
        <Typography>Dashboard</Typography>
      </ListSubheader>
      <ListItem
        className={classes.drawerListItem}
        onClick={() => setSaleMenu(!saleMenu)}
      >
        <ListItemIcon>
          <ShoppingCartIcon />
        </ListItemIcon>
        <ListItemText primary="Sales" />
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
  const renderInventory = (
    <React.Fragment>
      <ListSubheader className={classes.listSubheader}>
        <Typography>Inventory</Typography>
      </ListSubheader>
      <ListItem
        className={classes.drawerListItem}
        onClick={() => setProductMenu(!productMenu)}
      >
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary="Products" />
        {productMenu ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </ListItem>
      <Collapse
        in={productMenu}
        timeout="auto"
        unmountOnExit
        collapsedSize="auto"
      >
        <List
          component="nav"
          aria-labelledby="nested-list-staff-subheader"
          disablePadding
        >
          {menuItems.map((item) => (
            <ListItem button>
              <ListItemText key={item} primary={item} />
            </ListItem>
          ))}
        </List>
      </Collapse>
      <ListItem
        className={classes.drawerListItem}
        onClick={() => setQuickLinkMenu(!quickLinkMenu)}
      >
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary="Quick Menu" />
        {quickLinkMenu ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </ListItem>
      <Collapse
        in={quickLinkMenu}
        timeout="auto"
        unmountOnExit
        collapsedSize="auto"
      >
        <List
          component="nav"
          aria-labelledby="nested-list-staff-subheader"
          disablePadding
        >
          {menuItems.map((item) => (
            <ListItem button>
              <ListItemText key={item} primary={item} />
            </ListItem>
          ))}
        </List>
      </Collapse>
    </React.Fragment>
  );
  const renderReport = (
    <React.Fragment>
      <ListSubheader className={classes.listSubheader}>
        <Typography>Reports</Typography>
      </ListSubheader>

      <ListItem
        className={classes.drawerListItem}
        onClick={() => setSaleReportMenu(!saleReportMenu)}
      >
        <ListItemIcon>
          <ShowChartIcon />
        </ListItemIcon>
        <ListItemText primary="Sale Report" />
        {saleReportMenu ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </ListItem>
      <Collapse
        in={saleReportMenu}
        timeout="auto"
        unmountOnExit
        collapsedSize="auto"
      >
        <List
          component="nav"
          aria-labelledby="nested-list-staff-subheader"
          disablePadding
        >
          {menuItems.map((item) => (
            <ListItem button>
              <ListItemText key={item} primary={item} />
            </ListItem>
          ))}
        </List>
      </Collapse>
    </React.Fragment>
  );
  const renderManage = (
    <React.Fragment>
      <ListSubheader className={classes.listSubheader}>
        <Typography>Management</Typography>
      </ListSubheader>
      <ListItem
        className={classes.drawerListItem}
        onClick={() => setUserMenu(!userMenu)}
      >
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary="Users" />
        {userMenu ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </ListItem>
      <Collapse in={userMenu} timeout="auto" unmountOnExit collapsedSize="auto">
        <List
          component="nav"
          aria-labelledby="nested-list-staff-subheader"
          disablePadding
        >
          {menuItems.map((item) => (
            <ListItem button>
              <ListItemText key={item} primary={item} />
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
        <Typography className={classes.drawerBrandingText}>App Name</Typography>
      </Toolbar>

      {renderDashboard}
      {renderInventory}
      {renderReport}
      {renderManage}
    </Drawer>
  );
}
