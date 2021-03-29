import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Route, NavLink, HashRouter } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Tooltip from '@material-ui/core/Tooltip';
import Hidden from '@material-ui/core/Hidden';
import Typography from '@material-ui/core/Typography';
// icons
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import Home from '@material-ui/icons/Home';
import { connect } from "react-redux";

import actionCreater from '../redux/actionCreators';
// our components
import EFileUpload from './efileupload';
import FInfo from './finfo';
import MPage from '../mapview/App';
import SLayerEditing from './slayerediting';
import Results from './results';
import MainPage from './main_page';

import CustomSnackbar from './CustomSnackbar';
import SideDrawer from './SideDrawer';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flexGrow: 1,
    height: 0, // required else height: 100%
               // would't work in child
               // some workaround
               // another is to use margin:auto in child
               // not worked in firefox
  },
  navDisplayFlex: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  linkText: {
    textDecoration: 'none',
    color: 'white',
  },
  linkIcon: {
    color: 'white',
  },
  drawerText: {
    textDecoration: 'none',
    color: theme.palette.text.primary,
  },
}));

const navLinks = [
  { title: 'Excel File Upload', path: '/efileupload', component: EFileUpload },
  { title: 'Footing Info', path: '/finfo', component: FInfo },
  { title: 'Soil Layer Editing', path: '/slayerediting', component: SLayerEditing },
  { title: 'Results', path: '/results', component: Results },
  { title: 'Map Page', path: '/mpage', component: MPage },
];

const App = (props) => {
  const classes = useStyles();
  let nextTheme = props.currentTheme === 'light' ?
                    'dark' : 'light';
  return (
    <>
    <CssBaseline />
    <Box className={classes.root}>
      <CustomSnackbar />
      <HashRouter>
        <AppBar position="static"
          color={props.currentTheme === 'light' ?"primary":"#424242"}>
          <Toolbar>
            <Hidden smDown>
              <NavLink to="/" className={classes.linkIcon}>
                <IconButton edge="start" color="inherit">
                  <Home fontSize="large" />
                </IconButton>
              </NavLink>
              <List
                component="nav"
                className={classes.navDisplayFlex}
              >
                {navLinks.map(({ title, path }) => 
                  <NavLink to={path} key={title} className={classes.linkText}>
                    <ListItem button>
                      <ListItemText primary={title} />
                    </ListItem>
                  </NavLink>
                )}
              </List>
            </Hidden>
            <Hidden mdUp>
              <SideDrawer>
                <NavLink to="/" className={classes.drawerText}>
                  <ListItem button>
                    <ListItemText primary="Home" />
                  </ListItem>
                </NavLink>                
                {navLinks.map(({ title, path }) => 
                  <NavLink to={path} key={title} className={classes.drawerText}>
                    <ListItem button>
                      <ListItemText primary={title} />
                    </ListItem>
                  </NavLink>
                )}
              </SideDrawer>
              <Typography variant="h5" component="h2">
                GeoProject
              </Typography>
            </Hidden>
            <Tooltip title="Change Theme">
              <IconButton edge="end" color="inherit"
                onClick={()=>props.setTheme(nextTheme)}
                style={{position:'absolute', right: 16}}
              >
                {nextTheme==='light' ?
                  <Brightness7Icon fontSize="large" />
                 :
                  <Brightness4Icon fontSize="large" />
                }
              </IconButton>
            </Tooltip>
          </Toolbar>
        </AppBar>
        <Box className={classes.content}>
          <Route exact path="/" component={MainPage} />
          {navLinks.map(({ title, path, component }) => (
            <Route key={title} path={path} component={component} />
          ))}
        </Box>
      </HashRouter>
    </Box>
    </>
  );
};

const themes = {
  light: createMuiTheme({
          palette: {
            type: 'light',
          }
        }),
  dark: createMuiTheme({
          palette: {
            type: 'dark',
          }
        }),
};

// save themes
window._SB.themes = themes;

class ThemedApp extends React.Component {
  constructor(props){
    super(props);
    props.setTheme('light');
  }

  setTheme(platte){
    this.props.setTheme(platte);
  }

  render(){
    let tplatte = 'light';
    if(this.props.theme)
      tplatte=this.props.theme;
    return(
      <MuiThemeProvider theme={themes[tplatte]}>
        <App
          setTheme={this.setTheme.bind(this)}
          currentTheme={this.props.theme}
        />
      </MuiThemeProvider>
    )
  }
}

const mapStateToProps = state => {
  return {
    theme: state.state.theme,
  };
};

const mapDispatchToProps = dispatch => ({
  setTheme: (d) => dispatch(actionCreater.setState('theme',d)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ThemedApp);
