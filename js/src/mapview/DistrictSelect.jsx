import React from "react";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Tooltip from '@material-ui/core/Tooltip';
import Box from '@material-ui/core/Box';

export class DistrictSelect extends React.Component {
  constructor(props){
    super(props);
    if(!this.props.district)
      props.setDistrict(0);
  }

  componentDidUpdate(prevProps) {
    //Config updated
    if (prevProps.districts !== this.props.districts) {
      this.props.setDistrict(0);
    }
  };

  handleChange(event, value){
    this.props.setDistrict(value.props.value);
  }
  
  render(){
    return(
      <Box>
        <Tooltip title="District">
          <Select
            value={this.props.district || 0}
            onChange={this.handleChange.bind(this)}
          >
            {this.props.districts.map((d,i)=>
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
    district: state.state.district,
  };
};

import actionCreater from '../redux/actionCreators';
const mapDispatchToProps = dispatch => ({
  setDistrict: (d) => dispatch(actionCreater.setState('district',d))
})

export default connect(mapStateToProps, mapDispatchToProps)(DistrictSelect);
