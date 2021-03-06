import React from "react";
import cookie from "react-cookies";
import actionCreater from '../redux/actionCreators';
import getBC from '../mapview/helper';
import { connect } from "react-redux";
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import ForwardIcon from '@material-ui/icons/Forward';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import MVTable from './mvtable';

// Show results from calculation
class calcResults extends React.Component {
  constructor(props){
    super(props);
    this.state = {results: {}}
  }

  calculate(){
    if(!this.props.sheet){
      _SB.toast.error("Data not set");
      return;
    }
    if(!this.props.foundation){
      _SB.toast.error("Foundation info not set");
      return;
    }
    const request = new Request(
      "./get_result",
      {headers: {
        'X-CSRFToken': cookie.load("csrftoken"),
        "Content-Type": "application/json"
        }}
    );
    fetch(request, {
      method: 'post',
      mode: 'same-origin',
      body: JSON.stringify({sheet: this.props.sheet, footing: this.props.foundation})
    })
    .then(res => res.json())
    .then(res => this.setState(res))
    .catch(error => _SB.toast.error(error.message));
  }

  render() {
    return (
      <Paper>
        <Typography variant="h5" component="h2">
          Calculate Result From Excel And Foundation Data
        </Typography>
        <Divider/>
        <Button
        variant="outlined"
        color="primary"
        endIcon={<ForwardIcon/>}
        onClick={this.calculate.bind(this)}
        style={{margin:3}}
        >
          Calculate
        </Button>
        <MVTable results={this.state.results} />
      </Paper>
    )
   }
}

const mapStateToProps = state => {
  return {
    sheet: state.state.sheet,
    foundation: state.state.foundation
  };
};

const CalcResults = connect(mapStateToProps, null)(calcResults);

// Show results based on location info
class LocResultsX extends React.Component {
  constructor(props){
    super(props);
    this.state = {
            latlong: "27., 85.",
            location: "",
            depth: 1.5,
            results: {},
        };
    if(props.sheet)
      this.state.location = props.sheet.attributes.location;
    let selectedFile=props.selectedFile;
    if(!selectedFile){
      // Select first option
        if(props.fileList){
          selectedFile=props.fileList[0];
          selectedFile.id=0;
          props.setSelectedFile(selectedFile);
        }
      }
    if(props.foundation)
      this.state.depth = props.foundation.Depth;
  };

  componentDidUpdate(prevProps) {
    //Config updated
    if (prevProps.fileList !== this.props.fileList) {
      const selectedFile=this.props.fileList[0];
      selectedFile.id = 0;
      this.props.setSelectedFile(selectedFile);
    }
  };
  
  handleChange(evt){
    if(evt.target.name=="depth"){
      if(isNaN(evt.target.value))
        return;
    }
    if(evt.target.name=="latlong"){
      const val=evt.target.value;
      const pos=val.indexOf(", ");
      if(pos==-1)return;
      if(isNaN(val.substring(0,pos)) || isNaN(val.substring(pos+2,val.length)))
        return;
    }
    if(evt.target.name=="sheet"){
      const id=evt.target.value;
      const selectedFile=this.props.fileList[id];
      selectedFile.id = id;
      this.props.setSelectedFile(selectedFile);
      return;
    }
    this.setState({[evt.target.name]: evt.target.value});
  };
  
  geocode(){
    fetch("./geocode?"+new URLSearchParams({
      location: this.state.location,
    }))
    .then(res => res.json())
    .then(res => {
      if (res.result){
        let latlong = res.result[0]+", "+res.result[1];
        this.setState({latlong});
      }else{
        _SB.toast.error("Can't geocode");
      }
    }).catch(error => _SB.toast.error(error.message));
  }
  
  calculate(){
    // Continue function to continue
    const val=this.state.latlong;
    const pos=val.indexOf(", ");
    const lat = val.substring(0,pos);
    const long = val.substring(pos+2,val.length);
    _SB.storedFetch(this.props.selectedFile.file)
    .then(res => {
      let c = getBC(lat, long, this.state.depth, res);
      if (c.success){
        this.setState({results: c.message});
      }else{
        _SB.toast.error(c.message);
      }
    });
  }

  render() {
    let selectedFile=this.props.selectedFile;
    if(!selectedFile)
      selectedFile={id: null, description:''};
    return (
      <Paper>
        <Typography variant="h5" component="h2">
          Calculate Interpolated From Data
        </Typography>
        <Divider/>
        <table>
          <tbody>
            <tr>
              <td style={{verticalAlign: 'text-top', paddingTop:7}}>
                <Typography>Latitude, Longitude</Typography>
              </td>
              <td>
                <TextField
                  name="latlong"
                  value={this.state.latlong}
                  onChange={this.handleChange.bind(this)}
                  /><br/>
                <TextField
                  name="location"
                  label="Location"
                  value={this.state.location}
                  onChange={this.handleChange.bind(this)}
                  />
                <Button
                variant="outlined"
                color="primary"
                style={{margin:3}}
                onClick={this.geocode.bind(this)}
                >
                  Geocode
                </Button>
              </td>
            </tr>
            <tr>
              <td>
                <TextField
                  select
                  name="sheet"
                  value={selectedFile.id}
                  fullWidth
                  onChange={this.handleChange.bind(this)}
                  >
                  {(this.props.fileList||[]).map((d,i) =>
                    <option key={d.text} value={i}>{d.text}</option> 
                  )}
                </TextField>
              </td>
              <td>
                {selectedFile.description}
              </td>
            </tr>
            <tr>
              <td>
                Depth
              </td>
              <td>
                <TextField
                  name="depth"
                  value={this.state.depth}
                  onChange={this.handleChange.bind(this)}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">m</InputAdornment>,
                  }}
                  />
              </td>
            </tr>            
          </tbody>
        </table>
        <Button
        variant="outlined"
        color="primary"
        endIcon={<ForwardIcon/>}
        style={{margin:3}}
        onClick={this.calculate.bind(this)}
        >
          Calculate
        </Button>
        <MVTable results={this.state.results} />
      </Paper>
    )
  }
}

const mapStateToProps2 = state => {
  return {
    sheet: state.state.sheet,
    foundation: state.state.foundation,
    selectedFile: state.state.selectedFile,
    fileList: state.config.mapFiles,
  };
};

const mapDispatchToProps2 = dispatch => ({
  setSelectedFile: (d) => dispatch(actionCreater.setState('selectedFile',d)),
})

const LocResults = connect(mapStateToProps2, mapDispatchToProps2)(LocResultsX);

class results extends React.Component {
  render() {
    return (
      <Box style={{padding: 5}}>
        <CalcResults/><br/>
        <LocResults/>
      </Box>
    );
  }
}

export default results;
