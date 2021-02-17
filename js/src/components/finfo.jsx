import React from 'react';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Typography from '@material-ui/core/Typography';
import { connect } from "react-redux";

import actionCreater from '../redux/actionCreators';
// Display data related to footing
// Include location too
// Location is in sheet attributes,
// other values in footing

const foundation_default = {
            Type: "Square",
            Depth: 1.5,
            Width: 2,
            Length: 2
        };

class finfo extends React.Component {
  constructor(props){
    super(props);
    //Check sheet if already created?
    if(!props.sheet)
      props.setSheet({attributes: {location: ''},values:[]});
    if(props.foundation)
      return;
    //if foundation is not previously created create it
    props.setFoundation(foundation_default)
  };
  
  handleChange(evt){
    //try validation
    if(["Width","Length","Depth"].includes(evt.target.name)){
      if(isNaN(evt.target.value))
        return;
    }
    if(evt.target.name=='location'){
      this.props.setSheet({
        ...this.props.sheet,
        attributes: {
          ...this.props.sheet.attributes,
          location: evt.target.value
        }
      })
    }else{
      this.props.setFoundation({
        ...this.props.foundation,
        [evt.target.name]: evt.target.value
      })
    }
  };

  render(){
    var loc = '',
      foundation=foundation_default;
    if (this.props.sheet)
      loc=this.props.sheet.attributes.location;
    if (this.props.foundation)
      foundation=this.props.foundation
    return(
      <table>
        <tbody>
          <tr>
            <td>
              <Typography>Location</Typography>
            </td>
            <td>
              <TextField
                name="location"
                value={loc}
                fullWidth
                onChange={this.handleChange.bind(this)}
                />
            </td>
          </tr>
          <tr>
            <td>
              <Typography>Foundation Type</Typography>
            </td>
            <td>
              <TextField
                select
                name="Type"
                value={foundation.Type}
                fullWidth
                onChange={this.handleChange.bind(this)}
                >
                  <option value="Circular">Circular</option>
                  <option value="Square">Square</option>
                  <option value="Strip">Strip</option>
                  <option value="Rectangular">Rectangular</option>
              </TextField>
            </td>
          </tr>
          <tr>
            <td>
              <Typography>Depth</Typography>
            </td>
            <td>
              <TextField
                name="Depth"
                value={foundation.Depth}
                fullWidth
                onChange={this.handleChange.bind(this)}
                InputProps={{
                  endAdornment: <InputAdornment position="end">m</InputAdornment>,
                  }}
              />
            </td>
          </tr>
          <tr>
            <td>
              <Typography>Width</Typography>
            </td>
            <td>
              <TextField
                name="Width"
                value={foundation.Width}
                fullWidth
                onChange={this.handleChange.bind(this)}
                InputProps={{
                  endAdornment: <InputAdornment position="end">m</InputAdornment>,
                  }}
              />
            </td>
          </tr>
            {foundation.Type=="Rectangular" && 
            <tr>
              <td>
                <Typography>Length</Typography>
              </td>
              <td>
                <TextField
                 name="Length"
                 value={foundation.Length}
                 fullWidth
                 onChange={this.handleChange.bind(this)}
                 InputProps={{
                  endAdornment: <InputAdornment position="end">m</InputAdornment>,
                  }}
                 />
               </td>
            </tr>
          }
        </tbody>  
      </table>
    );
  };
};

const mapStateToProps = state => {
  return {
    sheet: state.state.sheet,
    foundation: state.state.foundation
  };
};

const mapDispatchToProps = dispatch => ({
  setSheet: (d) => dispatch(actionCreater.setState('sheet',d)),
  setFoundation: (d) => dispatch(actionCreater.setState('foundation',d))
})

export default connect(mapStateToProps, mapDispatchToProps)(finfo);
