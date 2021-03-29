import React, {useState} from 'react';
import Menu from "@material-ui/icons/Menu";
import IconButton from '@material-ui/core/IconButton';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Box from '@material-ui/core/Box';

const SideDrawer = (props) => {
  const [state, setState] = useState({ display: false });
  
  const toggleDrawer = event => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    )
      return;
    setState({ display: !state.display });
  }
  
  return (
    <Box>
      <IconButton
      edge="start"
      onClick={toggleDrawer}
      style={{color:'white'}}
      >
        <Menu fontSize="large" />
      </IconButton>
      <Drawer
        anchor="left"
        open={state.display}
        onOpen={toggleDrawer}
        onClose={toggleDrawer}
      >
        <Box
          style={{width:250}}
          onClick={toggleDrawer}
          onKeyDown={toggleDrawer}
        >
          <List>
            {props.children}
          </List>
        </Box>
      </Drawer>
    </Box>
  );
}

export default SideDrawer;
