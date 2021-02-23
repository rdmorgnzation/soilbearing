import React, {useState} from 'react';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
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
      onClick={toggleDrawer}
      >
        <ArrowDropUpIcon fontSize="large" />
      </IconButton>
      <Drawer
        anchor="bottom"
        open={state.display}
        onOpen={toggleDrawer}
        onClose={toggleDrawer}
      >
        <Box
          style={{width:'auto'}}
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
