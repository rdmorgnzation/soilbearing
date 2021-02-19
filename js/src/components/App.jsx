import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Route, NavLink, HashRouter } from 'react-router-dom';
import {
  AppBar, Toolbar, IconButton, makeStyles,
  List, ListItem, ListItemText,
} from '@material-ui/core';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Tooltip from '@material-ui/core/Tooltip';
// icons
import Home from '@material-ui/icons/Home';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';
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
            <NavLink to="/" className={classes.linkIcon}>
              <IconButton edge="start" color="inherit" aria-label="home">
                <Home fontSize="large" />
              </IconButton>
            </NavLink>
            <List
              component="nav"
              aria-labelledby="main navigation"
              className={classes.navDisplayFlex}
            >
              {navLinks.map(({ title, path }) => (
                <NavLink to={path} key={title} className={classes.linkText}>
                  <ListItem button>
                    <ListItemText primary={title} />
                  </ListItem>
                </NavLink>
              ))}
            </List>
            <Tooltip title="Change Theme">
              <IconButton edge="end" color="inherit" aria-label="theme"
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
    const THEME = createMuiTheme({
        palette: {
          type: tplatte,
        },
      });
    return(
      <MuiThemeProvider theme={THEME}>
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
