import React from "react";
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import Box from '@material-ui/core/Box';

function valuetext(x){
  return `${a2r(x)} m`;
}

function a2r(x){
  return (200-x)/20;
}

function r2a(x){
  return 200 - x*20;
}
 
export class DepthSlider extends React.Component {
  constructor(props){
    super(props);
    props.setDepth(props.ranges.min);
  }

  componentDidUpdate(prevProps) {
    //Config updated
    if (prevProps !== this.props) {
      this.props.setDepth(this.props.ranges.min);
    }
  };  
  
  handleChange(event, value){
    this.props.setDepth(a2r(value));
  }
  render(){
    const props=this.props;
    const avg = (props.ranges.min+props.ranges.max)/2;
    const marks = [
      {
        value: r2a(props.ranges.max),
        label: valuetext(r2a(props.ranges.max)),
      },
      {
        value: r2a(avg),
        label: valuetext(r2a(avg)),
      },
      {
        value: r2a(props.ranges.min),
        label: valuetext(r2a(props.ranges.min)),
      }
    ]
    return(
      <Box style={{height:170, paddingLeft:10}}>
        <Tooltip title="Depth">
          <Slider
            orientation="vertical"
            value={r2a(props.depth) || r2a(props.ranges.min)}
            min={r2a(props.ranges.max)}
            max={r2a(props.ranges.min)}
            aria-labelledby="vertical-slider"
            track={false}
            marks={marks}
            onChangeCommitted={this.handleChange.bind(this)}
          />
        </Tooltip>
      </Box>
    );
  }
}

import { connect } from "react-redux";
const mapStateToProps = state => {
  return {
    depth: state.state.depth
  };
};

import actionCreater from '../redux/actionCreators';
const mapDispatchToProps = dispatch => ({
  setDepth: (d) => dispatch(actionCreater.setState('depth',d))
})
export default connect(mapStateToProps, mapDispatchToProps)(DepthSlider);
