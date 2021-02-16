import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Route, NavLink, HashRouter } from 'react-router-dom';
import {
  AppBar, Toolbar, IconButton, makeStyles,
  List, ListItem, ListItemText,
} from '@material-ui/core';
// icons
import { Home } from '@material-ui/icons';
// our components
import EFileUpload from './efileupload';
import FInfo from './finfo';
import MPage from './mpage';
import SLayerEditing from './slayerediting';
import Results from './results';
import Attributes from './attributes';
import MainPage from './main_page';

import CustomSnackbar from './CustomSnackbar';

const useStyles = makeStyles({
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
});

const navLinks = [
  { title: 'Excel File Upload', path: '/efileupload', component: EFileUpload },
  { title: 'Footing Info', path: '/finfo', component: FInfo },
  { title: 'Soil Layer Editing', path: '/slayerediting', component: SLayerEditing },
  { title: 'Results', path: '/results', component: Results },
  { title: 'Map Page', path: '/mpage', component: MPage },
  { title: 'Attributes', path: '/attributes', component: Attributes },
];

const App = () => {
  const classes = useStyles();
  return (
    <>
      <CssBaseline />
      <CustomSnackbar />
      <HashRouter>
        <AppBar position="static">
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
          </Toolbar>
        </AppBar>
        <Route exact path="/" component={MainPage} />
        {navLinks.map(({ title, path, component }) => (
          <Route key={title} path={path} component={component} />
        ))}
      </HashRouter>
    </>
  );
};

export default App;
