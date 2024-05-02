import {
  makeStyles,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
} from "@material-ui/core";
import { Brightness4 } from "@material-ui/icons";

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
        <Typography className={classes.brandText}>Branding</Typography>

        <Box className={classes.appBarItemsRight}>
          <IconButton
            color="inherit"
            aria-label="toggle dark mode"
            edge="start"
          >
            <Brightness4 />
          </IconButton>
          {/* {renderAppBarUserMenu} */}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
