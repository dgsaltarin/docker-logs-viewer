import {
  makeStyles,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
} from "@material-ui/core";
import LogoutIcon from "@mui/icons-material/Logout";

const useStyles = makeStyles({
  brandText: {},
  appBarItemsRight: {
    marginLeft: "auto",
    marginRight: 0,
  },
  appBarShift: {
    width: `calc(100% - 200px)`,
  },
});
export default function AppHeader() {
  const classes = useStyles();

  return (
    <AppBar position="fixed" className={classes.appBarShift}>
      <Toolbar>
        <Typography className={classes.brandText}>Devops Monitor</Typography>

        <Box className={classes.appBarItemsRight}>
          <IconButton
            color="inherit"
            aria-label="toggle dark mode"
            edge="start"
          >
            <LogoutIcon />
          </IconButton>
          {/* {renderAppBarUserMenu} */}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
