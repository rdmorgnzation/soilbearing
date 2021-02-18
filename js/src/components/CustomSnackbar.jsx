import React from 'react';
import { Close } from '@material-ui/icons';
import { IconButton } from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { connect } from 'react-redux';

import actionCreater from '../redux/actionCreators';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

// Create global snackbar
class CustomSnackbar extends React.Component {
  // this.props.setSnackbar({display: true, message: 'helo', severity: 'info'});
  handleClose() {
    this.props.setSnackbar({...this.props.snackbar, display: false});
  }

  render() {
    var snackbar=this.props.snackbar;
    if (!snackbar)
      snackbar = {display:false}
    return (
      <>
        <Snackbar
          open={snackbar.display}
          autoHideDuration={2000}
          onClose={this.handleClose.bind(this)}
          action={[
          <IconButton
          key="close"
          aria-label="close"
          color="inherit"
          onClick={this.handleClose.bind(this)}
          >
            <Close />
          </IconButton>
          ]}
        >
          <Alert onClose={this.handleClose.bind(this)} severity={snackbar.severity}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </>
    )
  }
}

const mapStateToProps = state => {
  return {
    snackbar: state.state.snackbar
  };
};

const mapDispatchToProps = dispatch => ({
  setSnackbar: (d) => dispatch(actionCreater.setState('snackbar',d))
})

export default connect(mapStateToProps, mapDispatchToProps)(CustomSnackbar);
