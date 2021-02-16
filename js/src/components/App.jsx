import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Route, NavLink, HashRouter } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, makeStyles } from "@material-ui/core";
import { List, ListItem, ListItemText } from "@material-ui/core";
//icons
import { Home } from "@material-ui/icons";
// our components
import efileupload from './efileupload.jsx';
import finfo from './finfo.jsx';
import mpage from './mpage.jsx';
import slayerediting from './slayerediting.jsx';
import results from './results.jsx';
import attributes from './attributes.jsx';
import main_page from "./main_page.jsx";

import CustomSnackbar from "./CustomSnackbar.jsx";

const useStyles = makeStyles({
  navDisplayFlex: {
    display: `flex`,
    justifyContent: `space-between`
  },
  linkText: {
    textDecoration: `none`,
    color: `white`
  },
  linkIcon:{
    color: `white`
  }
});

const navLinks = [
  { title: "Excel File Upload", path: "/efileupload",component: efileupload },
  { title: "Footing Info", path: "/finfo",component: finfo },
  { title: "Soil Layer Editing", path: "/slayerediting",component: slayerediting },
  { title: "Results", path: "/results",component: results },
  { title: "Map Page", path: "/mpage",component: mpage },
  { title: "Attributes", path: "/attributes",component: attributes }
]


const App = () => {
    const classes = useStyles();
    return(
      <React.Fragment>
        <CssBaseline />
        <CustomSnackbar/>
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
          <Route exact path="/" component={main_page}/>
          {navLinks.map(({ title, path, component }) => (
            <Route key={title} path={path} component={component} />
          ))}
        </HashRouter>
      </React.Fragment>
    )
}

export default App
