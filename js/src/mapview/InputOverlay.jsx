import React from "react";
import DepthSlider from './DepthSlider';
import LocationDisplay from './LocationDisplay';
import DistrictSelect from './DistrictSelect';
import MethodSelect from './MethodSelect';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import FileCopyIcon from '@material-ui/icons/FileCopy';

export class InputOverlay extends React.Component {
  copyCapacity(){
    var textArea = document.createElement('textarea');
    textArea.value=this.props.clipboard;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    textArea.remove();
  }

  render(){
    return(
      <div ref='main' style={{color:'#000', width:'100%',height:'100%',position:'absolute'}}>
        <div style={{position:"absolute",bottom:90, zIndex:1100}}>
          <DepthSlider ranges={this.props.file.depth}/>
        </div>
        <div style={{position:"absolute",top:0, right:0, zIndex:1100}}>
          <LocationDisplay/>
        </div>
        <div style={{position:"absolute",bottom:0, right:0, zIndex:1100}}>
          <DistrictSelect districts={this.props.file.Districts}/>
        </div>
        <div style={{position:"absolute",bottom:0, left:3, zIndex:1100}}>
          <MethodSelect methods={this.props.file.methods}/>
        </div>
        <div style={{position:"absolute",bottom:45, top: 45,right:0, zIndex:1100}}>
          <Tooltip title="Copy bearing capacity">
            <IconButton onClick={this.copyCapacity.bind(this)}>
              <FileCopyIcon/>
            </IconButton>
          </Tooltip>
        </div>
      </div>
    )
  }
}

import { connect } from "react-redux";
const mapStateToProps = state => {
  return {
    clipboard: state.state.clipboard,
  };
};

import actionCreater from '../redux/actionCreators';
const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(InputOverlay);
