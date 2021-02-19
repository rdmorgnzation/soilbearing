import React from "react";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Tooltip from '@material-ui/core/Tooltip';
import Box from '@material-ui/core/Box';

export class MethodSelect extends React.Component {
  constructor(props){
    super(props);
    props.setMethod(0);
  }

  componentDidUpdate(prevProps) {
    //Config updated
    if (prevProps.methods !== this.props.methods) {
      this.props.setMethod(0);
    }
  };

  handleChange(event, value){
    this.props.setMethod(value.props.value);
  }
  render(){
    return(
      <Box>
        <Tooltip title="Method">
          <Select
            value={this.props.method || 0}
            onChange={this.handleChange.bind(this)}
          >
            {this.props.methods.map((d,i)=>
                <MenuItem value={i} key={i}>{d}</MenuItem>
                )}
          </Select>
        </Tooltip>
      </Box>
    )
  }
}

import { connect } from "react-redux";
const mapStateToProps = state => {
  return {
    method: state.state.method,
  };
};

import actionCreater from '../redux/actionCreators';
const mapDispatchToProps = dispatch => ({
  setMethod: (d) => dispatch(actionCreater.setState('method',d))
})
export default connect(mapStateToProps, mapDispatchToProps)(MethodSelect);
